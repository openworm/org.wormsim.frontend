#!/bin/bash
if [ -n "$1" ]; then
docker run -d --name wormsim --publish=8080:8080 -e BRANCH=$1 openworm/wormsim:latest
else
docker run -d --name wormsim --publish=8080:8080 openworm/wormsim:latest
fi
