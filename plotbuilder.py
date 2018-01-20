import pandas as pd 
import datetime as dt
import numpy as np 

def fetch_data():
    # set the csv files
    otu_file = "DataSets/belly_button_biodiversity_otu_id.csv"
    sample_meta_file = "DataSets/Belly_Button_Biodiversity_Metadata.csv"
    samples_file = "DataSets/belly_button_biodiversity_samples.csv"
    columns_file = "DataSets/metadata_columns.csv"

    # create dataframes for each dataset
    otu_df = pd.read_csv(otu_file)
    meta_df = pd.read_csv(sample_meta_file)
    sample_df = pd.read_csv(samples_file)
    column_df = pd.read_csv(columns_file)

    # get the names into a list
    names = list(sample_df)
    sample_names = []

    for name in names:
        sample_names.append(name)
    
    sample_names.remove("otu_id")

    # app route otu
    otu_desc = {}

    for o in range(0, len(otu_df["otu_id"])):
        oid = str(otu_df["otu_id"][o])
        ltf = otu_df["lowest_taxonomic_unit_found"][o]
                
        otu_desc[oid] = ltf

    # app route meta data sample
    meta_trim = meta_df[["AGE", "BBTYPE", "ETHNICITY", "GENDER", "LOCATION", "SAMPLEID"]]

    meta = []
    i = 0

    for i in range(0, len(meta_df["AGE"])):
        age = meta_df["AGE"][i]
        bbtype = meta_df["BBTYPE"][i]
        ethnicity = meta_df["ETHNICITY"][i]
        gender = meta_df["GENDER"][i]
        location = meta_df["LOCATION"][i]
        sampleID = meta_df["SAMPLEID"][i]
        
        meta_dict = {"AGE": age, "BBTYPE": bbtype, "ETHNICITY": ethnicity, "GENDER": gender, "LOCATION": location, "SAMPLEID":str(sampleID)}
        
        meta.append(meta_dict)

    # app route w freq sample
    wash_dict = {}
    j = 0
    for j in range(0, len(meta_df["SAMPLEID"])):
        s_id = "BB_" + str(meta_df["SAMPLEID"][j])
        w_freq = meta_df["WFREQ"][j]
        
        wash_dict[s_id] = w_freq

    # app route sample sample
    sample_list = []

    for item in sample_names:
        col = sample_df.sort_values(item, ascending=False)
        o_id= col["otu_id"].tolist()
        s_val=col[item].tolist()
        
        s_dict = {"otu_ids": o_id, "sample_values": s_val}
        sample_list.append(s_dict)

    return sample_names, otu_desc, meta, wash_dict, sample_list
