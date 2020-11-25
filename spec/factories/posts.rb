FactoryBot.define do
  factory :post do
    title { Faker::Movies::Hobbit.character }
    short_description { Faker::Movies::Hobbit.quote }
    long_description { Faker::Lorem.sentence(word_count: 30) }
    is_visible { true }
    is_private { false }
    user
    osbb

    trait :with_image do
      image { File.open("#{Rails.root}/app/assets/images/if-mailer.png") }
    end
  end
end
