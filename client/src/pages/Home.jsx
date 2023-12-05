import React, {useState, useEffect} from 'react'
import { Link, useLocation } from 'react-router-dom';
import axios from 'axios';
import '../styles/home.scss'

const Home = () => {

  const [posts, setPosts] = useState([])

  const cat = useLocation().search;
  console.log(cat);
  const axiosInstance = axios.create({
    withCredentials: true
  })
  
  useEffect(()=>{
    const fetchData = async ()=>{
      try{
        const res = await axiosInstance.get(`http://localhost:8800/api/posts${cat}`);
        setPosts(res.data)
        console.log("This is the data coming from the server")
        console.log(res.data);  
      }catch(err){ 
        console.log(err)
      }
    };
    fetchData();
  }, [cat])


  const getText = (html) => {
    const doc = new DOMParser().parseFromString(html, "text/html")
    return doc.body.textContent;
  }

  return (
    <div className='home'>
      <div className='posts'>
        {posts.map(post=>(
          <div className='post' key={post.post_id}>
            <div className='img'>
              {post?.img && <img src={`../uploads/${post.img}`} alt=""/>}
            </div>
            <div className='content'>
              <Link to={`/post/${post.post_id}`} className='link'>
              <h1>
                {post.title}
              </h1>
              <p>
                {getText(post.post_desc)}
              </p>
              <button>Read More</button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Home
