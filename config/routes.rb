Rails.application.routes.draw do
  root :to => 'main_page#show'
  resources :commits, only: [:index, :create]
  delete '/commits' => 'commits#destroy', as: :group_delete
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
