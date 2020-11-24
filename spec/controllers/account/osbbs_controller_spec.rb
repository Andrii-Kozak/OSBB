require 'rails_helper'

RSpec.describe Account::OsbbsController, type: :controller do
  let!(:osbb) do
    create(
      :osbb,
      name: 'Test Osbb',
      phone: '0123456789',
      email: 'test@email.com',
      website: 'example.com'
    )
  end

  login_user

  describe 'GET#search' do
    before { Osbb.reindex }

    it 'returns success when searchs osbb' do
      Osbb.search('test')
      expect(response).to have_http_status(:success)
    end

    it 'finds a searched osbb by name' do
      result = Osbb.search(osbb.name)
      expect(result).to match([osbb])
    end

    it 'finds a searched osbb by few letters of it name' do
      result = Osbb.search('est')
      expect(result).to match([osbb])
    end

    it 'finds a searched osbb by few letters inside of it name' do
      result = Osbb.search('osb')
      expect(result).to match([osbb])
    end

    it 'finds a searched osbb by it phone number' do
      result = Osbb.search('0123456789')
      expect(result).to match([osbb])
    end

    it 'finds a searched osbb by few letters of it email' do
      result = Osbb.search('mail.com')
      expect(result).to match([osbb])
    end

    it 'finds a searched osbb by few letters of it website' do
      result = Osbb.search('example.com')
      expect(result).to match([osbb])
    end

    it 'have http status success' do
      Osbb.search('mail.com')
      expect(response).to have_http_status(:success)
    end

    it 'can not find an empty value' do
      result = Osbb.search('')
      expect(result).not_to match([osbb])
    end

    it 'can not find osbb with one letter' do
      result = Osbb.search('t')
      expect(result).not_to match([osbb])
    end
  end
end
