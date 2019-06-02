require 'rails_helper'

RSpec.describe CommitsController, type: :controller do
  describe 'POST create' do
    before(:each) do
      stub_request(:get, 'https://api.github.com/repos/thoughtbot/guides/commits')
        .to_return(body: file_fixture('commits.json').read, headers: { 'Content-type' => 'application/json' })
      stub_request(:get, 'https://api.github.com/repos/noname/guides/commits')
        .to_return(status: 404, body: '{"message":"Not found"}', headers: { 'Content-type' => 'application/json' })
    end

    it 'has a 200 status code' do
      post :create, params: { owner: 'thoughtbot', repo: 'guides', author: '' }
      expect(response.status).to eq(200)
    end

    it 'should return "Not found" for incorrect request' do
      post :create, params: { owner: 'noname', repo: 'guides', author: '' }
      expect(response.body).to include 'Not found'
    end

    it 'should make request' do
      post :create, params: { owner: 'thoughtbot', repo: 'guides', author: '' }
      expect(a_request(:get, 'https://api.github.com/repos/thoughtbot/guides/commits'))
        .to have_been_made.once
    end

    it 'should load commits' do
      post :create, params: { owner: 'thoughtbot', repo: 'guides', author: '' }
      expect(Commit.count).to eq(30)
    end

    it 'shoul delete old commits' do
      post :create, params: { owner: 'thoughtbot', repo: 'guides', author: '' }
      post :create, params: { owner: 'thoughtbot', repo: 'guides', author: '' }
      expect(Commit.count).to eq(30)
    end
  end

  describe 'GET index' do
    it 'has a 200 status code' do
      get :index
      expect(response.status).to eq(200)
    end

    it 'should return json' do
      get :index
      expect(response.headers['Content-type']).to include 'json'
    end
  end
end
