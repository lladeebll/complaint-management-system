from flask import Blueprint, render_template, request, flash, jsonify, session, g
from flask.helpers import url_for
from werkzeug.security import check_password_hash
from werkzeug.utils import redirect
from . import db
from .models import student, department, complaint
import json
from flask_jwt_extended import create_access_token, jwt_required
import functools

auth = Blueprint('auth', 'backEnd', url_prefix= '/')

@auth.route('/register', methods = ['POST'])
def register():
    data = json.loads(request.data)
    userName = data['userName']

    if data['actor'] == 'student':
        actorDao = db.studentDao()
        actor = student(userName, data['password'], data['name'], data['phno'], data['email'], [])

    else:
        actorDao = db.departmentDao()
        actor = department(userName, data['name'], data['password'], [])    

    if actorDao.register(actor):
        access_token = create_access_token(userName)
        return jsonify(dict(variant = 'success', msg = "New account created.", accessToken = access_token, userId = userName))
    else:
        return jsonify(dict(variant = 'danger', msg = "Sorry User Name not available, Pick a new User Name"))

    return jsonify(dict(msg = 'Unknown operation', variant = 'danger'))


@auth.route('/login', methods = ['POST'])
def login():
    data = json.loads(request.data)
    id = data['userName']
    pswrd = data['password']

    if data['actor'] == 'student':
        actor = db.studentDao()
    else:
        actor = db.departmentDao()

    t = actor.getUser(id)

    if t == None:
        return jsonify(dict(msg = 'Invalid username!', variant = 'danger'))
        
    elif check_password_hash(t[1], pswrd):
        session["user_id"] =id 
        access_token = create_access_token(id)
        return jsonify(dict(msg = 'Successfully logged in!', variant = 'success', accessToken = access_token, userId = id))
        
    else:
        return jsonify(dict(msg = 'Invalid Username or password', variant = 'danger'))

    return jsonify(dict(msg = 'Unknown operation', variant = 'danger'))


@auth.route('/logout')
@jwt_required()
def logout():
    session.clear()
    return jsonify(dict(msg = 'Successfully logged out!', variant = 'success'))

