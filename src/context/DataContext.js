import { createContext, useState, useEffect } from "react";
import useAxiosFetch from "../Hooks/useAxiosfetch";
import useWindowSize from '../Hooks/useWindowSize'
import api from "../api/posts"
import { format } from 'date-fns'
import { useNavigate } from "react-router-dom";


const DataContext  = createContext({})


export const Dataprovider = ({children}) =>{

    const [posts, setPosts] = useState([])
  const [search, setSearch] = useState("")
  const [searchResults, setSearchResults] = useState([])
  const [postTitle, setPostTitle] = useState("")
  const [postBody, setPostBody] = useState("")
  const [editTitle, setEditTitle] = useState("")
  const [editBody, setEditBody] = useState("")
  const navigate = useNavigate()
  const {width} = useWindowSize()
  const {data, isLoading, fetchError} = useAxiosFetch("http://localhost:3500/posts");
 


   useEffect(()=>{
    setPosts(data);
    JSON.parse(localStorage.getItem('data'));
   },[data])





  //  Get method by using axios  
  // useEffect(() => {
  //   const fetchPosts = async () => {
  //     try {
  //       const response = await api.get('/posts');
  //       setPosts(response.data);
  //     } catch (err) {
  //       if (err.response) {
  //         // Not in the 200 response
  //         console.log(err.response.data);
  //         console.log(err.response.status);
  //         console.log(err.response.headers);
  //       } else {
  //         console.log(`Error:${err.message}`);
  //       }
  //     }
  //   }
  //   fetchPosts();
  // }, [])



  //Search items function by using useEffect
  useEffect(() => {
    const filteredResult = posts.filter((post) =>
      ((post.title).toLowerCase()).includes(search.toLowerCase())
      || ((post.body).toLowerCase()).includes(search.toLowerCase()));
    setSearchResults(filteredResult.reverse());
    localStorage.setItem("data",JSON.stringify(filteredResult))

  }, [posts, search])

 

  // New post added function
 
  const handleSubmit = async (e) =>{
    e.preventDefault()
    const id = posts.length ? posts[posts.length - 1].id + 1 :1
    const datetime = format(new Date(), 'MMMM dd, yyyy pp')
    const newpost ={id, title:postTitle, datetime, body:postBody}
    try{
    const response = await api.post('/posts', newpost)
    const allpost = [...posts, response.data]
    setPosts(allpost);
    setPostBody('')
    setPostTitle('')
    navigate('/')
    localStorage.setItem("data",JSON.stringify(allpost))
    }catch(err){
      console.log(`Error:${err.message}`);
    }
  }

  
     // edit the values by using put method
  
  const handleEdit = async (id) => {
    const datetime = format(new Date(), 'MMMM dd, yyyy pp');
    const updatePost = { id, title: editTitle, datetime, body: editBody };
    try {
      const response = await api.put(`/posts/${id}`, updatePost)
      setPosts(posts.map(post => post.id === id ? { ...response.data } : post));
      setEditTitle("");
      setEditBody("");
      localStorage.setItem("data",JSON.stringify(response))
      navigate('/');
    } catch (err) {
      console.log(`Error:${err.message}`);
    } 

  }


  // post delete function
  const handleDelete = async (id) => {
    try {
      await api.delete(`/posts/${id}`)
      const postsList = posts.filter(post => post.id !== id);
      setPosts(postsList)
      navigate('/')
      localStorage.setItem("data",JSON.stringify(postsList))
    } catch (err) {
      console.log(`Error:${err.message}`)
    }

  }

    return(
    <DataContext.Provider value={{
     width, search, setSearch,
     searchResults, isLoading, fetchError,
     handleSubmit, postTitle, setPostTitle, postBody, setPostBody, 
     posts, handleDelete,
     handleEdit, editTitle, editBody, setEditBody, setEditTitle,
    }}>
        {children}
    </DataContext.Provider>
    )
}

export default DataContext