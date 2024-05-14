Rails.application.routes.draw do
  devise_for :users
  root to: "pages#home"
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Reveal health status on /up that returns 200 if the app boots with no exceptions, otherwise 500.
  # Can be used by load balancers and uptime monitors to verify that the app is live.
  get "up" => "rails/health#show", as: :rails_health_check

  # Defines the root path route ("/")
  # root "posts#index"
  resources :journeys, only: %i[new create update edit] do
    resources :pins, only: %i[new create update edit]
  end

  resources :journeys, except: %i[new create update edit] do
    member do
      get :map
    end
    resources :videos, only: %i[index]
  end

  resources :pins, except: %i[new create update edit] do
    resources :templates, only: %i[index show]
  end
  resources :users, only: %i[show]
  post '/save_template', to: 'pin_templates#create'
end
