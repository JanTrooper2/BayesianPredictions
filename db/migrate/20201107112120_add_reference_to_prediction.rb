class AddReferenceToPrediction < ActiveRecord::Migration[6.0]
  def change
    add_reference :predictions, :user, index:true
  end
end
