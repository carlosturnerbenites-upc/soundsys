# all the imports
import os
import json
from flask import Flask, request, redirect, url_for, render_template, flash, send_from_directory,make_response,send_file
from flask import jsonify


app = Flask(__name__) # create the application instance :)
app.config.from_object(__name__) # load config from this file , flaskr.py

# Load default config and override config from an environment variable
"""app.config.update(dict(
    DATABASE=os.path.join(app.root_path, 'flaskr.db'),
    SECRET_KEY='development key',
    USERNAME='admin',
    PASSWORD='default'
))"""
app.config.from_envvar('FLASKR_SETTINGS', silent=True)

@app.route('/', methods=['GET'])
def add_entry():
	return render_template('index.html')

#from frecuencias import fs
@app.route('/wave', methods=['POST'])
def wave():
	path = "soundsys/static/temp/"
	name_file = "toharold__.txt"
	path_full = path+name_file
	data = json.loads(request.data)
	print data
	print type(data)
	time = float(0.000000000 )
	toharold = open(path_full,"w")
	for f in data:
		toharold.write(str(time))
		toharold.write(",")
		toharold.write(str(f))
		toharold.write("\n")
		time += float(9.97000000)
	toharold.close()
	
	file = open(path_full,"r")
	return send_file(file)

	# We need to modify the response, so the first thing we 
	# need to do is create a response out of the CSV string
	response = make_response(file)
	# This is the key: Set the right header for the response
	# to be downloaded, instead of just printed on the browser
	response.headers["Content-Disposition"] = "attachment; filename=data.txt"
	response.headers['Access-Control-Allow-Origin'] = '*'


	return response


	#return send_from_directory("static/temp/", filename=name_file)

if __name__ == "__main__":
	application.run(host='0.0.0.0')