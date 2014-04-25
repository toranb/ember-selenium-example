#!/bin/bash

npm install
node node_modules/grunt-cli/bin/grunt local
python js/selenium/run_selenium.py
