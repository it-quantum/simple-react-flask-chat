from flask import Flask, request, jsonify, json, Response
from flask_socketio import SocketIO, emit, join_room, leave_room
import hashlib, urllib.parse
from sqlalchemy import or_

app = Flask(__name__)
from DataBase import *

app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///chat.db"

socketio = SocketIO(app, cors_allowed_origins="http://localhost:3000")

@app.route('/')
def index():
    return "<h1>Server API</h1>"

@app.route('/register', methods=['OPTIONS', 'POST'])
def register():
    validate = {
        "login":"",
        "isLogin":False,
        "isEmail":False,
        "isPass":False,
        "isPasstwo":False
    }
    if request.method == "OPTIONS":
        response = Response()
        response.headers["Access-Control-Allow-Origin"] = request.headers["Origin"]
        response.headers["Access-Control-Allow-Methods"] = "POST"
        response.headers["Access-Control-Allow-Headers"] = "Content-Type"
        return response, 200
    if request.method == "POST":
        reg_data = request.get_json()
        login = reg_data["login"]
        email = reg_data["email"]
        pwd = reg_data["pass"]
        pwdtwo = reg_data["passtwo"]
        isLogin = User.query.filter_by(login=login).all()
        if not len(isLogin) and login.isidentifier():
            if pwd == "" or pwdtwo == "" or pwd != pwdtwo:
                validate["isPass"] = True
                validate["isPasstwo"] = True
            elif email == "":
                validate["isEmail"] = True
            else:
                validate["login"] = login
                pwd = hashlib.sha256(pwd.encode()).hexdigest()
                user = User(login=login, email=email, pwd=pwd)
                db.session.add(user)
                db.session.commit()
        else:
            validate["isLogin"] = True
        response = jsonify(validate)
        response.headers.add("Access-Control-Allow-Origin", request.headers["Origin"])
        return response
    
@app.route('/auth', methods=['OPTIONS', 'POST'])
def auth():
    validate = {
        "login":"",
        "isLogin":False,
        "isPass":False,
        "isPasstwo":False
    }
    if request.method == "OPTIONS":
        response = Response()
        response.headers["Access-Control-Allow-Origin"] = request.headers["Origin"]
        response.headers["Access-Control-Allow-Methods"] = "POST"
        response.headers["Access-Control-Allow-Headers"] = "Content-Type"
        return response, 200
    if request.method == "POST":
        reg_data = request.get_json()
        login = reg_data["login"]
        pwd = reg_data["pass"]
        pwdtwo = reg_data["passtwo"]
        isLogin = User.query.filter_by(login=login).all()
        if len(isLogin):
            user_pwd = isLogin[0].pwd
            new_pwd = hashlib.sha256(pwd.encode()).hexdigest()
            if pwd != pwdtwo:
                validate["isPass"] = True
                validate["isPasstwo"] = True
            elif new_pwd != user_pwd:
                validate["isPass"] = True
            else:
                validate["login"] = login
        else:
            validate["isLogin"] = True
        response = jsonify(validate)
        response.headers.add("Access-Control-Allow-Origin", request.headers["Origin"])
        return response
        
@app.route('/chat', methods=['OPTIONS', 'GET'])
def get_chat():
    if request.method == "OPTIONS":
        response = Response()
        response.headers["Access-Control-Allow-Origin"] = request.headers["Origin"]
        response.headers["Access-Control-Allow-Methods"] = "GET"
        response.headers["Access-Control-Allow-Headers"] = "Content-Type"
        return response, 200
    if request.method == "GET":
        items = Chat.query.all()
        data = json.dumps([{'user':i.user, 'body':i.body} for i in items])
        response = Response()
        response.headers["Access-Control-Allow-Origin"] = request.headers["Origin"]
        response.mimetype = "application/json"
        response.set_data(data)
        return response
    
@socketio.on('post data', namespace='/chat')
def post_chat(data):
    user = data["user"]
    info = data["info"]
    item = Chat(user=user, body=info)
    db.session.add(item)
    db.session.commit()
    emit('post response', {"user":user, "body":info}, broadcast=True)
        
@app.route('/dialogs', methods=['OPTIONS', 'GET'])
def dialog():
    if request.method == "OPTIONS":
        response = Response()
        response.headers["Access-Control-Allow-Origin"] = request.headers["Origin"]
        response.headers["Access-Control-Allow-Methods"] = "GET"
        response.headers["Access-Control-Allow-Headers"] = "Content-Type"
        return response, 200
    if request.method == "GET":
        user = request.args.get("user")
        items = Dialogs.query.filter(or_(Dialogs.first_user == user, Dialogs.second_user == user)).all()
        dialogs = json.dumps([{'room':i.room} for i in items])
        response = Response()
        response.headers["Access-Control-Allow-Origin"] = request.headers["Origin"]
        response.mimetype = "application/json"
        response.set_data(dialogs)
        return response
     
@socketio.on('post data', namespace='/dialogs')
def post_dialog(data):
    room = data["room"]
    first_user = data["first_user"]
    second_user = data["second_user"]
    item = Dialogs(room=room, first_user=first_user, second_user=second_user)
    db.session.add(item)
    db.session.commit()
    emit("post response", {"room":room})
        
@app.route('/talks', methods=['OPTIONS', 'GET'])
def talk():
    if request.method == "OPTIONS":
        response = Response()
        response.headers["Access-Control-Allow-Origin"] = request.headers["Origin"]
        response.headers["Access-Control-Allow-Methods"] = "GET"
        response.headers["Access-Control-Allow-Headers"] = "Content-Type"
        return response, 200
    if request.method == "GET":
        room = urllib.parse.unquote(request.args.get("room"))
        items = Talks.query.filter_by(room_id = room).all()
        data = json.dumps([{'room':i.room_id, 'user':i.user, 'body':i.body} for i in items])
        response = Response()
        response.headers["Access-Control-Allow-Origin"] = request.headers["Origin"]
        response.mimetype = "application/json"
        response.set_data(data)
        return response
        
@socketio.on('join', namespace='/talks')
def leave_talk(data):
    room = urllib.parse.unquote(data["room"])
    join_room(room)
        
@socketio.on('post data', namespace='/talks')
def post_talk(data):
    room = data["room"]
    user = data["user"]
    info = data["info"]
    item = Talks(room_id=room, user=user, body=info)
    db.session.add(item)
    db.session.commit()
    emit("post response", {"user":user, "body":info}, room=room)
    
@socketio.on('leave', namespace='/talks')
def leave_talk(data):
    room =  urllib.parse.unquote(data["room"])
    leave_room(room)

if __name__ == "__main__":
    socketio.run(app)