class Sticker < ApplicationRecord
  has_and_belongs_to_many :pins, join_table: :pin_stickers

  validates :name, presence: true
end
