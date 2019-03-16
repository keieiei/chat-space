class MessagesController < ApplicationController
  def index
    @group_info = Group.find(params[:group_id])
  end

  def create
  end
end
