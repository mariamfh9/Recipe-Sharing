class Recipe < ApplicationRecord
  belongs_to :chef
  validates :name, :ingredient, presence: true 
end
