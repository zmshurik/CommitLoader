class CommitsController < ApplicationController
  def create
    @response = HTTP.get(render_url, json: { 'author' => params[:author] })
    load_data if @response.status == 200
    render json: render_response_body
  end

  private

  def render_url
    owner = params[:owner]
    repo = params[:repo]
    "https://api.github.com/repos/#{owner}/#{repo}/commits"
  end

  def render_response_body
    case @response.status
    when 404
      { message: 'Not found', status: 'error' }
    when 200 
      { message: '', status: 'success' }
    else
      { message: 'Unexpected error', status: 'error' }
    end
  end

  def load_data
    Commit.destroy_all
    parse_response_body.each do |commit|
      Commit.create(commit)
    end
  end

  def parse_response_body
    @response.parse.map do |item|
      {
        sha: item['sha'],
        author: item['commit']['author']['name'],
        committer: item['commit']['committer']['name'],
        message: item['commit']['message']
      }
    end
  end
end
