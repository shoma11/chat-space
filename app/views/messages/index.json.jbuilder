json.array! @new_messages do |message|
  json.content  message.content
  json.name     message.user.name
  json.date     message.created_at.to_s
  json.image_url message.image.url
  json.id       message.id
end
