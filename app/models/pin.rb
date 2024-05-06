class Page < ApplicationRecord
  belongs_to :journey
  has_many :elements
  has_one :template

  validates :location, presence: true
  validates :date, presence: true
end
