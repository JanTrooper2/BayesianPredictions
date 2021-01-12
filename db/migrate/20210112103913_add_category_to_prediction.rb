class AddCategoryToPrediction < ActiveRecord::Migration[6.0]
  def change
    add_column :predictions, :category, :string
  end
end
