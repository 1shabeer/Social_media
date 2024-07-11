import React, { useContext, useEffect } from 'react'
import { Link, useParams, } from 'react-router-dom'
import DataContext from '../context/DataContext';

const Editpost = () => {
   
    const { posts, handleEdit, editTitle, editBody, setEditBody, setEditTitle, } = useContext(DataContext)
    const { id } = useParams();
    const post = posts.find((post) => (post.id).toString() === id);

    useEffect(() => {
        if (post) {
            setEditBody(post.body)
            setEditTitle(post.title)
        }
    }, [post, setEditBody, setEditTitle])

    return (
        <main className='Editpost'>
            {editTitle &&
                <>
                    <h2>Edit Post</h2>
                    <form className='newPostForm' onSubmit={(e) => e.preventDefault()}>
                        <label htmlFor='editTitle'>Title:</label>
                        <input
                            id="editTitle"
                            type="text"
                            required
                            value={editTitle}
                            onChange={(e) => setEditTitle(e.target.value)}
                        />

                        <label htmlFor='editBody'>Post:</label>
                        <textarea
                            id="editBody"
                            type='text'
                            required
                            value={editBody}
                            onChange={(e) => setEditBody(e.target.value)}
                        />

                        <button type='submit'
                            onClick={() => handleEdit(post.id)}>submit</button>

                    </form>
                </>
            }
            {!editTitle &&
                <>
                    <h2>Post not found</h2>
                    <p>Well, that's disappointing</p>
                    <p><Link to="/">visit our homepage</Link></p>
                </>
            }

        </main>
    )
}

export default Editpost