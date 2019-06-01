require 'rails_helper'

RSpec.describe ComitsController, type: :controller do
  describe 'POST create' do
    before(:each) do
      stub_request(:get, 'https://api.github.com/repos/thoughtbot/guides/commits')
        .with(
          body: { 'author' => '' },
          headers: { 'Content-Type' => 'application/json' }
        )
        .to_return(body: file_fixture('commits.json').read)
    end

    it 'has a 200 status code' do
      post :create, params: { owner: 'thoughtbot', repo: 'guides', author: '' }
      expect(response.status).to eq(200)
    end

    it 'should make request' do
      expect(a_request(:get, 'https://api.github.com/repos/thoughtbot/guides/commits')
        .with(
          body: { 'author' => '' },
          headers: { 'Content-Type' => 'application/json' }
        ))
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
end
