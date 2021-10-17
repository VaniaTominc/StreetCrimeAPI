import React from 'react'
import Chart from './Chart'

const CrimesChart = props => {

  // console.log('incoming props >>>>', props)

  const chartDataPoints = props.crimes

  return (
    <Chart dataPoints={chartDataPoints} />
    
  )
}

export default CrimesChart