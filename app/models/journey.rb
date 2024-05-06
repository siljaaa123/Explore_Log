class Journey < ApplicationRecord
  belongs_to :user
  has_many :pins

  validates :location, presence: true
  validates :name, presence: true
  validates :start_date, presence: true
  validates :end_date, presence: true
  validates :completed, presence: true, default: false
end
