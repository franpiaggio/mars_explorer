class Api::V1::AvailableDatesController < ApplicationController
  def index
    rover = Rover.find_by name: params[:rover_id].capitalize
    if rover.present?
      manifest = rover.photo_manifest
      render json: { available_dates: manifest.photos }
    else
      render json: { errors: "Invalid Rover Name" }, status: :bad_request
    end
  end
end
