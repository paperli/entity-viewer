#!/bin/sh
BASEDIR=$(dirname "$0")
cd $BASEDIR
npm start | ngrok http 5000