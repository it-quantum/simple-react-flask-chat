from main import app
from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy(app)

class User(db.Model):
    login = db.Column(db.Text, primary_key=True, unique=True)
    email = db.Column(db.Text)
    pwd = db.Column(db.Text)
    
    def __repr__(self):
        return f"<user {self.login}>"
        
class Chat(db.Model):
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    user = db.Column(db.Text)
    body = db.Column(db.Text)
    
    def __repr__(self):
        return f"<chat {self.id}>"
        
class Dialogs(db.Model):
    room = db.Column(db.Text, primary_key=True, unique=True)
    first_user = db.Column(db.Text)
    second_user = db.Column(db.Text)
    
    def __repr__(self):
        return f"<dialog {self.room}>"
    
class Talks(db.Model):
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    room_id = db.Column(db.Text, db.ForeignKey('dialogs.room'))
    user = db.Column(db.Text, db.ForeignKey('user.login'))
    body = db.Column(db.Text)
    
    def __repr__(self):
        return f"<talk {self.id}>"
    
    