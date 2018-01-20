from plotbuilder import fetch_data

import pandas as pd

from flask import Flask, jsonify, render_template
app = Flask(__name__)

sample_names, otu_desc, meta, wash_dict, sample_list = fetch_data()

# main index function
@app.route("/")
def index():
    return render_template("index.html")

# return sample names list
@app.route('/names')
def name_func():
    return jsonify(sample_names)

# return otu descriptions list
@app.route('/otu')
def otu_func():
    return jsonify(otu_desc)

# return the sample metadata   
@app.route('/metadata/<sample>')
def meta_func(sample):
    i = 0
    for name in sample_names:
        if name == str(sample):
            sample_meta = meta[i]
            break
        else:
            i+= 1
    return jsonify(sample_meta)

# return the wash frequency for a given sample
@app.route('/wfreq/<sample>')
def wfreq_func(sample):
    freq = wash_dict[sample]
    return jsonify(freq)

# get the otu_ids and sample values
@app.route('/samples/<sample>')
def sample_val(sample):
    j = 0
    for name in sample_names:
        if name == str(sample):
            sample_dict = sample_list[j]
            print(sample_dict)
            break
        else:
            j+=1
    return jsonify(sample_dict)

if __name__ == "__main__":
    app.run(debug=True)