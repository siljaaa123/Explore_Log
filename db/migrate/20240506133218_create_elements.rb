class CreateElements < ActiveRecord::Migration[7.1]
  def change
    create_table :elements do |t|
      t.string :type
      t.integer :x_position
      t.integer :y_position
      t.integer :width
      t.integer :height
      t.string :content
      t.references :pin, null: false, foreign_key: true
      t.integer :rotation

      t.timestamps
    end
  end
end
