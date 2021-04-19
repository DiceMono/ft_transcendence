Rails.application.routes.draw do
  root 'home#index'
  devise_for :users, controllers: { omniauth_callbacks: "users/omniauth_callbacks" }
  devise_scope :user do
    delete 'sign_out', to: 'devise/sessions#destroy', as: :destroy_user_session_path
  end

  namespace :api do
    resources :users, only: %i[index show update] do
      collection do
        get 'rank'
        get 'challenge'
        get 'me'
      end
      member do
        get 'game'
        get 'history'
      end
      resources :friends, only: %i[index create destroy], param: :follow_id
      resources :blocks, only: %i[index create destroy], param: :blocked_user_id
    end
    resources :guilds, only: %i[index show create destroy] do
      collection do
        get 'rank'
        get 'my'
      end
      member do
        get 'histories'
      end
    end
    resources :chat_rooms, path: 'chatrooms', only: %i[index update destroy create] do
    end
  end
end
