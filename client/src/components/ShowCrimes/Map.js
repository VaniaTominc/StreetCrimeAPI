import React, { useState } from 'react'
import ReactMapGL, { Marker } from 'react-map-gl'
import { FaMapMarkerAlt } from 'react-icons/fa'

const Map = props => {

  // console.log('incoming data props Map >>>>', props.coordinates[0])

  const [viewport, setViewport] = useState({
    latitude: props.coordinates[0],
    longitude: props.coordinates[1],
    width: '50vw',
    height: '50vh',
    zoom: 10,
  })

  const latitude = props.coordinates[0]
  const longitude = props.coordinates[1]


  return (

    <section className='map_container'> 
      <ReactMapGL 
        {...viewport}
        mapboxApiAccessToken={'pk.eyJ1IjoidnRvbWluYyIsImEiOiJja3V2eTAyZ2QxenNiMm9xdjhtNGVidmdzIn0.okxM22u89LcjmDTsFeQqHQ'}
        mapStyle='mapbox://styles/mapbox/streets-v11'
        onViewportChange={viewport => {
          setViewport(viewport)
        }}
      >
        
        <Marker 
          latitude={latitude}
          longitude={longitude}
        >
          <FaMapMarkerAlt className='market-icon'/>
        </Marker>

      </ReactMapGL>

      <div id='map'></div>
    </section>

  )
}


export default Map