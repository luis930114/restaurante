from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from config import Config
from flask_cors import CORS
from flask_login import LoginManager

db = SQLAlchemy()
migrate = Migrate()
login_manager = LoginManager() #inicializa librería de login

def create_app():
    app = Flask(__name__)
    app.secret_key = "7af4636e5484c982dc11098802f796a4c8406d033c25dbd730d1770dfabdc506"
    app.config.from_object(Config)

    CORS(app)

    db.init_app(app)
    migrate.init_app(app, db)
    login_manager.init_app(app)  # Configura el LoginManager
    # Configurar la vista de inicio de sesión
    login_manager.login_view = 'routes.login'


    # Importar y registrar el Blueprint de rutas
    from .routes import routes_bp
    from .menus import menus_bp
    from .productos import productos_bp
   

    app.register_blueprint(routes_bp)
    app.register_blueprint(menus_bp)
    app.register_blueprint(productos_bp)


    with app.app_context():
        db.create_all()
    
    #print(app.url_map)  # Agrega esto en el main.py justo antes de app.run


    return app
