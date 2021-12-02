from flask import Blueprint, jsonify, request, current_app as app
from .db import departmentDao 
from .models import department, complaint
from flask_jwt_extended import get_jwt_identity, jwt_required
import json

api = Blueprint('depApi', 'backEnd', url_prefix= '/api/department')

@api.route('/getcomplaints', methods = ['GET'])
@jwt_required()
def getComplaints():
    return app.department.jsonObj()

@api.route('/getdescriptions', methods = ['POST'])
@jwt_required()
def getDescriptions():
    id = request.json['complaint_id']
    res = app.department.getComplaintDetails(id)
    if res:
        return res, 200
    else:
        return jsonify({"message": "No complaint found"}), 400

@api.route('/editstatus', methods = ['POST'])
@jwt_required()
def editStatus():
    data = request.get_json()
    id = data['id']
    status = data['status']
    dep = departmentDao()
    done = dep.updateStatus(id, status)
    del dep
    if done: 
        return jsonify({'message': 'Status updated successfully'}), 200
    else:
        return jsonify({'message': 'Couldnt Edit status'}), 400
