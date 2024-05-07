class Template < ApplicationRecord
  has_many :pin_templates
  has_many :pins, through: :pin_templates

  validates :name, presence: true
end
