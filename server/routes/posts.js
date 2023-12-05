import express from 'express'
import { 
    addPost,
    deletePost,
    getPost,
    getPosts,
    updatePost
    } from '../controllers/post_cont.js'

const router = express.Router()

//When there is no category in the search bar of client, this get request is triggered
router.get("/", getPosts)

//When there is some category in the search bar of the client, this get request is triggered
router.get("/:id", getPost)

//Similarly, this is triggered when the post request is made from the client.
router.post("/", addPost)

//This is triggered when a user tries to delete a post, the id is taken from the search bar and that post is removed from the database
router.delete("/:id", deletePost)

//Similarly, this is triggered when a user tries to update/edit their post. The ID is taken from the clients search bar and that post is edited in the database
router.put("/:id", updatePost)

export default router