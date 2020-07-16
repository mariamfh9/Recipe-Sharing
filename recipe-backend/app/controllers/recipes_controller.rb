class RecipesController < ApplicationController
    class RecipesController < ApplicationController


        def index
            recipes = Recipe.all
            render json: recipes #
        end
    
        def create
            recipe = Recipe.create(title: params[:title], product_details: params[:product_details], price: params[:price], quanity: params[:quanity], img_url: params[:img_url])
        end
    
        def show
            recipe = Recipe.find_by(id: params[:id])
             render json: recipe 
        end
    
        def edit
        end
    
        def update
            recipe = Recipe.find_by(id: params[:id])
            recipe.update(recipe_params)
            render json: recipe
        end

        private
        def recipe_params
            params.require(:recipe).permit(:name, :ingredients)
        end 
    
end
