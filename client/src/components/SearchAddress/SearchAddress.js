/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Crimes from '../ShowCrimes/Crimes'
import ResultCard from '../ShowCrimes/ResultCard'
import { Link } from 'react-router-dom'


const SearchAddress = props => {

  const [state, setState] = useState({
    address: '',
  })

  console.log('state >>>>', state)

  const handleInputChange = (event) => {
    const { name, value } = event.target
    setState((prevState) => ({
      ...prevState,
      [name]: value }))
  }

  // const [address, setAddress] = useState([])

  // // ! Handle change
  // const [addressValue, setAddressValue] = useState('')
  // const [searchAddress, setSearchAddress] = useState('')

  // const handleChange = event => {
  //   setAddressValue(event.target.value)
  // }

  // const handleSubmit = event => {
  //   event.preventDefault()
  //   setSearchAddress(addressValue)
  //   setAddressValue('')
  //   console.log('You have search for - ' + addressValue)
  // }

  // let latitude
  // let longitude

  // const [latitudeLongitude, setLatitudeLongitude] = useState([latitude, longitude])
  

  // useEffect(() => {
  //   const getData = async () => {
  //     try {
  //       const myAPIkey = 'HU9owSyl35RN2CbbvwDfMCY37OqxdnTeIf4yyC6UxAc'
  //       const { data } = await axios.get(`https://geocode.search.hereapi.com/v1/geocode?q=${searchAddress}&apiKey=${myAPIkey}`)
        
  //       // Filter only address that is in the UK
  //       const britishAddress = data.items.filter(item => item.address.countryCode === 'GBR')
  //       console.log('British address >>>', britishAddress)
        
  //       setAddress(britishAddress)
  //       // console.log('Incoming data >>>', data.items)


  //       britishAddress.map(item => {
  //         // eslint-disable-next-line
  //         return setLatitudeLongitude([latitude = item.position.lat, longitude = item.position.lng])
  //       })
  //     } catch (err) {
  //       console.log('Something is wrong with the data')
  //     }
  //   }
  //   getData()
  // }, [searchAddress])



  return (
    <>
      <h1>Police API</h1>

      <h2>Search your address</h2>

      <form>
        <input
          type="text"
          placeholder="Enter address"
          name="address"
          value={state.address}
          onChange={handleInputChange}
        />

        <Link
          to={{
            pathname: '/results',
            state }}
        >
          Register
        </Link>
      </form>

      {/* {address ?
        <>
          {address && address.map(item => {
            return (
              <div key={item.id}>
                <h2>Address: {item.title}</h2>
                <p>Position:</p>
                <ul>
                  <li>Latitude: {item.position.lat}</li>
                  <li>Longitude: {item.position.lng}</li>
                </ul>
              </div>
            )
          })}
          {/* <ResultCard item={latitudeLongitude}/> */}

    </>
  )
}

export default SearchAddress
