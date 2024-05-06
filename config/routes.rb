Rails.application.routes.draw do
  get 'stickers/index'
  get 'stickers/show'
  get 'elements/index'
  get 'elements/show'
  get 'elements/new'
  get 'elements/create'
  get 'elements/update'
  get 'elements/edit'
  get 'elements/destroy'
  get 'templates/index'
  get 'templates/show'
  get 'templates/new'
  get 'templates/create'
  get 'templates/update'
  get 'templates/edit'
  get 'templates/destroy'
  get 'pins/index'
  get 'pins/show'
  get 'pins/create'
  get 'pins/edit'
  get 'pins/new'
  get 'pins/update'
  get 'pins/destroy'
  get 'journeys/index'
  get 'journeys/show'
  get 'journeys/create'
  get 'journeys/new'
  get 'journeys/edit'
  get 'journeys/update'
  get 'journeys/destroy'
  devise_for :users
  root to: "pages#home"
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Reveal health status on /up that returns 200 if the app boots with no exceptions, otherwise 500.
  # Can be used by load balancers and uptime monitors to verify that the app is live.
  get "up" => "rails/health#show", as: :rails_health_check

  # Defines the root path route ("/")
  # root "posts#index"
  resources :journeys do
    resources :pages
  end
end
