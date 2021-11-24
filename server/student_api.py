from flask import Blueprint, jsonify, request, current_app as app
from .db import studentDao 
from .models import student, complaint
from flask_jwt_extended import get_jwt_identity, jwt_required
import json

api = Blueprint('stdApi', 'backEnd', url_prefix= '/api/student')

@api.route('/getcomplaints', methods = ['GET'])
@jwt_required()
def getComplaints():
    return app.student.jsonObj()

@api.route('/addcomplaint', methods = ['POST'])
@jwt_required()
def addComplaint():
    userId = get_jwt_identity()
    data = request.get_json()
    c = complaint(None, data['title'], data['description'], "waiting", None,'', -1, data['depId'], userId, None) 
    st = studentDao()
    st.addComplaint(c)
    app.student.addComplaint(c)
    del st
    return jsonify({'message': 'Complaint added successfully'}) , 200