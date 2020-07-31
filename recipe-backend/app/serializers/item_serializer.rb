class ItemSerializer < ActiveModel::Serializer
    attributes :id, :title, :quanity, :category_id
    belongs_to :category
end  