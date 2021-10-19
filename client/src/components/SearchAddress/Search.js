import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { FaSearch } from 'react-icons/fa'
import Header from '../Helpers/Header'


const Search = () => {

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

  // ! Preventing ENTER from being hit.
  const submitHandler = event => {
    event.preventDefault()
  }

  
  return (
    <>

      <Header />

      <section className="search_bar_section">

        <form action="" onSubmit={submitHandler} >

          <input 
            autoFocus 
            name="address"
            placeholder="Search address..." 
            required 
            type="search" 
            value={state.address}
            onChange={handleInputChange}
          />

          <Link
            to={{
              pathname: '/results',
              state }}
          >
            <FaSearch className="fa"/>

          </Link>

        </form>

      </section>

      
      
    </>
  )
}

export default Search
