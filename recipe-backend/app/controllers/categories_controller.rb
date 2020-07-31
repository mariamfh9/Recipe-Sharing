class CategoriesController < ApplicationController
    before_action :set_Category, only: [:show, :update, :destroy]
  
    def index
      categories = Category.all
  
      render json: categories
    end
  
    def create
      category = Category.new(category_params)
      if category.save
        render json: category, status: :created
      else 
        render json: item.errors, status: :unprocessable_entity
      end
    end
  
    def show
      render json: category
    end
  
   private
      def set_category
        category = Category.find(params[:id])
      end
  
      def category_params
        params.require(:category).permit(:name)
      end
  end
  