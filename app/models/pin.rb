class Pin < ApplicationRecord
  belongs_to :journey
  has_many :elements
  has_one :template

  validates :location, presence: true
  validates :date, presence: true

  geocoded_by :location
  after_validation :geocode, if: :will_save_change_to_location?
end
