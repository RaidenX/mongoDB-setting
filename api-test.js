// for API
const express = require('express')
const app = express()
const port = 2020

// CREATE ROUTE
app.get('/', (req, res)=>{
    res.send('<h1>Welcome to the Jungle</h1>')
})

//FOR MONGODB
const mongodb = require('mongodb')
const MongoClient = mongodb.MongoClient

const URL = 'mongodb://127.0.0.1:27017'
const database = 'mongGo'

MongoClient.connect(URL, {useNewUrlParser: true}, (err, client)=> {
    // DO SOMETHING HERE
    if(err){
        return console.log(err);
    
    }

    console.log('Ashiiaaaapp!!!')

    //CRUD create Read Update Destroy
    const db = client.db(database)
    db.collection('Users').insertMany([
        {name: 'Andy', age: 22},
        {name: 'Edwin', age: 23},
        {name: 'Tommy', age: 24},
        {name: 'Ridhan', age: 25},
        {name: 'Uya', age: 26}
    ])

    // READ DATA
    // db.collection('Users').findOne({name: 'Yoga'},(err, user) => {
    //     //console.log(user);
    //     if(err){
    //        return console.log('Data tidak ditemukan');
    //     }
    //     console.log(user);
        
    // })

    db.collection('Users').findOne({name: 'Edwin'})
    .then(res => {
        if(res){
            console.log('Data berhasil ditemukan');
            
        } else {
            console.log('Data tidak ditemukan');
            
        }
        
    }).catch( err => {
        console.log('Error System');
        
    })

})



app.get('/product', (req, res)=> {
    res.send([
        {nama: 'Rachmawan', age: 21},
        {nama: 'Edwin', age: 22},
        {nama: 'Ridhan', age: 23},
        {nama: 'Andy', age: 24},
        {nama: 'Uya', age: 25}
    ])
})

app.listen(port, ()=>{ 
    console.log('API berhasil dihidupkan di port '+ port);
})