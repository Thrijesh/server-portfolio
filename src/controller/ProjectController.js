const Project = require('../models/ProjectModel')

exports.createProject = ( req, res ) => {
    const { projectName, projectOverView, projectDetails, projectLanguages, projectLink } = req.body
    const projectImage = req.file

    let photo = projectImage.filename

    const new_project = new Project({
        projectName, projectOverView, projectDetails, projectLanguages, projectImage: photo, projectLink
    })

    new_project.save((error, project) => {
        if(error) res.status(400).json({ error })
        if(project) res.status(400).json({ project })
    })
}

exports.editProject = ( req, res ) => {
    const { _id, projectName, projectOverView, projectDetails, projectLanguages, projectLink } = req.body
    const projectImage = req.file

    let photo = projectImage.filename

    Project.findOne({ "_id": _id })
    .exec((error, project) => {
        if(error) res.status(400).json({ error })
        if(project) {
            Project.findOneAndUpdate({ "_id": project._id }, {
                "$set": {
                    projectName,
                    projectOverView,
                    projectDetails,
                    projectLanguages,
                    projectImage: photo,
                    projectLink
                }
            }, { new: true })
            .exec((error, project) => {
                if(error) res.status(400).json({ error })
                if(project) res.status(201).json({ project })
            })
        }
    })
}



exports.getProject = ( req, res ) => {
    Project.find()
    .exec((error, projects) => {
        if(error) res.status(400).json({ error })
        if(projects) res.status(201).json({ projects })
    })
}

exports.deleteProject = ( req, res ) => {
    Project.findOne({ "_id": req.body._id })
    .exec((error, projects) => {
        if(error) res.status(400).json({ error })
        if(projects) {
            Project.findOneAndDelete({ "_id": projects._id })
            .exec((error, done) => {
                if(error) res.status(400).json({ error })
                if (done) res.status(201).json({ done })
            })
        }
    })
}

exports.getProjectById = (req, res) => {
    Project.findOne({ "_id": req.params.id })
    .exec((error, project) => {
        if(error) res.status(400).json({ error })
        if(project) res.status(201).json({ project })
    }) 
}