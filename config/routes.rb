Rails.application.routes.draw do
  devise_for :users
  root 'groups#index'
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  resources :users, only: [:index, :edit, :update] do
    resources :messages, only: [:index, :create]
  end
  resources :groups, only: [:new, :create, :edit, :update] do
    resources :messages, only: [:index, :create]
      namespace :api do
        resources :messages, only: :index, defaults: { format: 'json' }
      end
  end
end
