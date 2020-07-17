lass ItemsController < ApplicationController


    def index
        items = Item.all
        render json: items
    end

    def create
        item = Item.create(title: params[:title], product_details: params[:product_details], quanity: params[:quanity], img_url: params[:img_url])
    end

    def show
        item = Item.find_by(id: params[:id])
         render json: item 
    end

    def edit
    end

    def update
        item = Item.find_by(id: params[:id])
        item.update(title: params[:title], product_details: params[:product_details], quanity: params[:quanity], img_url: params[:img_url])
        render json: item
    end

end 