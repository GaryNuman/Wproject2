import os
import requests

from flask import Flask, render_template, request
from flask_socketio import SocketIO, emit

app = Flask(__name__)
app.config["SECRET_KEY"] = os.getenv("SECRET_KEY")
socketio = SocketIO(app)

#keep track of channels
channels = []

@app.route("/")
def index():
    return render_template("index.html")

#run this function when a new channel is created
@socketio.on("create channel")
def vote(data):
    channelname = data["channel"]
    emit("channel created", {"channel": channelname}, broadcast=True)
