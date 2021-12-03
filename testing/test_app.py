from server import create_app
from faker import Faker
import random
import json

faker = Faker()
n = 86
t = 34
url = 'http://127.0.0.1:5000'

def test_config():
    assert create_app().testing


# def test_register(client):

#     header = {
#         'Content-Type': 'application/json'
#     }
    
#     student = {
#         'userName': 'testuser1',
#         'email': faker.email(),
#         'name': faker.name(),
#         'password': 'test',
#         'phno': faker.phone_number(),
#         'actor': 'student'

#     }

#     department = {
#         'userName': 'testdep1',
#         'name': faker.name(),
#         'password': 'test',
#         'actor': 'department'
#     }

#     response = client.post(f'{url}/register', data= json.dumps(student), headers= header) 

#     assert response.status_code == 200
#     assert response.json['variant'] == 'success'

#     response = client.post(f'{url}/register', data= json.dumps(student), headers= header) 

#     assert response.json['variant'] == 'danger'
#     response = client.post(f'{url}/register', data= json.dumps(department), headers= header)

#     assert response.status_code == 200

def test_login(client):
    header = {
        'Content-Type': 'application/json'
    }

    student = {
        'userName': 'testuser1',
        'password': 'test',
        'actor': 'student'
    }

    response = client.post(f'{url}/login', data= json.dumps(student), headers= header)

    assert response.status_code == 200

    department = {
        'userName': 'testdep1',
        'password': 'test',
        'actor': 'department'
    }

    response = client.post(f'{url}/login', data= json.dumps(department), headers= header)

    assert response.status_code == 200

def test_getComplaints(client):
    header1 = {
        'Content-Type': 'application/json'
    }

    student = {
        'userName': 'testuser1',
        'password': 'test',
        'actor': 'student'
    }

    department = {
        'userName': 'testdep1',
        'password': 'test',
        'actor': 'department'
    }

    response = client.post(f'{url}/login', data= json.dumps(student), headers= header1)
    token = response.json['accessToken']

    header2 = {
        'Content-Type': 'application/json',
        'Authorization': f'Bearer {token}'
    }

    response = client.get(f'{url}/api/student/getcomplaints', headers= header1)
    assert response.status_code == 401

    response = client.get(f'{url}/api/student/getcomplaints', headers= header2)
    assert response.status_code == 200

    response = client.post(f'{url}/logout', data = json.dumps({"actor":"student"}), headers= header2)
    assert response.status_code == 200

    response = client.post(f'{url}/login', data= json.dumps(department), headers= header1)
    token = response.json['accessToken']

    header3 = {
        'Content-Type': 'application/json',
        'Authorization': f'Bearer {token}'
    }

    response = client.get(f'{url}/api/department/getcomplaints', headers= header1)
    assert response.status_code == 401

    response = client.get(f'{url}/api/department/getcomplaints', headers= header3)
    assert response.status_code == 200
    client.post(f'{url}/logout', data = json.dumps({"actor":"department"}), headers= header3)



