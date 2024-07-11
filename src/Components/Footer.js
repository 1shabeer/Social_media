import React from 'react'

const Footer = () => {

    const fullyear = new Date()
    return(
        <footer className='Footer'> 
           <p>Copyright &copy; {`${fullyear.getFullYear()}`}</p>

        </footer>
    )
}

export default Footer