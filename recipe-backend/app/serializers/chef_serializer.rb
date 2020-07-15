class ChefSerializer < ActiveModel::Serializer
    attributes :id, :name, :completed
    has_many :recipes
end 