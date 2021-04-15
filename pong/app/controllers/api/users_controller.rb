module Api
  class UsersController < ApplicationController
    before_action :authenticate_user!
    def index
      render json: User.all, status: :ok
    end

    def rank
      render json: User.all.order(rating: :desc).page(params[:page]), status: ok
    end

    def show
      @user = User.find(params[:id])
      render json: @user, status: :ok
    end

    def update
      @user = User.find(params[:id])
      @user.update!(update_params)
      @user.save!
      render json: @user, status: :ok
    end

    private

    def update_params
      params.permit(:nickname, :is_banned, :is_email_auth, :image)
    end
  end
end