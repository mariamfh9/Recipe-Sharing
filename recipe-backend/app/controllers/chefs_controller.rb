class ChefsController < ApplicationController
    before_action :set_chef, only: [:show, :update, :destroy]

    def index
        @chefs = Chef.all 

        render json: @chefs 
    end 

    def show
        render json: @chef
    end 

    
end
