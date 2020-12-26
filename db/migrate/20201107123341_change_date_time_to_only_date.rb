class ChangeDateTimeToOnlyDate < ActiveRecord::Migration[6.0]
  def change
    remove_column :predictions, :expiration_date
    add_column :predictions, :expiration_date, :date
  end
end
