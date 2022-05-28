#!/bin/bash

# Install npm packages
sudo yarn install && sudo yarn build

# Restart private machinee
pm2 restart server
