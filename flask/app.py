import flask
from flask import Flask, request
from flask_pymongo import PyMongo
from flask_restful import Api, Resource
from flask_cors import CORS
import extractor

app = flask.Flask(__name__)
api = Api(app)

cors = CORS()
cors.init_app(app)

@app.route('/endpoint', methods=['POST', 'GET'])
def get_names():
    if request.method == 'POST':
        names = request.get_json()

    if request.method == 'GET':
        names = request.get_json()
    return {"data": names}

@app.route("/")
def hello():
    return "Hello, World!"

app.config["MONGO_URI"] = "mongodb://localhost:27017/todo_db"
mongodb_client = PyMongo(app)
db = mongodb_client.db

class test(Resource):
    def post(self):
        payload = request.get_json(force=True)
        text = payload.get("text", None)
        
        if type(text) == str:
            # THIS IS RECEIVING TEXT PROPERLY
            id = int(text)
            keywords = db.todos.find_one({"_id": id})["body"]

            print(type(text))
            return {"keywords": keywords}

        elif type(text) == list:
            # THIS IS RECEIVING TEXT PROPERLY
            id = int(text[0])
            update_body = text[1]
            db.todos.update_one({'_id': id}, {"$set": {'links': update_body}})

            return {'links': text[1]}

api.add_resource(test, "/test")

if __name__ == "__main__":
    app.run(debug=True)


