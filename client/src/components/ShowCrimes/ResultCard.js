import React from 'react'
import { NavLink } from 'react-router-dom'
import ShowCrimes from './ShowCrimes'

const ResultCard = props => {

  //console.log('props ResultCard >>>>', props.location.state.address)

  // const { address } = (props.location && props.location.state) || {}

  return (

    <div>
      
      <NavLink to='/'>
        Go Back
      </NavLink>

      <div>
        <div>
          {/* <strong>Address:</strong> {address} */}
          <ShowCrimes dataAddress={props.location.state.address} />
        </div>
      </div>
    </div>

  )
}

export default ResultCard