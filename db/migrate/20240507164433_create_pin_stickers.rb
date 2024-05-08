class CreatePinStickers < ActiveRecord::Migration[7.1]
  def change
    create_table :pin_stickers do |t|
      t.references :pin, null: false, foreign_key: true
      t.references :sticker, null: false, foreign_key: true

      t.timestamps
    end
  end
end
