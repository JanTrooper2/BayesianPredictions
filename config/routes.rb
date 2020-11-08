Rails.application.routes.draw do
  devise_for :users
  resources :predictions 
  get 'predictions_filtered', to: 'predictions#filter'
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  root "predictions#index"
end
