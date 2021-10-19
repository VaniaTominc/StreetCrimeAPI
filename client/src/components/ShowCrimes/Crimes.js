/* eslint-disable no-unused-vars */
import React, { useState, useEffect, Fragment, useCallback } from 'react'
import axios from 'axios'
import { PieChart, Pie, Sector, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts'
import Map from './Map'
import Spinner from '../Helpers/Spinner'

const renderActiveShape = props => {
  const RADIAN = Math.PI / 180
  const {
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    startAngle,
    endAngle,
    fill,
    payload,
    percent,
    value,
  } = props
  const sin = Math.sin(-RADIAN * midAngle)
  const cos = Math.cos(-RADIAN * midAngle)
  const sx = cx + (outerRadius + 10) * cos
  const sy = cy + (outerRadius + 10) * sin
  const mx = cx + (outerRadius + 30) * cos
  const my = cy + (outerRadius + 30) * sin
  const ex = mx + (cos >= 0 ? 1 : -1) * 22
  const ey = my
  const textAnchor = cos >= 0 ? 'start' : 'end'

  return (
    <g>
      <text x={cx} y={cy} dy={20} textAnchor="middle" fill={fill}>
        {payload.name}
      </text>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={outerRadius + 6}
        outerRadius={outerRadius + 10}
        fill={'#FF0000'}
      />
      <path
        d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`}
        stroke={'#FF0000'}
        fill="none"
      />
      <circle cx={ex} cy={ey} r={2} fill={'#FF0000'} stroke="none" />
      <text
        x={ex + (cos >= 0 ? 1 : -1) * 12}
        y={ey}
        textAnchor={textAnchor}
        fill='##FF0000'
      >{`Cases ${value}`}</text>
      <text
        x={ex + (cos >= 0 ? 1 : -1) * 12}
        y={ey}
        dy={18}
        textAnchor={textAnchor}
        fill="#999"
      >
        {`(Rate ${(percent * 100).toFixed(2)}%)`}
      </text>
    </g>
  )
}


const Crimes = props => {

  // console.log('props in Crimes >>>>', props.latitude)
  
  const [crimes, setCrimes] = useState([])
  const [crimesPerMonth, setCrimesPerMonth] = useState([])

  const [hasError, setHasError] = useState(false)

  const [filteredYear, setFilteredYear] = useState('2020')

  const latitude = props.item[0]
  const longitude = props.item[1]
  const title = props.title


  const [separateMonthData, setSeparateMonthData] = useState([])


  // ! ------------------------- START PLAYING WITH NUMBERS ----------------------------------

  const [numberYear, setNumberYear] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [categories, setCategories] = useState([])
  const [monthData, setMonthData] = useState([])

  // ! ------------------------- END PLAYING WITH NUMBERS ------------------------------------


  // Storing or crimes' coordinates
  const [locations, setLocations] = useState([])

  useEffect(() => {

    const getData = async () => {

      try {
        const newArray = []
        const months = [null,'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
        const monthWithCrimesData = []  
        const monthData = []    

        for (let month = 1; month < 13; month++) {
          const { data } = await axios.get(`https://data.police.uk/api/crimes-street/all-crime?lat=${latitude}&lng=${longitude}&date=${filteredYear}-${month}`)
          newArray.push(data.length)                                              // ? Number of crimes per each month, pushed inside a new, empty array.
          monthWithCrimesData.push(data)                                          // ? Data for each month separately, pushed inside of a new, empty array.
          monthData.push({                                                        // ? Creating an array of month-numberOfCrimesPerMonth pair, pushed inside of a new, empty array.
            name: months[month],
            crimesNumber: crimesPerMonth[month] = data.length,
          })
        }
      
        setMonthData(monthData)

        const reducer = (previousValue, currentValue) => previousValue + currentValue
        const finalNumber = newArray.reduce(reducer)
        setNumberYear(finalNumber)

        setIsLoading(true)

        const mergedArray = [].concat.apply([], monthWithCrimesData)

        const allLocations = mergedArray.map(item => item.location)
        setLocations(allLocations)

        const allCategoriesData = mergedArray.map(item => {
          const stringToConvert = item.category.replaceAll('-', ' ')
          return stringToConvert.charAt(0).toUpperCase() + stringToConvert.slice(1)
        })
        setCategories(allCategoriesData)
        


      } catch (err) {
        setHasError(true)
        console.log(err.message)
      }
    }
    getData()
  
  }, [latitude, longitude, crimes, crimesPerMonth, filteredYear])

  // console.log('ALL LOCATIONS >>>>', locations)

  // ! How many categories? 
  const howManyTimesEachCategory = array => array.reduce((obj, e) => {
    obj[e] = (obj[e] || 0) + 1
    return obj
  }, {})
  
  // console.log('Working? >>>>', howManyTimesEachCategory(categories))
  
  // ! Getting an annual number of committed crimes per category. 
  const object = howManyTimesEachCategory(categories)
  const result = Object
    .entries(object)
    

  // ! Converting an array with nested arrays into an array with nested objects.
  // console.log('result >>>>', result)         gives me bellow result
  // ['anti-social-behaviour', 8308]
  // ['anti-social-behaviour', 8308] >>>>>> {'name': 'anti-social-behaviour', 'value': 8308}

  const arrayToObject = result.map(item => {
    const [name, value] = item
    const newObject = { name, value }
    return newObject
  })

  // console.log('testing >>>>', arrayToObject)


  // ! PieChart Months

  const [activeIndex, setActiveIndex] = useState(0)
  const onPieEnter = useCallback(
    (_, index) => {
      setActiveIndex(index)
    },
    [setActiveIndex]
  )

  const handleFilterYear = (event) => {
    // console.log('event.target.value', event.target.value)
    setFilteredYear(event.target.value)
  }

  
  return (
    <Fragment>
      
      <>

        {/* <Spinner /> */}

        {isLoading ? 
          (<>
            <div className='playing'>
              <h2 className='title_crimes_area'>Area of {title} in </h2>
              {/* <span className='year_style'>{filteredYear}</span> */}
              <select onChange={handleFilterYear}>
                <option value='2020' className='dropdown-item'>2020</option>
                <option value='2019' className='dropdown-item'>2019</option>
              </select>
            </div>
            <div className='crimes-positioning'>
              <Map coordinates={props.item} />
            </div>

            <h2>Crime count:</h2>
            <div>
              {isLoading ?
                (
                  <h2 className='number_year_style'>{numberYear}</h2>
                )

                :

                (
                  <h2 className='number_year_style'>Loading ...</h2>
                )
              }

            </div>
 
            <section className='graph_section'>

              <h2 className='positioning_h_two_show_page'>Crimes Per Month</h2>

              <LineChart
                width={1000}
                height={300}
                data={monthData}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="crimesNumber"
                  stroke="#000f49"
                  activeDot={{ r: 8 }}
                />
              </LineChart>

            </section>

            <section className='pie_chart_section'>
              <h2 className='positioning_h_two_show_page'>Crimes frequency</h2>

              <PieChart width={1200} height={800}>
                <Pie
                  activeIndex={activeIndex}
                  activeShape={renderActiveShape}
                  data={arrayToObject}
                  cx={600}
                  cy={200}
                  innerRadius={120}
                  outerRadius={160}
                  fill="#000f49"
                  dataKey="value"
                  onMouseEnter={onPieEnter}
                  className='color-text'
                />
              </PieChart>
            </section>


          </>) 
        
          : 
        
          (<Spinner />) 
        
        }
      

      </>

    </Fragment>
  )
}

export default Crimes

