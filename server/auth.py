from flask import Blueprint, render_template, request, flash, jsonify, session, g
from flask.helpers import url_for
from werkzeug.security import check_password_hash
from werkzeug.utils import redirect
from . import db
from .models import User
import json
from flask_jwt_extended import create_access_token, jwt_required
import functools

auth = Blueprint('auth', 'backEnd', url_prefix= '/')

@auth.route('/register', methods = 'POST')
def register():
    data = json.loads(request.data)
    userName = data['userName']
    pswrd = data['pass']
    name = data['name']
    phoneNo = data['phoneNo']

    if db.uniqueId(userName):
        t = db.insert(d, 1, None)
        access_token = create_access_token(t[0])
        return jsonify(dict(variant = 'success', msg = "New account created.", accessToken = access_token, userId = t[0]))
    else:
        return jsonify(dict(variant = 'danger', msg = "Sorry User Name not available, Pick a new User Name"))

    return jsonify(dict(msg = 'Unknown operation', variant = 'danger'))


@auth.route('/login', methods = 'POST')
def login():
    data = json.loads(request.data)
    userId = data['userName']
    pswrd = data['pass']
    actor = data['actor']

    if actor == 'student':
        t = studentDao.checkUserName(userId)
    else:
        t = depDao.checkUserName(userId)

    if t == None:
        return jsonify(dict(msg = 'Invalid username!', variant = 'danger'))
        
    elif check_password_hash(hashedPass, pswrd):
        session["user_id"] = t[0]
        access_token = create_access_token(t[0])
        return jsonify(dict(msg = 'Successfully logged in!', variant = 'success', accessToken = access_token, userId = t[0]))
        
    else:
        return jsonify(dict(msg = 'Invalid Username or password', variant = 'danger'))

    return jsonify(dict(msg = 'Unknown operation', variant = 'danger'))


@auth.route('/logout', methods = 'GET')
@jwt_required()
def logout():
    session.clear()
    return jsonify(dict(msg = 'Successfully logged out!', variant = 'success'))

