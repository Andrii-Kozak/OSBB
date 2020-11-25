class Api::ApiController < ApplicationController
  include Pundit
  protect_from_forgery with: :null_session
end
