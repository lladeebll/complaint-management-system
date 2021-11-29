from flask import jsonify

class complaint(object):

    def __init__(self, id, title, description, status, date_submited, feedback, stars, depId, userId, server):
        self.__id = id
        self.__title = title
        self.__description = description
        self.__status = status 
        self.__depId = depId
        self.__userId = userId
        self.__feedback = feedback 
        self.__stars = stars 
        self.__date_submited = date_submited
        self.__server = server

    def getId(self):
        return self.__id

    def getTitle(self):
        return self.__title

    def getdescription(self):
        return self.__description

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

    def getDateSubmited(self):
        return self.__date_submited

    def getServer(self):
        return self.__server

    def setId(self, id):
        self.__id = id

    def setTitle(self, title):
        self.__title = title

    def setdescription(self, description):
        self.__description = description

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

    def setDateSubmited(self, date_submited):
        self.__date_submited = date_submited

    def setServer(self, server):
        self.__server = server

    def stringObj(self):
        return {
            "complaint ID: " : str(self.__id),
            "title: " : str(self.__title)
        } 

    def jsonObj(self):
        return jsonify({
            "id": self.__id,
            "title": self.__title,
            "description": self.__description,
            "status": self.__status,
            "depId": self.__depId,
            "userId": self.__userId,
            "feedback": self.__feedback,
            "stars": self.__stars
        })

class student(object):

    def __init__(self, user_id, name, mail, password, phno, server, complaints):
        self.__user_id = user_id
        self.__password = password
        self.__name = name
        self.__phno = phno
        self.__email = mail
        self.__server = server
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

    def get_server(self):
        return self.__server

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
    
    def set_server(self, server):
        self.__server = server

    def get_complaints(self):
        return self.__complaints

    def editComplaint(self, complaint_id, description):
        for complaint in self.__complaints:
            if complaint.getId() == complaint_id:
                complaint.setdescription(description)
                return True
        return False

    def deleteComplaint(self, complaint_id):
        for complaint in self.__complaints:
            if complaint.getId() == complaint_id:
                self.__complaints.remove(complaint)
                id = complaint.getDepId()
                del complaint
                return id 
        return None 
    
    def giveFeedback(self, complaint_id, feedback, stars):
        for complaint in self.__complaints:
            if complaint.getId() == complaint_id:
                complaint.setfeedback(feedback)
                complaint.setstars(stars)
                return True
        return False

    def addComplaint(self, complaint):
        self.__complaints.append(complaint) 

    def jsonObj(self):
        return jsonify({
            "user_id": self.__user_id,
            "name": self.__name,
            "phno": self.__phno,
            "email": self.__email,
            "server" : self.__server,
            "complaints": [x.stringObj() for x in self.__complaints]
        })

    def __del__(self):
        for complaint in self.__complaints:
            del complaint



class department(object):

    def __init__(self, dep_id, name, rating, password, complaintsHandled, complaints):
        self.__dep_id = dep_id
        self.__name = name
        self.__complaints = complaints
        self.__password = password
        self.__complaintsHandled = complaintsHandled 
        self.__avgRating = rating 

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

    def get_server(self):
        return 1

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
                return True
        return False

    def update_avgRating(self, stars):
        self.__avgRating = (self.__avgRating * self.__complaintsHandled + stars) / (self.__complaintsHandled + 1)

    def complaints_in_waitingList(self):
        count = 0
        for complaint in self.__complaints:
            if complaint.getStatus() == "waiting":
                count += 1
        return count

    def jsonObj(self):
        return jsonify({
            "dep_id": self.__dep_id,
            "name": self.__name,
            "complaints": [x.stringObj() for x in self.__complaints],
            "complaintsHandled": self.__complaintsHandled,
            "avgRating": self.__avgRating,
            "complaints_in_waitingList": self.complaints_in_waitingList(),
            "server" : 1
        })

    def __del__(self):
        for complaint in self.__complaints:
            del complaint