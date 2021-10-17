import React, { Fragment } from 'react'
import ChartBar from './ChartBar'

const Chart = props => {

  //console.log('Incoming data inside Chart component >>>>', props)

  const dataPointValues = props.dataPoints.map(dataPoint => dataPoint.crimesNumber)
  const totalMaximum = Math.ceil(Math.max(...dataPointValues) + 300)



  return (
    <div className='chart'>
      {props.dataPoints.map(dataPoint => {
        return (
          <Fragment key={dataPoint.label}>
            <ChartBar
              value={dataPoint.crimesNumber}
              maxValue={totalMaximum}
              label={dataPoint.name}
            />
            <p>{dataPoint.crimesNumber}</p>
          </Fragment>
        )
      })}
    </div>
  )
}

export default Chart