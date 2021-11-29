import os
from datetime import timedelta

class Config(object):
    DEBUG = False
    TESTING = False
    SECRET_KEY = '(:guessTheKey:)'
    JWT_SECRET_KEY = '(:guessTheKey_JWTVersion:)'

    DB_NAME = os.environ['DATABASE_URL']
    SESSION_TYPE = 'filesystem'
    JWT_ACCESS_TOKEN_EXPIRES= timedelta(days=1)

    SESSION_COOKIE_SECURE = True

class developmentConfig(Config):

    DEBUG = False
    SESSION_COOKIE_SECURE = True


class testingConfig(Config):
    TESTING = True

class productionConfig(Config):
    pass