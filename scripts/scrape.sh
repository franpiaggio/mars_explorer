#!/bin/bash
BACKEND=$(docker ps -qf "name=backend-m4ss8so4w48oos8scw0gkw4s")
if [ -z "$BACKEND" ]; then
  echo "$(date) - Backend container not found" >> /tmp/scrape.log
  exit 1
fi
echo "$(date) - Starting scrape" >> /tmp/scrape.log
docker exec $BACKEND bundle exec rake scrape_perseverance >> /tmp/scrape.log 2>&1
docker exec $BACKEND bundle exec rake scrape_curiosity >> /tmp/scrape.log 2>&1
echo "$(date) - Scrape finished" >> /tmp/scrape.log
