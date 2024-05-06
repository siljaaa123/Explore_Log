class Element < ApplicationRecord
  belongs_to :pin

  validates :type, presence: true, inclusion: { in: %w[text image sticker] }
end
