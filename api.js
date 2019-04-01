// menerima req, memberikan res
// SETTING FOR API (Express)
const express = require('express') // return sebuah function
const app = express()
const port = 2019
app.use(express.json())

// SETTING FOR MONGODB
const mongodb = require('mongodb')
const MongoClient = mongodb.MongoClient
const ObjectID = mongodb.ObjectID

const URL = 'mongodb://127.0.0.1:27017' // mongodb will run
const databaseName = 'API-MongoDB' // database name 


MongoClient.connect(URL, {useNewUrlParser: true}, (err, client) => {
    if(err){
        return console.log("Gagal bikin koneksi ke MongoDB, entah kenapa")
    }
    console.log('We did it')
    const db = client.db(databaseName)


    app.get('/initdata', (req, res) => { // route
        db.collection('users').insertMany([ // insertMany([list of data])
            { name: 'Alfred', age: 18 },
            { name: 'Jhonny', age: 28 },
            { name: 'Deep', age: 38 },
            { name: 'Bean', age: 19 },
            { name: 'Dora', age: 22 },
            { name: 'Marvel', age: 32 },
            { name: 'Benjamin', age: 32 },
        ]).then(resp => {
            res.send({
                executedStatus: resp.result.ok,
                insertedCount: resp.insertedCount,
                insertedIds: resp.insertedIds,
                docs: resp.ops
            })
            
        }).catch(err => {
            res.send({
                err: "Unable to do operation: insertMany"
            })
        })

        db.collection('products').insertMany([
            {name:'T-Shirt O Neck', desc: "Best T-Shirt in Town", price: 12000},
            {name:'T-Shirt V Neck', desc: "Best T-Shirt in City", price: 12000},
            {name:'Tyloo Shoes', desc: "Best Shoes in Town", price: 12000},
            {name:'Tyloo Original Hoodie', desc: "Best Hoodie in Town", price: 12000},
            {name:'Terserra Pants', desc: "Best Pants in City", price: 12000},
            {name:'X22 Wireless Card', desc: "Best Card in Town", price: 12000},
            {name:'RC Car', desc: "Best Car in City", price: 12000},
        ])
    })

    app.get('/users', (req, res) => {
        db.collection('users').find({}).toArray() // Select All
            .then(doc => { // not found, []
                if (doc.length === 0) {
                    return res.send({
                        err: `Data not found`
                    })
                }
                res.send(doc)
            }).catch(err => {
                res.send({
                    err
                })
            })
    })

    app.get('/usersparams', (req, res)=> {
        var {age, name} = req.query
        age = parseInt(age) // string to integer

        if (!age || !name) { // if age or id or both undefined
            return res.send({
                err: "Please, provide name and age params"
            })
        }

        db.collection('users').find({name: name, age: age }).toArray()
            .then(doc => { // not found, [] || found : array of object
                if(doc.length === 0){ 
                    return res.send({
                        err: `Data not found age: ${age} & name: ${name}`
                    })
                }
                
                res.send(doc) // send the data
            }).catch(err => {
                res.send({
                    err
                })
            })
        
    })

    app.get('/getuserwithid', (req, res) => {
        var {id, name, age} = req.query
        age = parseInt(age)
        if(!id ||!name || !age){ // without name params, undefined
            return res.send({
                err: "Please provide \'id\', \'name\', \'age\' params for searching"
            })
        }

        db.collection('users').findOne({_id: new ObjectID(id), name: name, age: age })
            .then(doc => { // not found, null || found: one object                
                if (doc) {  // found the user
                    return res.send({
                        err: "",
                        keyword: name,
                        doc: doc
                    })
                }

                res.send({
                    err: `Can not find the user with keyword: name: ${name} & age: ${age}`
                })

            }).catch(err => {
                res.send({
                    err: "Unable to do findOne operation"
                })
            })
        
    })

    app.post('/postoneuser', (req, res) => {
        var {name, age} = req.body   
        age = parseInt(age)

        if (!name || !age) { // if age or id or both undefined
            return res.send({
                err: "Please, provide name and age params"
            })
        }
        
        db.collection('users').insertOne({name, age})
            .then(resp => {
                res.send({
                    err: "",
                    executedStatus: resp.result.ok, // 1 : correctly
                    insertedCount: resp.insertedCount,
                    insertedId: resp.insertedId,
                    user: resp.ops[0]
                })
            }).catch(err => {
                res.send({
                    err
                })
            })
    })

    app.delete('/user/:umur', (req, res) => {
        const age = parseInt(req.params.umur)

        if(!age){
            return res.send({
                err: "Please, provide params: age"
            })
        }
        
        db.collection('users').deleteOne({age: age}).then((resp) => {
            
            res.send({
                message: "Success delete",
                executedStatus: resp.result.ok,
                count: resp.deletedCount
            })
        }).catch(err => {
            res.send({
                err: "Unable to do operation: deleteOne, collection: users"
            })
        })

    })

    app.put('/users/:nama', (req, res) =>{    
        const {nama} = req.params
        const newName = req.body.name
        

        db.collection('users').updateOne({
            name: nama
        },{
            $set: {
                name: newName
            }
        }).then(resp => {
            res.send({
                executedStatus: resp.result.ok,
                scanned: resp.matchedCount,
                modified: resp.modifiedCount

            })
        }).catch(err => {
            res.send({
                err: "Unable to do operation: updateOne"
            })
        })
    })

})

// GET, POST, DELETE, PUT
// app.get('/users', (req, res) => { // end point
//     // req :  akan berisi parameter/ data yg dikirim bersamaan proses request
//     // res: object berisi method untuk memberikan respon ke client
//     res.send({
//         message: "hallo",
//         number: 23
//     })
// })

// app.get('/users/:age', (req, res) => {
//     console.log("Umur yang masuk",req.params.age)
// })

// app.get('/getuser', (req, res) => {
//     console.log(req.query)
// })

// app.post('/users', (req, res) => {
//     console.log(req.body)
// })

app.listen(port, () => { // running API here
    console.log("API berhasil berjalan di port", port)
})