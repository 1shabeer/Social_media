import React, { useContext } from 'react'
import Post from './Post'
import DataContext from '../context/DataContext'

const Home = () => {
    const { searchResults, isLoading, fetchError } = useContext(DataContext)
    return(
        <main className='Home'>
            {isLoading && <p>Loading posts...</p>}
            {fetchError &&  <p style={{color:"red"}}>{`Error:${fetchError}`}</p>}
            {!isLoading && !fetchError && (searchResults.length ? <Post posts={searchResults}/> : <p style={{margin:"2rem"}}>No Posts to display.</p>)}
        </main>
    )
}

export default Home