class AddColumnsToPrediction < ActiveRecord::Migration[6.0]
  def change
    add_column :predictions, :name, :string
    add_column :predictions, :expiration_date, :datetime
    add_column :predictions, :probability_in_percent, :integer
    add_column :predictions, :outcome, :boolean
  end
end
