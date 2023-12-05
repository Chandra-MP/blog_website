import React, { useState } from 'react'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css';
import axios from 'axios'
import { useLocation } from 'react-router-dom';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';


const Write = () => {

  const state = useLocation().state;
  console.log(useLocation());
  console.log(useLocation().state)
  const [value, setValue] = useState(state?.desc || '')
  const [title, setTitle] = useState(state?.title || '')
  const [file, setFile] = useState(null)
  const [cat, setCat] = useState(state?.cat || '')
  const navigate = useNavigate()

  //This function is used to remove all special characters and spaces from a fileName
  const sanitizeFileName  = (file) => {
    const fileName = file.name.replace(/[^\w\s.-]/g, '');
    const sanitizedFile = new File([file], fileName, { type: file.type });
    return sanitizedFile;
  }

  //function to upload the image file
  const upload = async () => {
    try {
      console.log("trying to upload the image")
      // debugger;
      const formData = new FormData();
      // const sanitizedFile = sanitizeFileName(file)
      
      formData.append("file", file)
      console.log(file);
      console.log(formData);
      // debugger;
      const res = await axios.post("http://localhost:8800/api/upload", formData, {
        withCredentials: true
      })
      console.log(res.data);
      console.log("Uploaded image succesfully");
      return res.data
    }
    catch (err) { console.log(err) }
  }

  const handleSubmit = async e => {
    e.preventDefault()
    // debugger;
    console.log("In handleSubmit of publish post");
    // We await for the file to get uploaded in the client machine
    const imgUrl = await upload();

    //now we make the post request to the server
    try {
      console.log("Trying to add the post to the database with post request");
      // debugger;
      state ? await axios.put(`api/posts/${state.post_id}`, {
        title, desc: value, cat, img: file ? imgUrl : ""
      }, { withCredentials: true })
        :
        await axios.post(`api/posts/`, {
          title, desc: value, cat, img: file ? imgUrl : "", date: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss")
        }, { withCredentials: true });
        // debugger;
      console.log("Successfully added the post to the database, navigating to the homepage Now!");
      navigate("/")  
    } catch (err) {
      console.log(err)
    }
  }

  console.log(value)

  return (
    <div className='add'>
      <div className='content'>
        <input type="text" placeholder='Title' value={title} onChange={e => setTitle(e.target.value)} />
        <div className='editorContainer'>
          <ReactQuill theme='snow' value={value} onChange={setValue} className='editor' />
        </div>
      </div>

      <div className='menu'>
        <div className='item'>
          <h1>Publish</h1>
          <span>
            <strong>Status: </strong> Draft
          </span>
          <span>
            <strong>Visibility: </strong> Public
          </span>
          <input type='file' name='' id='file' style={{ display: 'none' }} onChange={e => setFile(e.target.files[0])} />
          <label htmlFor='file' className='file'>Upload Image</label>
          <div className='buttons' >
            <button >Save as a Draft</button>
            <button onClick={handleSubmit}>Publish</button>
          </div>
        </div>

        <div className='item'>
          <h1>Category</h1>
          <div className='cat'>
            <input type='radio' checked={cat === "art"} name='cat' value='art' onChange={e => setCat(e.target.value)} />
            <label htmlFor='art'>Art</label>
          </div>
          <div className='cat'>
            <input type='radio' checked={cat === "science"} name='cat' value='science' onChange={e => setCat(e.target.value)} />
            <label htmlFor='science'>Science</label>
          </div>
          <div className='cat'>
            <input type='radio' checked={cat === "technology"} name='cat' value='technology' onChange={e => setCat(e.target.value)} />
            <label htmlFor='technology'>Technology</label>
          </div>
          <div className='cat'>
            <input type='radio' checked={cat === "food"} name='cat' value='food' onChange={e => setCat(e.target.value)} />
            <label htmlFor='food'>Food</label>
          </div>
          <div className='cat'>
            <input type='radio' checked={cat === "design"} name='cat' value='design' onChange={e => setCat(e.target.value)} />
            <label htmlFor='design'>Design</label>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Write
