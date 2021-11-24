from flask import Blueprint, render_template, request, flash, jsonify, session, g
from flask import current_app as app
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
        actor = student(userName, data['name'], data['email'], data['password'], data['phno'], None, []) 
        app.student = actor
    else:
        actorDao = db.departmentDao()
        actor = department(userName, data['name'], 0, data['password'], 0, []) 
        app.department = actor

    if actorDao.register(actor):
        access_token = create_access_token(userName)
        del actorDao
        return jsonify(dict(variant = 'success', msg = "New account created.", accessToken = access_token, userId = userName))
    else:
        del actor
        del actorDao
        return jsonify(dict(variant = 'danger', msg = "Sorry User Name not available, Pick a new User Name"))

    return jsonify(dict(msg = 'Unknown operation', variant = 'danger'))


@auth.route('/login', methods = ['POST'])
def login():
    data = json.loads(request.data)
    id = data['userName']
    pswrd = data['password']

    if data['actor'] == 'student':
        actorDao = db.studentDao()
    else:
        actorDao = db.departmentDao()

    t = actorDao.getUserDetails(id)

    if t == None:
        del actorDao
        return jsonify(dict(msg = 'Invalid username!', variant = 'danger'))
        
    elif check_password_hash(t[3], pswrd):
        session["user_id"] = id 
        access_token = create_access_token(id)

        def getComplaintObjects(c):
            complaints = []
            for i in c:
                com = complaint(i[0], i[1], i[2], i[3], i[4], i[5], i[6], i[7], i[8], i[9])
                complaints.append(com)

            return complaints

        if data['actor'] == 'student':
            c = actorDao.getComplaints(id)
            com = getComplaintObjects(c)
            actor = student(id, t[1], t[2], t[3], t[4], t[5], com)
            app.student = actor
        else:
            c = actorDao.getComplaints(id)
            comp = getComplaintObjects(c)
            actor = department(id, t[1], t[2], t[3], t[4], comp)
            app.department = actor

        del actorDao
        return jsonify(dict(msg = 'Successfully logged in!', variant = 'success', accessToken = access_token, userId = id))
        
    else:
        del actorDao
        return jsonify(dict(msg = 'Invalid Username or password', variant = 'danger'))

    return jsonify(dict(msg = 'Unknown operation', variant = 'danger'))


@auth.route('/logout')
@jwt_required()
def logout():
    del app.actor
    return jsonify(dict(msg = 'Successfully logged out!', variant = 'success'))

