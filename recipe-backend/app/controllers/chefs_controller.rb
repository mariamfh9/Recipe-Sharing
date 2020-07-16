class ChefsController < ApplicationController
    before_action :set_chef, only: [:show, :update, :destroy]

    def index
        chefs = Chef.all 

        render json: chefs
    end 

    def show
        @chef = Chef.find_by(id: params[:id])
        render json: @chef
    end 
    
    def create 
        @chef = Chef.create(name: name)
    end

end
