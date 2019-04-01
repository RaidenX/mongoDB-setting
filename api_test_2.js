// FOR API
const express = require('express')
const app = express()
const port = 2020

// FOR BODY
const bodyParser = require('body-parser') // agar kita bisa membaca object saat axios.post
app.use(bodyParser.json())

// FOR MONGOFB
const mongodb = require('mongodb')
const MongoClient = mongodb.MongoClient

const URL = 'mongodb://127.0.0.1:27017'
const database = 'mongGo'

MongoClient.connect(URL, {useNewUrlParser: true}, (err, client) => {
    if(err){
        return console.log('Unable to connect to database')
    }

    const db = client.db(database)
    
    // DO SOMETHING HERE

    app.get('/users', (req, res) => { // req : inputan dari user, res: cara kita merespon
        db.collection('users').find({}).toArray((err, users) => {
            res.send(users)
        })

    })

    app.post('/register', (req,res) => {
        const {nama, umur} = req.body
        
        db.collection('users').insertOne({name: nama, age: umur}).then(() => {
            res.send({
                message: 'Insert data success',
                dataYgMasuk: {
                    name: nama,
                    age: umur
                }
            })
        })
    })


    // CRUD Create Read Update Destroy
    // db.collection('users').insertMany([
    //     {name: 'Alvin', age: 22},
    //     {name: 'Alvina', age: 19},
    //     {name: 'Alfred', age: 22},
    //     {name: 'Aline', age: 23},
    //     {name: 'Alex', age: 25}
    // ])

    // db.collection('users').findOne({name: 'Marvel'})
    // .then(res => {
    //     if(res){
    //         console.log('Data berhasil di temukan')
    //     } else {
    //         console.log('Data tidak ditemukan');   
    //     }
    // })




})

app.listen(port, () => {
    console.log('API berjalan pada ' + port);
})