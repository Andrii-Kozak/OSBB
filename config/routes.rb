Rails.application.routes.draw do
  filter :locale
  devise_for :users, controllers: { registrations: 'user/registrations' }

  root 'home#index', as: 'home'
  get 'about', to: 'home#about'
  get "/404", to: "errors#not_found"
  get "/422", to: "errors#unacceptable"
  get "/500", to: "errors#server_error"

  namespace :account do
    resources :payments, only: %i[index show]
    resources :users, except: %i[index destroy]
    resources :companies, only: [] do
      resources :utility_providers, only: %i[new update]
    end
    resources :utility_providers, only: %i[index show] do
      get 'search', on: :collection
      put 'disassociate', on: :member
      resources :meter_readings, only: %i[index new create]
    end
    namespace :admin do
      resources :osbbs
      resources :user_cabinets, only: :index
      resources :companies do
        resources :billing_contracts
        get 'new_import', on: :collection
        post 'import', on: :collection
      end
      resources :users, only: %i[index destroy]
    end
  end
  telegram_webhook TelegramWebhooksController
end
