class AddColumnsAndIndexes < ActiveRecord::Migration[6.0]
  def change
    add_column :predictions
  end
end
