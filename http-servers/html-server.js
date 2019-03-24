
const fs = require("fs");
const express = require('express');
const bodyParser = require("body-parser");
const path = require('path');
const app = express();

const MongoClient = require("mongodb").MongoClient;
const url = 'mongodb://localhost:27017';
const dbname = "myproject";
const mongoOptions = {useNewUrlParser : true};

const state = {
    db : null
};

const connect = (cb) =>{
    if(state.db)
        cb();
    else{
        MongoClient.connect(url,mongoOptions,(err,client)=>{
            if(err)
                cb(err);
            else{
                state.db = client.db(dbname);
                cb();
            }
        });
    }
}

// returns database connection 
const getDB = ()=>{
    return state.db;
}

app.use(bodyParser.json());

// serve static html file to user
app.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname,'index.html'));
});

// read
app.get('/cities',(req,res)=>{

    getDB().collection('cities').find({}).toArray((err,documents)=>{
        if(err)
            console.log(err);
        else{
          let rand = Math.floor(Math.random() * documents.length)
          res.json(documents[rand]);
        }
    });
});

connect((err)=>{

  if(err){
      console.log('unable to connect to database');
      process.exit(1);
  }
  else{
      app.listen(3000,()=>{
          console.log('connected to database, app listening on port 3000');
      });
  }
});