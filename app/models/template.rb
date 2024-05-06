class Template < ApplicationRecord
  belongs_to :pin
  has_one :pin

  validates :name, presence: true
end
