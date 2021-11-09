import psycopg2
import click 
from flask import current_app, g
from flask.cli import with_appcontext
from werkzeug.security import generate_password_hash
from .models import student, complaint, department
import random
from uuid import uuid4 as generateId
import datetime

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
        userId = std.userId

        if self.getUser() is not None:
            return False

        password = generate_password_hash(std.password, method='sha256')
        name = std.name
        email = std.email
        phno = std.phno

        __cur.execute("insert into student (username, password, name, email, phno, server) values (%s, %s, %s, %s, %s, %s)", (userId, password, name, email, phno, random.randint(2, 9)))
        __db.commit()
        return True

        def getUser(userId):
            __cur.execute("select username, password from students where username = %s",(userId,))
            return __cur.fetchone()

class departmentDao(object):
    def __init__(self):
        self.__db = getDb()
        self.__cur = self.__db.cursor()

    def register(self, dept):
        deptId = dept.deptId
        
        if self.getDepartment(deptId) is not None:
            return False

        password = generate_password_hash(dept.password, method='sha256')
        name = dept.name
        email = dept.email
        phno = dept.phno

        __cur.execute("insert into departments (deptId, password, name, email, phno, server) values (%s, %s, %s, %s, %s, %s)", (deptId, password, name, email, phno, 1))
        __db.commit()

    def getUser(self, deptId):
        __cur.execute("select deptId, password from departments where deptId = %s",(deptId,))
        return __cur.fetchone()

class complaintDao(object):
    def __init__(self):
        self.__db = getDb()
        self.__cur = self.__db.cursor()

    def addComplaint(self, complaint):
        complaintId = generateId()
        userId = complaint.userId
        deptId = complaint.deptId
        title = complaint.titile
        description = complaint.description
        status = complaint.status
        date = datetime.datetime.now()

        __cur.execute("insert into complaints (complaintId, userId, deptId, title, description, status, date, server) values (%s, %s, %s, %s, %s, %s, %s, %s)", (complaintId, userId, deptId, title, description, status, date, random.randint(2, 9)))
        __db.commit()
        return complaintId

    def updateComplaint(self, complaintId, description):
        __cur.execute("update complaints set description = %s where complaintId = %s", (description, complaintId))
        __db.commit()

    def updateStatus(self, complaintId, status):
        __cur.execute("update complaints set status = %s where complaintId = %s", (status, complaintId))
        __db.commit()

    def getfeedback(self, complaintId, feedback, stars):
        __cur.execute("update complaints set feedback = %s, stars = %s where complaintId = %s", (feedback, stars, complaintId))
        __db.commit() 


def initDb():

    db = getDb()
    cur = db.cursor()
    f = current_app.open_resource("sql/tables.sql")
    sqlCode = f.read().decode("utf-8")
    cur.execute(sqlCode)
    cur.close()
    db.commit()
    closeDb()

@click.command('initdb', help="initialise the database") 
@with_appcontext
def addCommand():
    initDb()
    click.echo('Data Base Initialised')

def init_app(app):
    app.teardown_appcontext(closeDb)
    app.cli.add_command(addCommand)