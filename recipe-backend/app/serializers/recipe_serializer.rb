class RecipeSerializer < ActiveModel::Serializer
    attributes :id, :name, :ingredients
    belongs_to :chef
end 