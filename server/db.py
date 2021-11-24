import psycopg2
import click 
from flask import current_app, g
from flask.cli import with_appcontext
from werkzeug.security import generate_password_hash
from .models import student, complaint, department
import random
from uuid import uuid4 as generateId
import datetime
from faker import Faker
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
        server_id = random.randint(2, 9)
        std.set_server(server_id)

        self.__cur.execute("insert into student (username, password, name, email, phoneNo, server_id) values (%s, %s, %s, %s, %s, %s)", (userId, password, name, email, phno, server_id))
        self.__db.commit()
        return True

    def addComplaint(self, complaint):
        complaintId = str(generateId())

        while self.getComplaint(complaintId) is not None:
            complaintId = str(generateId())

        complaint.setId(complaintId)
        userId = complaint.getUserId()
        deptId = complaint.getDepId()
        title = complaint.getTitle()
        description = complaint.getdescription()
        status = complaint.getStatus()
        date = datetime.datetime.now()
        server =  random.randint(2, 9)
        complaint.setServer(server)
        complaint.setDateSubmited(date)

        self.__cur.execute("insert into complaint (complaintId, userId, deptId, title, description, status, date_submited, server_id) values (%s, %s, %s, %s, %s, %s, %s, %s)", (complaintId, userId, deptId, title, description, status, date, server))
        self.__db.commit()
        return complaintId

    def getComplaint(self, complaintId):
        self.__cur.execute("select * from complaint where complaintId = %s", (complaintId,))
        return self.__cur.fetchone()

    def getUser(self, userId):
        self.__cur.execute("select username, password from student where username = %s",(userId,))
        return self.__cur.fetchone()
    
    def getUserDetails(self, userId):
        self.__cur.execute("select * from student where username = %s", (userId,))
        return self.__cur.fetchone()

    def getComplaints(self, userId):
        self.__cur.execute("select * from complaint where userId = %s", (userId,))
        return self.__cur.fetchall()

    def updateComplaint(self, complaintId, description):
        self.__cur.execute("update complaint set description = %s where complaintId = %s", (description, complaintId))
        self.__db.commit()

    def updateFeedback(self, complaintId, feedback, stars):
        self.__cur.execute("update complaint set feedback = %s, stars = %s where complaintId = %s", (feedback, stars, complaintId))
        self.__db.commit() 

    def __del__(self):
        self.__cur.close()
        self.__db.close()

class departmentDao(object):
    def __init__(self):
        self.__db = getDb()
        self.__cur = self.__db.cursor()

    def register(self, dept):
        deptId = dept.get_dep_id()
        
        if self.getUser(deptId) is not None:
            return False

        password = generate_password_hash(dept.get_password(), method='sha256')
        name = dept.get_name()

        self.__cur.execute("insert into department (deptId, password, name) values (%s, %s, %s)", (deptId, password, name))
        self.__db.commit()
        return True

    def getComplaint(self, complaintId):
        self.__cur.execute("select * from complaint where complaintId = %s", (complaintId,))
        return self.__cur.fetchone()

    def getUser(self, deptId):
        self.__cur.execute("select deptId, password from department where deptId = %s",(deptId,))
        return self.__cur.fetchone()

    def getUserDetails(self, deptId):
        self.__cur.execute("select * from department where deptId = %s", (deptId,))
        return self.__cur.fetchone()

    def getComplaints(self, deptId):
        self.__cur.execute("select * from complaint where deptId = %s", (deptId,))
        return self.__cur.fetchall()

    def updateStatus(self, complaintId, status):
        try:
            self.__cur.execute("update complaint set status = %s where complaintId = %s", (status, complaintId))
            self.__db.commit()
            return True
        except:
            return False

    def __del__(self):
        self.__cur.close()
        self.__db.close()

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

    deps = ['water', 'electricity', 'carpentry', 'plumbing', 'paint', 'furniture']

    for dep in deps:
        cur.execute("insert into department (deptId, password, name) values (%s, %s, %s)", (dep, generate_password_hash(dep, method = 'sha256'), dep))
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
