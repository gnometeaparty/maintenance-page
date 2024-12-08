#!/bin/bash

redis-cli -u $REDIS_URL HSET maintenance:config enabled false

echo "✅ Maintenance mode disabled"
