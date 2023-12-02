import React, { useContext, useEffect, useState } from 'react'
// import Man from '../images/pexels-simon-robben-614810.jpg'
import Edit from '../images/edit.png'
import Delete from '../images/garbage.png'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import Menu from '../components/Menu'
import axios from 'axios'
import moment from 'moment'
import { AuthContext } from '../context/authContext'



const Single = () => {

  const [post, setPost] = useState({});
  const location = useLocation();
  const navigate = useNavigate();
  const {currentUser} = useContext(AuthContext)

  const postId = location.pathname.split("/")[2]
  // console.log(postId)

  useEffect(()=>{
    const fetchData  = async ()=>{
      try{
        const res = await axios.get(`http://localhost:8800/api/posts/${postId}`);
        setPost(res.data);
        // console.log(res.data)
      }catch(err){
        console.log(err);
      }
    };
    fetchData();
  }, [postId]);

  const handleDelete = async () => {
    try{
      await axios.delete(`http://localhost:8800/api/posts/${postId}`, {
        withCredentials: true
      });
      navigate("/")
    }catch(err) {console.log(err);}
  }

  const getText = (html) => {
    const doc = new DOMParser().parseFromString(html, "text/html")
    return doc.body.textContent;
  }


  return (
    <div className='single'>
      <div className='content'>
        <img src={`../uploads/${post?.img}`} alt=''></img>
        <div className='user'>
          {post.userImg && <img src={post.userImg} alt=''></img>}
          <div className='info'>
            <span>{post.username}</span>
            <p>Posted {moment(post.date).fromNow()}</p>
          </div>
          {currentUser.username === post.username && <div className='edit'>
            <Link to={`/write?edit=2`} state = {post}>
              <img src={Edit} alt=''></img>
            </Link>
            <img src={Delete} alt='' onClick={handleDelete}></img>
          </div>}
        </div>
        <h1>{post.title}</h1>
        {getText(post.post_desc)}
      </div>
      <Menu cat={post.cat}/>
    </div>
  )
}

export default Single
