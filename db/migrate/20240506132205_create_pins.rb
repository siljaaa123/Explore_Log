class CreatePins < ActiveRecord::Migration[7.1]
  def change
    create_table :pins do |t|
      t.string :location
      t.date :date
      t.references :journey, null: false, foreign_key: true

      t.timestamps
    end
  end
end
