//import express from 'express'

// import depedencies 
const express = require('express');
const bodyParser = require('body-parser')
const mysql = require('mysql')
const multer = require('multer')
const paginate = require('express-paginate')

// use depedencies
const app = express()
// use middleware for incoming request
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true}))//parsing x-www-formencode

//create db connection
const conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'hiring_channel'
})

//connect to db
conn.connect(err => {
    if(err) {
        console.log(`Error \n ${err} \n`)
    } else {
        console.log('Succes to connect to database')
    }

})
    
// set route
app.get('/', function(req,res){

    // code to run when user access '/'
    // res.send('Haloooo Selamat Datang')
    res.json({
        status: 200,
        error: false,
        // response / data
        response: 'Halo Selamat Datang!',

    })
})

// method post
app.post('/', (req, res) => {
    res.status(201).json({
        status: 201,
        error: false,
        response: 'Berhasil mengirim ke server'
    })
})

// method GET with access to Query Param
app.post('/api/v1/engineer',(req, res) => {
    const {name , description, skill, location, date_of_birth, showcase} = req.body
    const date_created = new Date()
    const data = {name , description, skill, location, date_of_birth, showcase, date_created}

    //query to create new user
    //with prepared statement "SET ?"
    conn.query('INSERT INTO engineer SET ?', data, (err, result) => {
        if(err){
            res.status(400).json({
                status: 400,
                error: true,
                message: err
            })
        } else {
            res.status(201).json({
                status: 201,
                error: false,
                data,
                message: 'Success add new engineer'
            })
        }
    })
    
})

app.get('/api/v1/engineer',(req,res) => {
    const search = req.query.search

    conn.query('SELECT * FROM engineer ORDER BY name, skill, date_updated', (err, result) => {
        if(err){
            res.status(400).json({
                status: 400,
                error: true,
                message: err
            })
        } else {
            res.status(201).json({
                status: 201,
                error: false,
                data: result,
                message: 'Success select all engineer'
            })
        }
    })
    
})

// method POST for creating new user

// method PUT with access to Request Body and Parameter 
app.put('/api/v1/engineer/:engID',(req, res) => {
    const engID = req.params.engID // get url param
    const date_updated = new Date()
    const { name , description, skill, location, date_of_birth, showcase } = req.body

    //check whether the params is a number or not.
    // if (kondisi) { jalankan fungsi jika benar}
    if(isNaN(engID)){
        res.status(400).json({
            status: 400,
            error: true,
            message: 'Parameter must be a number!'
        })
    } else {
        conn.query("UPDATE engineer SET name='"+req.body.name+"', description='"+req.body.description+"', skill='"+req.body.skill+"', location='"+req.body.location+"', date_of_birth='"+req.body.date_of_birth+"', showcase='"+req.body.showcase+"', date_updated='"+date_updated+"' WHERE id="+req.params.engID, (err, result) => {
            if(err){
                res.status(400).json({
                    status: 400,
                    error: true,
                    message: err
                })
            } else {
                res.status(201).json({
                    status: 201,
                    error: false,
                    data: {
                        id: engID,
                        name,
                        description,
                        skill,
                        location,
                        date_of_birth,
                        showcase,
                        dateupdate
                    },
                    message: 'Success update engineer'
                })
            }
        })
    }
})

app.post('/api/v1/engineer/:engName',(req, res) => {
    const engName = req.params.engName // get url param

    //check whether the params is a number or not.
    // if (kondisi) { jalankan fungsi jika benar}
    if(!isNaN(engName)){
        res.status(400).json({
            status: 400,
            error: true,
            message: 'Parameter must be a name!'
        })
    } else {
        conn.query("SELECT * FROM engineer WHERE name='"+req.params.engName+"' OR skill LIKE '%"+req.params.engName+"%'" , (err, result) => {
            if(err){
                res.status(400).json({
                    status: 400,
                    error: true,
                    message: err
                })
            } else {
                res.status(201).json({
                    status: 201,
                    error: false,
                    data: result,
                    message: 'Success search engineer'
                })
            }
        })
    }
})

app.post('/api/v1/engineer/del/:engID',(req, res) => {
    const engID = req.params.engID 

    //check whether the params is a number or not.
    // if (kondisi) { jalankan fungsi jika benar}
    if(isNaN(engID)){
        res.status(400).json({
            status: 400,
            error: true,
            message: 'Parameter must be a number!'
        })
    } else {
        conn.query("DELETE FROM engineer WHERE id="+req.params.engID, (err, result) => {
            if(err){
                res.status(400).json({
                    status: 400,
                    error: true,
                    message: err
                })
            } else {
                res.status(201).json({
                    status: 201,
                    error: false,
                    message: 'Success delete engineer where id = '+req.params.engID
                })
            }
        })
    }
})

app.post('/api/v1/company',(req, res) => {
    const {name , logo, location, description} = req.body
    const data = {name , logo, location, description}

    //query to create new user
    //with prepared statement "SET ?"
    conn.query('INSERT INTO company SET ?', data, (err, result) => {
        if(err){
            res.status(400).json({
                status: 400,
                error: true,
                message: err
            })
        } else {
            res.status(201).json({
                status: 201,
                error: false,
                data,
                message: 'Success add new company'
            })
        }
    })
    
})

app.get('/api/v1/company',(req,res) => {
    const search = req.query.search

    conn.query('SELECT * FROM company', (err, result) => {
        if(err){
            res.status(400).json({
                status: 400,
                error: true,
                message: err
            })
        } else {
            res.status(201).json({
                status: 201,
                error: false,
                data: result,
                message: 'Success select all company'
            })
        }
    })
    
})

app.put('/api/v1/company/:compID',(req, res) => {
    const compID = req.params.compID // get url param
    const { name , logo, location, description } = req.body

    //check whether the params is a number or not.
    // if (kondisi) { jalankan fungsi jika benar}
    if(isNaN(compID)){
        res.status(400).json({
            status: 400,
            error: true,
            message: 'Parameter must be a number!'
        })
    } else {
        conn.query("UPDATE company SET name='"+req.body.name+"', logo='"+req.body.logo+"', location='"+req.body.location+"', description='"+req.body.description+"' WHERE id="+req.params.compID, (err, result) => {
            if(err){
                res.status(400).json({
                    status: 400,
                    error: true,
                    message: err
                })
            } else {
                res.status(201).json({
                    status: 201,
                    error: false,
                    data: {
                        id: compID,
                        name,
                        logo,
                        location,
                        description
                    },
                    message: 'Success update company'
                })
            }
        })
    }
})

app.post('/api/v1/company/:compID',(req, res) => {
    const compID = req.params.compID 

    //check whether the params is a number or not.
    // if (kondisi) { jalankan fungsi jika benar}
    if(isNaN(compID)){
        res.status(400).json({
            status: 400,
            error: true,
            message: 'Parameter must be a number!'
        })
    } else {
        conn.query("DELETE FROM engineer WHERE id="+req.params.compID, (err, result) => {
            if(err){
                res.status(400).json({
                    status: 400,
                    error: true,
                    message: err
                })
            } else {
                res.status(201).json({
                    status: 201,
                    error: false,
                    message: 'Success delete engineer where id = '+req.params.compID
                })
            }
        })
    }
})

// listen to connection with callback function
app.listen(3000, function(){
    console.log('Server is running on port 3000!')
})


