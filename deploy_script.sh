cd tictactoe_rails_react 
sudo docker-compose down
git fetch origin
git reset --hard origin/develop  &&  echo 'You are doing well'
sudo docker-compose build && sudo docker-compose up -d