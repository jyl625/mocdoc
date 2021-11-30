Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  root to: 'static_pages#root'

  namespace :api, defaults: {format: :json} do
    resources :users, only: [:create]
    # no :show for user
    resources :providers, only: [:show]
    # resource :session, only: [:create, :destroy]
    # resources :insurances, only: [:show]
    resources :insurances, only: [:index]
    resource :session, only: [:create, :destroy, :show]
    # no :show for session
  end

end
