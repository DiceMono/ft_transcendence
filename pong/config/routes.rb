Rails.application.routes.draw do
  root 'home#index'
  get 'home/index'
  devise_for :users, controllers: { omniauth_callbacks: "users/omniauth_callbacks" }
  devise_scope :user do
    delete 'sign_out', to: 'devise/sessions#destroy', as: :destroy_user_session_path
  end

  namespace :api do
    resources :users, only: %i[index show update] do
      get 'rank', on: :collection
    end
  end

  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
