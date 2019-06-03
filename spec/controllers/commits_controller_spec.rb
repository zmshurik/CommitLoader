require 'rails_helper'

RSpec.describe CommitsController, type: :controller do
  AMOUNT_OF_RECORDS = 30

  before(:each) do
    stub_request(:get, 'https://api.github.com/repos/thoughtbot/guides/commits?per_page=100')
      .to_return(body: file_fixture('commits.json').read, headers: { 'Content-type' => 'application/json' })
    stub_request(:get, 'https://api.github.com/repos/thoughtbot/guides/commits?per_page=100&author=fedya')
      .to_return(status: 200, body: '', headers: { 'Content-type' => 'application/json' })
    stub_request(:get, 'https://api.github.com/repos/noname/guides/commits?per_page=100')
      .to_return(status: 404, body: '{"message":"Not found"}', headers: { 'Content-type' => 'application/json' })
  end

  describe 'POST create' do
    it 'has a 200 status code' do
      post :create, params: { owner: 'thoughtbot', repo: 'guides', author: '' }
      expect(response.status).to eq(200)
    end

    it 'should make request' do
      post :create, params: { owner: 'thoughtbot', repo: 'guides', author: '' }
      expect(a_request(:get, 'https://api.github.com/repos/thoughtbot/guides/commits?per_page=100'))
        .to have_been_made.once
    end

    it 'should make request with author' do
      post :create, params: { owner: 'thoughtbot', repo: 'guides', author: 'fedya' }
      expect(a_request(:get, 'https://api.github.com/repos/thoughtbot/guides/commits?per_page=100&author=fedya'))
        .to have_been_made.once
    end

    it 'should load commits' do
      post :create, params: { owner: 'thoughtbot', repo: 'guides', author: '' }
      expect(Commit.count).to eq(AMOUNT_OF_RECORDS)
    end

    it 'shoul delete old commits' do
      post :create, params: { owner: 'thoughtbot', repo: 'guides', author: '' }
      post :create, params: { owner: 'thoughtbot', repo: 'guides', author: '' }
      expect(Commit.count).to eq(AMOUNT_OF_RECORDS)
    end

    it 'should return "Not found" for incorrect request' do
      post :create, params: { owner: 'noname', repo: 'guides', author: '' }
      expect(response.body).to include 'Not found'
    end
  end

  describe 'GET index' do
    it 'has a 200 status code' do
      get :index
      expect(response.status).to eq(200)
    end

    it 'should return json' do
      get :index
      expect(response.headers['Content-Type']).to include 'json'
    end
  end

  describe 'DELETE destroy' do
    it 'has a 200 status code' do
      delete :destroy, params: { ids: [] }
      expect(response.status).to eq(200)
    end

    it 'should delete records' do
      post :create, params: { owner: 'thoughtbot', repo: 'guides', author: '' }
      ids = Commit.all.take(4).map(&:id)
      delete :destroy, params: { ids: ids }
      expect(-> { Commit.find(ids) }).to raise_error(ActiveRecord::RecordNotFound)
    end
  end
end
