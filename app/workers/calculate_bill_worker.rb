class CalculateBillWorker
  AVERAGE_METER_READING = 20
  include Sidekiq::Worker

  def perform(*_args)
    BillingContract.all.each do |billing_contract|
      meter_reading = billing_contract.meter_readings.created_between(billing_contract.last_bill.date, Time.now.utc)
                                      .ordered_by_date.first&.value
      last_meter_reading = billing_contract.last_bill&.meter_reading
      delta_meter_reading = meter_reading - last_meter_reading if last_meter_reading && meter_reading
      bill_value = calculate_bill(delta_meter_reading, billing_contract)
      bill_value = edit_value_depending_payments(bill_value, billing_contract)
      FactoryBot.create(:bill, amount: bill_value, date: Time.now.utc, billing_contract: billing_contract,
                               meter_reading: meter_reading)
    end
  end

  def edit_value_depending_payments(value, contract)
    payments = contract.payments.created_between(contract.last_bill.date, Time.now.utc)
    suma = payments.sum(:amount) || 0
    suma += contract.last_bill.amount
    value + suma
  end

  def calculate_bill(reading, contract)
    return reading * contract.company.payment_coefficient if reading

    AVERAGE_METER_READING * contract.company.payment_coefficient
  end
end
