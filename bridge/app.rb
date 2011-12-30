# -*- coding: utf-8 -*-
require 'sinatra'
require 'ruby_gntp'

post '/notify' do
  data = {
    :app_name => params[:page_title],
    :title    => params[:title],
    :text     => params[:text],
  }
  unless params[:icon].empty? then
    data[:icon] = params[:icon]
  end
  GNTP.notify(data)
  'ok'
end
