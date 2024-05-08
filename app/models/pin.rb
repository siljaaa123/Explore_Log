class Pin < ApplicationRecord
  belongs_to :journey
  has_many :elements
  has_and_belongs_to_many :stickers, join_table: :pin_stickers
  has_and_belongs_to_many :templates, join_table: :pin_templates
  has_many :pin_templates

  validates :location, presence: true
  validates :date, presence: true

  geocoded_by :location
  after_validation :geocode, if: :will_save_change_to_location?
end
