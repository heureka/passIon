import os


DEBUG = os.getenv('DEBUG', 'False').lower() in ("yes", "true", "t", "1")

# Redis configuration
REDIS_HOST = os.getenv('REDIS_HOST', 'redis')
REDIS_PORT = int(os.getenv('REDIS_PORT', 6379))
REDIS_DB = int(os.getenv('REDIS_DB', 0))
REDIS_PASSWORD = os.getenv('REDIS_PASSWORD', None)

# Untouched password entries will be deleted after this period (in seconds)
TTL = int(os.getenv('TTL', 600))    # 10 min

# APPLICATION SERVER
APP_PORT = int(os.getenv('APP_PORT', 5000))
APP_HOST = '0.0.0.0'

# User Agent blacklist to prevent password withdrawal by bot (in lowercase)
UA_BLACKLIST = [
    'facebook',
    'googlebot',
    'slack'
    'bot',
    'external-hit',
    'fetcher',
    'twitterbot',
    'telegrambot'
]
