Rails.application.routes.draw do
  root 'home#index'
  devise_for :users, controllers: { omniauth_callbacks: "users/omniauth_callbacks" }
  devise_scope :user do
    delete 'sign_out', to: 'devise/sessions#destroy', as: :destroy_user_session_path
  end

  namespace :api do
    get 'users/rank', to: 'users#rank'
    resources :users, only: %i[index show update]
    resources :chat_rooms, path: 'chatrooms', only: %i[index update destroy create] do
    end
  end
end
