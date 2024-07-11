import React, { useContext } from 'react'
import { Link, useParams } from 'react-router-dom'
import DataContext from '../context/DataContext';

const Postpage = () => {

    const {posts, handleDelete} = useContext(DataContext)
    const {id}= useParams();
    const post = posts.find( (post)=> (post.id).toString() === id);

    return(
        <main className='PostPage'>
           <article className='Post'>
            {post &&
            <>
            <h2>{post.title}</h2>
            <p className='postDate'>{post.datetime}</p>
            <p className='postBody'>{post.body}</p>
            
            <Link to={`/edit/${post.id}`}><button className='editbtn'>Edit Post</button></Link>
            <button onClick={()=> handleDelete(post.id)} className='deletebtn'>Delete Post</button>
            </>
            }
            {!post &&
            <>
            <h2>Post not found</h2>
            <p>Well, that's disappointing</p>
            <p><Link to="/">visit our homepage</Link></p>
            </>
            }
           </article>
        </main>
    )
}

export default Postpage