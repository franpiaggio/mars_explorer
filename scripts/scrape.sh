#!/bin/bash
LOG="/tmp/scrape.log"

BACKEND=$(docker ps -qf "name=backend-" | head -1)
if [ -z "$BACKEND" ]; then
  echo "$(date) - Backend container not found" >> "$LOG"
  exit 1
fi

echo "$(date) - Starting scrape (container: $BACKEND)" >> "$LOG"
docker exec "$BACKEND" bundle exec rake scrape_perseverance >> "$LOG" 2>&1
docker exec "$BACKEND" bundle exec rake scrape_curiosity >> "$LOG" 2>&1
echo "$(date) - Scrape finished" >> "$LOG"
