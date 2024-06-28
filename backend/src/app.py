from flask import Flask, request, jsonify
from sqlalchemy import create_engine, Integer,Column, String
from sqlalchemy.orm import sessionmaker
from sqlalchemy.ext.declarative import declarative_base
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

db_name = "oplesk"
db_user = "gianfranco"
db_host = "localhost"
db_port = "5432"

engine = create_engine(f'postgresql://{db_user}@{db_host}:{db_port}/{db_name}')
Session = sessionmaker(bind=engine)
Base = declarative_base()

session = Session()

class FormulariosUser(Base):
    __tablename__ = 'formularios'
    id = Column(Integer, primary_key=True)
    nombre = Column(String(110), unique=True)
    correo = Column(String(110), unique=True)
    edad = Column(Integer)

    def __init__(self, nombre, correo, edad):
        self.nombre = nombre
        self.correo = correo
        self.edad = edad
Base.metadata.create_all(engine)

@app.route('/admin', methods=['POST'])
def get_formularios():
    if request.method == 'POST':
        data = request.json
        nombre = data.get('nombre')
        correo = data.get('correo')
        edad = data.get('edad')
        if nombre and correo and edad:
            get_formularios = FormulariosUser(nombre, correo, edad)
            session.add(get_formularios)
            session.commit()
            return jsonify({nombre: nombre, correo: correo, edad: edad})


@app.route('/usuarios', methods=['GET'])
def registrados():
    if request.method == 'GET':
        session = Session()
        users = session.query(FormulariosUser).all()
        data = [{"id": user.id, "nombre": user.nombre, "correo": user.correo, "edad": user.edad} for user in users]
        return jsonify(data)
    
@app.route('/delete/<int:user_id>', methods=['DELETE'])
def eliminar_usuarios(user_id):
    if request.method == 'DELETE':
        session = Session()
        users = session.query(FormulariosUser).get(user_id)
        if users:
            session.delete(users)
            session.commit()
            session.close()
            return jsonify({'message': 'Usuario Eliminado Correctamente'})
    
@app.route('/usuarios/<int:user_id>', methods=['PUT'])
def actualizar_usuarios(user_id):
    if request.method == 'PUT':
        session = Session()
        users = session.query(FormulariosUser).get(user_id)
        if users:
            data = request.json
            users.nombre = data.get('nombre', users.nombre)
            users.correo = data.get('correo', users.correo)
            users.edad = data.get('edad', users.edad)
            session.commit()
            session.close()
            return jsonify({'message': 'Se actualizo correctamente'})


if __name__ == '__main__':
    app.run(debug=True)