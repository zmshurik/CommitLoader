class CommitsController < ApplicationController
  def index
    page = params[:page] || 1
    answer = {
      items: Commit.paginate(page: page),
      totalItems: Commit.count
    }
    render json: answer
  end

  def create
    @response = HTTP.get(render_url)
    load_data if @response.status == 200
    render json: render_response_body
  end

  def destroy
    Commit.destroy(params[:ids]) unless params[:ids].nil?
    render json: { status: 'success' }
  end

  private

  def render_url
    owner = params[:owner]
    repo = params[:repo]
    author = params[:author]
    base = "https://api.github.com/repos/#{owner}/#{repo}/commits"
    author == '' ? base : "#{base}?author=#{author}"
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
