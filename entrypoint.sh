#!/bin/bash
if [ ! -f /.initialized ]; then
echo $USER
bundle config set --local git.allow_insecure true
bundle install
npm install
rails db:create
rails db:migrate
touch /.initialized
fi
exec "$@"
