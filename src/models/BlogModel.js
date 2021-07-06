const mongoose = require('mongoose')

const blogSchema = mongoose.Schema({
    blogName: {
        type: String,
        required: true
    },
    blogOverview: {
        type: String,
        required: true
    },
    blogImage: {
        type: String,
        required: true
    },
    blogAuthor: {
        type: String,
        required: true
    },
    blogDetails: [
        {
            blogDetailsImage: {
                type: String
            },
            blogSubHeading: {
                type: String
            },
            blogSubDetails: {
                type: String
            }
        }
    ]
}, { timestamps: true })

const blogModel = mongoose.model('Blog', blogSchema)

module.exports = blogModel