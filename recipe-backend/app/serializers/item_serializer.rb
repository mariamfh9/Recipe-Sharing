class RecipeSerializer < ActiveModel::Serializer
    attributes :id, :title, :product_details, :quanity, :img_url
    belongs_to :category
end  