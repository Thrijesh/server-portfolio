const express = require('express')
const multer = require('multer')
const path = require('path')

const { createProject, editProject, getProject, deleteProject, getProjectById } = require('../controller/ProjectController')

const router = express.Router()

const storage = multer.diskStorage({
    destination: function( req, file, cb ) {
        cb(null, path.join(path.dirname(__dirname), "uploads"))
    },
    filename: function( req, file, cb ) {
        cb(null, Date.now() + "-" + file.originalname)
    }
})

const upload = multer({ storage })

router.post('/create-project', upload.single('projectImage'), createProject)
router.post('/edit-project', upload.single('projectImage'), editProject)
router.delete('/delete-project', deleteProject)
router.get('/get-projects', getProject)
router.get('/get-project-by-id/:id', getProjectById)

module.exports = router