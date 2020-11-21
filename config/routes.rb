Rails.application.routes.draw do
  #devise_for :users
  get 'profile/:id' => 'users#show'
  get 'users' => 'users#index'
  devise_for :users, controllers: { 
    registrations: 'user/registrations',
    sessions: 'devise/sessions',
    passwords:'devise/passwords', 
    confirmations: 'devise/confirmations', 
    unlocks: 'devise/unlocks' 
  }
  resources :predictions 
  get 'predictions_filtered', to: 'predictions#filter'
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  root "predictions#index"
end
