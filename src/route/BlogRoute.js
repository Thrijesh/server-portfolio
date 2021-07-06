const express = require('express')
const { createPost, updatePost, deleteBlog, getBlog, getBlogByID, addSubPost } = require('../controller/BlogController')
const multer = require('multer')
const path = require('path')

const router = express.Router()

console.log(path.join(path.dirname(__dirname), "uploads"))

const storage = multer.diskStorage({
    destination: function ( req, file, cb) {
        cb(null, path.join(path.dirname(__dirname), "uploads"))
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + "-" + file.originalname)
    }
})

const upload = multer({ storage }).fields([{name: "blogImage", maxCount: 10}, {name: "blogDetailsImage", maxCount: 10}]);
const subImgUpload = multer({ storage });

router.post('/create-blog', upload, createPost)
router.post('/add-subpost-blog', subImgUpload.single('blogDetailsImage'), addSubPost)
router.delete('/delete-blog', deleteBlog)
router.get('/get-blogs', getBlog)
router.get('/get-blog-by-id/:id', getBlogByID)

module.exports = router