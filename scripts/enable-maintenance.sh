#!/bin/bash

redis-cli -u $REDIS_URL HSET maintenance:config enabled true

echo "✅ Maintenance mode enabled"
