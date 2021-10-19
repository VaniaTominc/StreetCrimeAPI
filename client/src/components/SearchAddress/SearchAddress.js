/* eslint-disable no-unused-vars */

import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { FaSearch } from 'react-icons/fa'


const SearchAddress = () => {

  const [state, setState] = useState({
    address: '',
  })

  // console.log('state >>>>', state)

  const handleInputChange = (event) => {
    const { name, value } = event.target
    setState((prevState) => ({
      ...prevState,
      [name]: value }))
  }

  // ! Preventing enter from being hit.
  const submitHandler = event => {
    event.preventDefault()
  }

  
  return (
    <>

      <header className='header_section'>
        <div className='top-header-position'>
          <img className='police-icon-head' src='https://i.ibb.co/JxJsB14/Untitled-2.png' alt='police-guy' />
          <h1 className='main-heading'>Check street crime in your area</h1>
          <div className='testing-flex'>
            <div></div>
            <h2 className='sub-heading'>2020 Edition</h2>
          </div>
        </div>
      </header>

      <section className='search_bar_section'>

        <form action='' onSubmit={submitHandler} >

          <input 
            type="search" 
            placeholder="Search address..." 
            autoFocus 
            required 
            name='address'
            value={state.address}
            onChange={handleInputChange}
          />

          <Link
            to={{
              pathname: '/results',
              state }}
          >
            <FaSearch className='fa'/>

          </Link>
          {/* <a href="javascript:void(0)" id="clear-btn">Clear</a> */}

        </form>

      </section>

      
      
    </>
  )
}

export default SearchAddress
