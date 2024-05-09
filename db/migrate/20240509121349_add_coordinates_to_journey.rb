class AddCoordinatesToJourney < ActiveRecord::Migration[7.1]
  def change
    add_column :journeys, :latitude, :float
    add_column :journeys, :longitude, :float
  end
end
