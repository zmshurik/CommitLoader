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
    client = Octokit::Client.new
    client.auto_paginate = true
    begin
      query = params[:author] == '' ? {} : { author: params[:author] }
      @res = client.commits({ owner: params[:owner], repo: params[:repo] }, query)
    rescue Octokit::NotFound
      render json: { message: 'Not found', status: 'error' }
    else
      @res = [] if @res.nil?
      create_commits
      render json: { message: '', status: 'success' }
    end
  end

  def destroy
    Commit.destroy(params[:ids]) unless params[:ids].nil?
    render json: { status: 'success' }
  end

  private

  def create_commits
    Commit.destroy_all
    parse_response_body.each do |commit|
      Commit.create(commit)
    end
  end

  def parse_response_body
    @res.map do |item|
      {
        sha: item['sha'],
        author: item['commit']['author']['name'],
        committer: item['commit']['committer']['name'],
        message: item['commit']['message']
      }
    end
  end
end
