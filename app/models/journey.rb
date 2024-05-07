class Journey < ApplicationRecord
  belongs_to :user
  has_many :pins

  validates :location, presence: true
  validates :name, presence: true
  validates :start_date, presence: true
end
