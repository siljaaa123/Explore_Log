class CreateTemplates < ActiveRecord::Migration[7.1]
  def change
    create_table :templates do |t|
      t.string :name
      t.references :pin, null: false, foreign_key: true

      t.timestamps
    end
  end
end
