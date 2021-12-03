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


def test_register(client):

    header = {
        'Content-Type': 'application/json'
    }
    
    student = {
        'userName': faker.user_name(),
        'email': faker.email(),
        'name': faker.name(),
        'password': 'test',
        'phno': faker.phone_number(),
        'actor': 'student'

    }

    department = {
        'userName': faker.user_name(),
        'name': faker.name(),
        'password': 'test',
        'actor': 'department'
    }

    print(f'{url}/api/auth/register')
    response = client.post(f'{url}/register', data= json.dumps(student), headers= header) 

    assert response.status_code == 200
    assert response.json['variant'] == 'success'

    response = client.post(f'{url}/register', data= json.dumps(student), headers= header) 

    assert response.json['variant'] == 'danger'
    response = client.post(f'{url}/register', data= json.dumps(department), headers= header)

    assert response.status_code == 200
