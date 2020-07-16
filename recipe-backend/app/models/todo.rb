class Todo < ApplicationRecord
    belongs_to :visit
    validates :description, presence: true 
end
