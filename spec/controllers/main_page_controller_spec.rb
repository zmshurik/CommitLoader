require 'rails_helper'

RSpec.describe MainPageController, type: :controller do
  describe 'GET main page' do
    it 'has a 200 status code' do
      get :show
      expect(response.status).to eq(200)
    end
  end
end
