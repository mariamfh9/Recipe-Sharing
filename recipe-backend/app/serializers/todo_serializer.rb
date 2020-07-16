class TodoSerializer < ActiveModel::Serializer
  attributes :id, :description, :completed
  belongs_to :recipe
end
