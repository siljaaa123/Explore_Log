class Invitation < ApplicationRecord
  belongs_to :user
  belongs_to :journey

  validates :accepted, presence: true, default: false
end
