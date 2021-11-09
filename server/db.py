import psycopg2
import click 
from flask import current_app, g
from flask.cli import with_appcontext
from werkzeug.security import generate_password_hash
from .models import student, complaint, department
import random
from uuid import uuid4 as generateId
from faker import Faker
import datetime
fake = Faker()

def getDb():
    if 'db' not in g:
        db = current_app.config['DB_NAME']
        g.db = psycopg2.connect(f"dbname={db}", sslmode='require')

    return g.db


def closeDb(e=None):
    db = g.pop('db', None)

    if db is not None:
        db.close()

class studentDao(object):
    def __init__(self):
        self.__db = getDb()
        self.__cur = self.__db.cursor()

    def register(self, std):
        userId = std.get_user_id()

        if self.getUser(userId) is not None:
            return False

        password = generate_password_hash(std.get_password(), method='sha256')
        name = std.get_name()
        email = std.get_mail()
        phno = std.get_phno()

        self.__cur.execute("insert into student (username, password, name, email, phoneNo, server_id) values (%s, %s, %s, %s, %s, %s)", (userId, password, name, email, phno, random.randint(2, 9)))
        self.__db.commit()
        return True

    def getUser(self, userId):
        self.__cur.execute("select username, password from student where username = %s",(userId,))
        return self.__cur.fetchone()

class departmentDao(object):
    def __init__(self):
        self.__db = getDb()
        self.__cur = self.__db.cursor()

    def register(self, dept):
        deptId = dept.get_dep_id()
        
        if self.getDepartment(deptId) is not None:
            return False

        password = generate_password_hash(dept.get_password(), method='sha256')
        name = dept.get_name()

        self.__cur.execute("insert into departments (deptId, password, name) values (%s, %s, %s, %s, %s)", (deptId, password, name, email, phno))
        self.__db.commit()
        return True

    def getUser(self, deptId):
        self.__cur.execute("select deptId, password from departments where deptId = %s",(deptId,))
        return self.__cur.fetchone()

class complaintDao(object):
    def __init__(self):
        self.__db = getDb()
        self.__cur = self.__db.cursor()

    def addComplaint(self, complaint):
        complaintId = generateId()
        userId = complaint.getUserId()
        deptId = complaint.getDepId()
        title = complaint.getTitle()
        description = complaint.getDiscription()
        status = complaint.getStatus()
        date = datetime.datetime.now()

        self.__cur.execute("insert into complaints (complaintId, userId, deptId, title, description, status, date, server_id) values (%s, %s, %s, %s, %s, %s, %s, %s)", (complaintId, userId, deptId, title, description, status, date, random.randint(2, 9)))
        self.__db.commit()
        return complaintId

    def updateComplaint(self, complaintId, description):
        self.__cur.execute("update complaints set description = %s where complaintId = %s", (description, complaintId))
        self.__db.commit()

    def updateStatus(self, complaintId, status):
        self.__cur.execute("update complaints set status = %s where complaintId = %s", (status, complaintId))
        self.__db.commit()

    def getfeedback(self, complaintId, feedback, stars):
        self.__cur.execute("update complaints set feedback = %s, stars = %s where complaintId = %s", (feedback, stars, complaintId))
        self.__db.commit() 


def initDb():
    db = getDb()
    cur = db.cursor()
    f = current_app.open_resource("sql/tables.sql")
    sqlCode = f.read().decode("utf-8")
    cur.execute(sqlCode)
    db.commit()
    for i in range(1,10):
        cur.execute("insert into server (id, name, ip, port) values (%s, %s, %s, %s)", (i, fake.user_name(), fake.ipv4(), random.randint(1, 65535)))
        db.commit()

    cur.close()
    closeDb()

@click.command('initdb', help="initialise the database") 
@with_appcontext
def addCommand():
    initDb()
    click.echo('Data Base Initialised')

def init_app(app):
    app.teardown_appcontext(closeDb)
    app.cli.add_command(addCommand)