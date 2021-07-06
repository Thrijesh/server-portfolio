const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')
const mongoose = require('mongoose')
const path = require('path')

const BlogRoute = require('./src/route/BlogRoute')
const ProjectRoute = require('./src/route/ProjectRoute')

const app = express()

let port = process.env.PORT || 5000

dotenv.config()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

mongoose.connect(process.env.DB_URI, { useNewUrlParser: true, useUnifiedTopology: true})
.then(() => app.listen(port, () => console.log(`Connection is made on Port ${port}`)))
.catch((err) => console.log(err.message))

mongoose.set("useFindAndModify", false)

//Routes 

app.use('/public', express.static(path.join(__dirname, "src/uploads")))
app.use('/api', BlogRoute)
app.use('/api', ProjectRoute)



