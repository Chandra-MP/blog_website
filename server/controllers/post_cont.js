import { db } from "../db.js"
// import { Router } from "express "
import jwt from 'jsonwebtoken'

export const getPosts = (req, res) => {
    // http://localhost:3000/?cat=art query is after '?' which is cat=art here.    
    const q = req.query.cat ? "SELECT * FROM posts WHERE cat=?" : "SELECT * FROM posts"

    db.query(q, [req.query.cat], (err, data) => {
        if (err) return res.send(err);
        return res.status(200).json(data);
    })
}

export const getPost = (req, res) => {
    const q = "SELECT p.post_id, `username`, `title`, `post_desc`, p.img, u.img AS userImg , `cat`, `date` FROM users u JOIN posts p ON u.user_id = p.user_id WHERE p.post_id = ?"

    db.query(q, [req.params.id], (err, data) =>{
        if (err) return res.send(err);
        // console.log(data);
        return res.status(200).json(data[0]);
    })
}

export const deletePost = (req, res) => {
    // console.log(req.cookies)
    const token = req.cookies.access_token
    // console.log(token);
    if(!token) return res.status(401).json("Not Authenticated!")

    jwt.verify(token, "jwtkey", (err, userInfo)=>{
        if(err) return res.status(403).json("Token is not Valid!")

        const postId = req.params.id;
        const q = "DELETE FROM posts WHERE  `post_id` = ? AND `user_id` = ? "

        db.query(q, [postId, userInfo.id, (err, data)=>{
            if(err) return res.status(403).json("you can delete only your own posts!")
            return res.json("Post has been Deleted!");
        }])
    });

}

export const addPost = (req, res) => {
      // console.log(req.cookies)
      const token = req.cookies.access_token
      // console.log(token);
      if(!token) return res.status(401).json("Not Authenticated!")
  
      jwt.verify(token, "jwtkey", (err, userInfo)=>{
        if(err) return res.status(403).json("Token is not Valid!")
        
        const q = "INSERT INTO posts (`title`, `post_desc`, `img`, `cat`, `date`, `user_id`) VALUES (?)"  

        // res.json(userInfo.id)

        const values  = [
            req.body.title,
            req.body.desc,
            req.body.img,
            req.body.cat,
            req.body.date,
            userInfo.id,
        ]

        db.query(q, [values], (err, data)=>{
            if(err) return res.status(500).json(err)
            return res.json("Post has been Created!")
        })
      });
}

export const updatePost = (req, res) => {
    // console.log(req.cookies)
    const token = req.cookies.access_token
    // console.log(token);
    if(!token) return res.status(401).json("Not Authenticated!")

    jwt.verify(token, "jwtkey", (err, userInfo)=>{
      if(err) return res.status(403).json("Token is not Valid!")
      
      console.log(req.params);
      const postId = req.params.id;
      const q = "UPDATE posts SET `title`=?, `post_desc`=?, `img`=?, `cat`=? WHERE `post_id`=? AND `user_id`=?";

      const values  = [
          req.body.title,
          req.body.desc,
          req.body.img,
          req.body.cat,
      ]
      console.log(values)
      console.log(postId, userInfo.id);

      db.query(q, [...values, postId, userInfo.id], (err, data)=>{
          if(err) return res.status(500).json(err)
          console.log(data)
          return res.status(200).json("Post has been Updated!")
      })
    });
}