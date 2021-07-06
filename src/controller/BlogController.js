const { findOneAndDelete } = require('../models/BlogModel')
const Blog = require('../models/BlogModel')

exports.createPost = (req, res) => {
    const { blogName, blogDetails, blogOverview, blogSubDetails, blogSubHeading, blogAuthor } = req.body
    const { blogImage, blogDetailsImage } = req.files

    let photo1 = blogImage[0].filename
    let p2 = blogDetailsImage[0].filename

    console.log(photo1, p2)

    const new_post = new Blog({
        blogName,
        blogImage: photo1,
        blogOverview,
        blogAuthor,
        blogDetails: {
            blogDetailsImage: p2,
            blogSubHeading: blogSubHeading,
            blogSubDetails: blogSubDetails 
        }
    })

    new_post.save((error, post) => {
        if (error) res.status(400).json({ error })
        if (post) res.status(201).json({ post })
    })
}

exports.addSubPost = (req, res) => {
    const { blogSubDetails, blogSubHeading, blogName } = req.body
    
    let p2
    let blogDetailsImage

    if(req.file) {
        blogDetailsImage = req.file
        p2 = blogDetailsImage.filename
    }        

    Blog.findOne({ "blogName": blogName })
    .exec((error, post) => {
        if (error) res.status(400).json({ error })
        if (post) {
            Blog.findOneAndUpdate({ "_id": post._id }, {
                "$push": {
                    "blogDetails": {
                        blogSubDetails: blogSubDetails,
                        blogSubHeading: blogSubHeading,
                        blogDetailsImage: p2
                    }
                }
            }, { new: true, upsert: true})
                .exec((error, post) => {
                    if (error) res.status(400).json({ error })
                    if (post) res.status(201).json({ post })
                })
        }
    })
}

exports.deleteBlog = (req, res) => {
    const { _id } = req.body

    Blog.findOneAndDelete({ "_id": _id })
        .exec((error, post) => {
            if (error) res.status(400).json({ error })
            if (post) res.status(201).json({ post })
        })
}

exports.getBlog = (req, res) => {
    Blog.find()
        .exec((error, post) => {
            if (error) res.status(400).json({ error })
            if (post) res.status(201).json({ post })
        })
}

exports.getBlogByID = (req, res) => {
    Blog.findOne({"_id": req.params.id})
    .exec((error, post) => {
        if (error) res.status(400).json({ error })
        if (post) res.status(201).json({ post })
    })
}