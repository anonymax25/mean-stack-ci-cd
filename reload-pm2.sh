#!/bin/bash
cd ~/aws-codedeploy
ls
docker-compose down
docker-compose build
pm2 startOrReload ecosystem.config.js 