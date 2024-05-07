class AddDescriptionToJourneys < ActiveRecord::Migration[7.1]
  def change
    add_column :journeys, :description, :text
  end
end
