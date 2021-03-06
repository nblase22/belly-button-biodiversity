function getNames() {
    Plotly.d3.json("/names", function(errr, data){
        for (i=0; i < data.length; i++){
            var opt = data[i]
            select = document.getElementById("selDataset");
            var opt_create = document.createElement("option");
            opt_create.textContent = opt;
            opt_create.value = opt;
            select.appendChild(opt_create);
    }
})}
getNames();
Plotly.d3.json("/samples/BB_940", function(err, data1){
    console.log(err);
    console.log(data1);
    var sampleID = "BB_940";
    console.log(sampleID);
    getDescInit(sampleID, data1)             
})

function getDescInit(sid, data_samp){
    Plotly.d3.json("/otu", function(err,data){
        pieInit(sid, data_samp, data);
        bubbleInit(sid, data_samp, data);
    });
};

function pieInit(sid, data, otu_list){
    var samp = data["sample_values"].slice(0,10);
    var oid = data["otu_ids"].slice(0,10);
    console.log(oid)

    var otu_desc = [];
    var otu_keys = Object.keys(otu_list);
    for (p=0; p < oid.length; p++){
        for(q=0; q < otu_keys.length; q++){
            if (otu_keys[q].toString() === oid[p].toString()){
                otu_desc.push(otu_list[q.toString()])
            }
        }
    }

    var piedata = [{
        values: samp,
        labels: oid,
        type:"pie",
        hovertext: otu_desc
    }];

    var layout = {
        height: 400,
        width: 500
    };

    Plotly.newPlot('piechart', piedata, layout);   
};

function bubbleInit(sid, data, otu_list){
    var samp_val = data["sample_values"];
    var oid_val = data["otu_ids"];

    var otu_desc = [];
    var otu_keys = Object.keys(otu_list);
    for (p=0; p < oid_val.length; p++){
        for(q=0; q < otu_keys.length; q++){
            if (otu_keys[q].toString() === oid_val[p].toString()){
                otu_desc.push(otu_list[q.toString()])
            }
        }
    }

    var bubbledata=[{
        x: oid_val,
        y: samp_val,
        mode: "markers",
        marker: {
            size: samp_val,
            color: oid_val
        },
        text: otu_desc
    }];

    var layout2 = {
        title: 'Marker Size',
        showlegend: false,
    };

    Plotly.newPlot("bubble", bubbledata, layout2)
}


function optionChanged(sid){
    Plotly.d3.json("/samples/" + sid, function(err, data){
        console.log(data)
        getDesc(sid, data)             
    })
};

function getDesc(sid, data_samp){
    Plotly.d3.json("/otu", function(err,data){
        pie(sid, data_samp, data);
        bubble(sid, data_samp, data);
    });
};


function pie(sid, data, otu_list){
    var samp = data["sample_values"].slice(0,10);
    var oid = data["otu_ids"].slice(0,10);
    console.log(oid)

    var otu_desc = [];
    var otu_keys = Object.keys(otu_list);
    for (p=0; p < oid.length; p++){
        for(q=0; q < otu_keys.length; q++){
            if (otu_keys[q].toString() === oid[p].toString()){
                otu_desc.push(otu_list[q.toString()])
            }
        }
    }

    var newvals = samp;
    var newlabels = oid;
    var newHover = otu_desc;

    Plotly.restyle('piechart', "values", [newvals]); 
    Plotly.restyle('piechart', "labels", [newlabels]);
    Plotly.restyle('piechart', "hovertext", [newHover]);      
};

function bubble(sid, data, otu_list){
    var samp_val = data["sample_values"];
    var oid_val = data["otu_ids"];

    var otu_desc = [];
    var otu_keys = Object.keys(otu_list);
    for (p=0; p < oid_val.length; p++){
        for(q=0; q < otu_keys.length; q++){
            if (otu_keys[q].toString() === oid_val[p].toString()){
                otu_desc.push(otu_list[q.toString()])
            }
        }
    }

    var newOids = oid_val;
    var newSamps = samp_val;
    var newDesc = otu_desc;

    Plotly.restyle("bubble", "x", [newOids]);
    Plotly.restyle("bubble", "y", [newSamps]);
    Plotly.restyle("bubble", "marker.color", [newOids]);
    Plotly.restyle("bubble", "size", [newSamps]);
    Plotly.restyle("bubble", "text", [newDesc]);

};

function guage(){

};
