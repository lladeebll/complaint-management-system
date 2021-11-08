from flask import jsonify

class complaint(object):

    def __init__(self, id, title, discription, depId, userId):
        self.__id = id
        self.__title = title
        self.__discription = discription
        self.__status = "waiting" 
        self.__depId = depId
        self.__userId = userId
        self.__feedback = ''
        self.__stars = -1

    def getId(self):
        return self.__id

    def getTitle(self):
        return self.__title

    def getDiscription(self):
        return self.__discription

    def getStatus(self):
        return self.__status

    def getDepId(self):
        return self.__depId

    def getUserId(self):
        return self.__userId

    def getfeedback(self):
        return self.__feedback

    def getstars(self):
        return self.__stars

    def setId(self, id):
        self.__id = id

    def setTitle(self, title):
        self.__title = title

    def setDiscription(self, discription):
        self.__discription = discription

    def setStatus(self, status):
        self.__status = status

    def setDepId(self, depId):
        self.__depId = depId

    def setUserId(self, userId):
        self.__userId = userId

    def setfeedback(self, feedback):
        self.__feedback = feedback

    def setstars(self, stars):
        self.__stars = stars

    def jsonObj():
        return jsonify({
            "id": self.__id,
            "title": self.__title,
            "discription": self.__discription,
            "status": self.__status,
            "depId": self.__depId,
            "userId": self.__userId,
            "feedback": self.__feedback,
            "stars": self.__stars
        })


class student(object):

    def __init__(self, user_id, password, name, phno, mail, complaints):
        self.__user_id = user_id
        self.__password = password
        self.__name = name
        self.__phno = phno
        self.__email = mail
        self.__complaints = complaints
   

    def get_user_id(self):
        return self.__user_id

    def get_password(self):
        return self.__password

    def get_name(self):
        return self.__name

    def get_phno(self):
        return self.__phno

    def get_mail(self):
        return self.__email

    def set_user_id(self, user_id):
        self.__user_id = user_id

    def set_password(self, password):
        self.__password = password

    def set_name(self, name):
        self.__name = name

    def set_phno(self, phno):
        self.__phno = phno

    def set_mail(self, email):
        self.__email = email


    def jsonObj():
        return jsonify({
            "user_id": self.__user_id,
            "password": self.__password,
            "name": self.__name,
            "phno": self.__phno,
            "email": self.__email,
            "complaints": self.__complaints
        })

    def add_complaint(self, complaint):
        self.__complaints.append(complaint) 


class department(object):

    def __init__(self, dep_id, name, password, complaints):
        self.__dep_id = dep_id
        self.__name = name
        self.__complaints = complaints
        self.__password = password
        self.__complaintsHandled = 0
        self.__avgRating = 0

    def get_dep_id(self):
        return self.__dep_id

    def get_name(self):
        return self.__name

    def get_password(self):
        return self.__password

    def get_complaints(self):
        return self.__complaints

    def get_complaintsHandled(self):
        return self.__complaintsHandled

    def get_avgRating(self):
        return self.__avgRating

    def set_dep_id(self, dep_id):
        self.__dep_id = dep_id

    def set_name(self, name):
        self.__name = name

    def set_password(self, password):
        self.__password = password

    def set_complaints(self, complaints):
        self.__complaints = complaints

    def update_complaintsHandled(self):
        self.__complaintsHandled += 1

    def editStatus(self, id, status):
        for complaint in self.__complaints:
            if complaint.getId() == id:
                complaint.setStatus(status)
