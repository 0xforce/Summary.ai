import express from 'express'
import * as dotenv from 'dotenv'

import Post from '../mongodb/models/post.js'

dotenv.config()

const router = express.Router()

// Get All Posts
router.route('/').get(async (req, res) => {
    try {
        const posts = await Post.find({})

        res.status(200).json({ success: true, data: posts })
    } catch (error) {
        res.status(500).json({ success: false, message: 'Fetching posts failed, please try again' })
    }
})

// Create a Post
router.route('/').post(async (req, res) => {
    try {
        const { name, resumen } = req.body

        const newPost = await Post.create({
            name,
            resumen
        })

        res.status(200).json({ success: true, data: newPost })
    } catch (error) {
        res.status(500).json({ success: false, message: error })
    }
})

export default router