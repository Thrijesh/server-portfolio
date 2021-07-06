const mongoose = require('mongoose')

const projectSchema = mongoose.Schema({
    projectName: {
        type: String,
        required: true
    },
    projectOverView: {
        type: String,
        required: true
    },
    projectDetails: {
        type: String,
        required: true
    },
    projectLanguages: {
        type: String,
        required: true
    },
    projectImage: {
        type: String,
        required: true
    },
    projectLink: {
        type: String,
        required: true
    }
}, { timestamps: true })

const projectModel = mongoose.model('Project', projectSchema)

module.exports = projectModel