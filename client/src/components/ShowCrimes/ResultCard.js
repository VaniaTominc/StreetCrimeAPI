import React from 'react'
import { NavLink } from 'react-router-dom'
import ShowCrimes from './ShowCrimes'
import { FaHome } from 'react-icons/fa'
import { BsArrowLeft } from 'react-icons/bs'

const ResultCard = props => {

  // console.log('props ResultCard >>>>', props)

  return (

    <div>
      
      <NavLink to='/' className='home_page_icon'>
        <div className='icons_position'>
          <FaHome size={40} className='home_button_style' />
          <BsArrowLeft size={20} />
        </div>
        <img className='police_icon_home_page' src='https://i.ibb.co/JxJsB14/Untitled-2.png' alt='police guy home icon' title='Go home' />
      </NavLink>

      <div>
        <div>
          <ShowCrimes dataAddress={props.location.state.address} />
        </div>
      </div>
    </div>

  )
}

export default ResultCard