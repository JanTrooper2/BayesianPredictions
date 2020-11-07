class AddMissingDesctiption < ActiveRecord::Migration[6.0]
  def change
    add_column :predictions, :desctiption, :string
  end
end
