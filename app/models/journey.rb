class Journey < ApplicationRecord
  belongs_to :user
  has_many :pins
  has_one_attached :cover_photo

  validates :location, presence: true
  validates :name, presence: true
  validates :start_date, presence: true

  geocoded_by :location
  after_validation :geocode
end
