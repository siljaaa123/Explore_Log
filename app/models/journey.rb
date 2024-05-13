class Journey < ApplicationRecord
  belongs_to :user
  has_many :pins
  has_one_attached :cover_photo
  has_one :video

  validates :location, presence: true
  validates :name, presence: true
  validates :start_date, presence: true

  geocoded_by :location
  after_validation :geocode, if: :will_save_change_to_location?
end
