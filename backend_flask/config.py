import os
basedir = os.path.abspath(os.path.dirname(__file__))


class Config:
    SQLALCHEMY_DATABASE_URI = 'sqlite:///' + os.path.join(basedir, 'restaurante.db')
    #SQLALCHEMY_DATABASE_URI = 'mysql+pymysql://username:password@localhost/restaurante'
    SQLALCHEMY_TRACK_MODIFICATIONS = False
