from flask import Flask, request, jsonify
from app import create_app, db
from app.models import Reserva, Usuario
from datetime import datetime
from flask_cors import CORS

#from app import create_app

app = create_app()

CORS(app)  # Esto habilita CORS para todas las rutas y orígenes

if __name__ == '__main__':
    #app.run(debug=True)
    app.run(host='0.0.0.0', port=5000)

