class Video < ApplicationRecord
  belongs_to :journey
  has_many :pins, through: :journey
  # has_many :pin_templates, thorugh: :pins
  # has_one :template, through: :pin_templates
end
