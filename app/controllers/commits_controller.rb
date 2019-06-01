class CommitsController < ApplicationController
  respond_to :json

  def create
    json = {
      message: '',
      status: 'success'
    }

    render json: json
  end
end
