class CreatePinTemplates < ActiveRecord::Migration[7.1]
  def change
    create_table :pin_templates do |t|
      t.references :pin, null: false, foreign_key: true
      t.references :template, null: false, foreign_key: true

      t.timestamps
    end
  end
end
