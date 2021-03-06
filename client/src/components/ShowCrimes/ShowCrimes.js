import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Crimes from './Crimes'
// import CrimesFilter from './CrimesFilter'

const ShowCrimes = props => {

  // console.log('Incoming props in ShowCrimes >>>>', props)

  const [address, setAddress] = useState([])
  const searchAddress = props.dataAddress
  
  let latitude
  let longitude
  
  const [latitudeLongitude, setLatitudeLongitude] = useState([latitude, longitude])

  useEffect(() => {
    const getData = async () => {
      try {
        const myAPIkey = 'HU9owSyl35RN2CbbvwDfMCY37OqxdnTeIf4yyC6UxAc'
        const { data } = await axios.get(`https://geocode.search.hereapi.com/v1/geocode?q=${searchAddress}&apiKey=${myAPIkey}`)
        
        // Filter only address that is in the UK
        const britishAddress = data.items.filter(item => item.address.countryCode === 'GBR')
        console.log('British address >>>', britishAddress)
        
        setAddress(britishAddress)


        britishAddress.map(item => {
          // eslint-disable-next-line
          return setLatitudeLongitude([latitude = item.position.lat, longitude = item.position.lng])
        })
      } catch (err) {
        console.log('Something is wrong with the data')
      }
    }
    getData()
  }, [searchAddress])

  return (
    <>
      {address && address.map(item => {
        return (
          <>
            <div key={item.id} className="test-positioning">
              <Crimes item={latitudeLongitude} title={item.title}/>
            </div>
          </>
        )
      })}
    </>
  )
}

export default ShowCrimes