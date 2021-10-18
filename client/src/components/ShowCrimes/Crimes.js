/* eslint-disable no-unused-vars */
import React, { useState, useEffect, Fragment, useCallback } from 'react'
import axios from 'axios'
import CrimesFilter from './CrimesFilter'
import CrimesChart from './CrimesChart'
import { PieChart, Pie, Sector, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts'

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
      <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill}>
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
        fill={fill}
      />
      <path
        d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`}
        stroke={fill}
        fill="none"
      />
      <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
      <text
        x={ex + (cos >= 0 ? 1 : -1) * 12}
        y={ey}
        textAnchor={textAnchor}
        fill='#333'
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
  
  const [crimes, setCrimes] = useState([])
  const [crimesPerMonth, setCrimesPerMonth] = useState([])

  // eslint-disable-next-line no-unused-vars
  const [crimesNumberPerYear, setCrimesNumberPerYear] = useState([])
  const [hasError, setHasError] = useState(false)

  const [filteredYear, setFilteredYear] = useState('2020')

  const filteredChangeHandler = selectedYear => {
    setFilteredYear(selectedYear)
  }


  const latitude = props.item[0]
  const longitude = props.item[1]


  const [separateMonthData, setSeparateMonthData] = useState([])


  // ! ------------------------- START PLAYING WITH NUMBERS ----------------------------------

  const [numberYear, setNumberYear] = useState('')

  const [isLoading, setIsLoading] = useState(false)

  const [categories, setCategories] = useState([])

  const [monthData, setMonthData] = useState([])

  // ! ------------------------- END PLAYING WITH NUMBERS ------------------------------------

  // ! ------------------------- START PLAYING WITH GRAPHS -----------------------------------

  // ! ------------------------- END PLAYING WITH GRAPHS -------------------------------------

  // ! ------------------------- START PLAYING WITH MAPS -----------------------------------

  const [locations, setLocations] = useState([])

  // ! ------------------------- END PLAYING WITH MAPS -------------------------------------

  useEffect(() => {
    const getData = async () => {
      try {
        const newArray = []
        const months = [null,'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
        const monthWithCrimesData = []  
        const monthData = []                                          
        for (let month = 1; month < 13; month++) {
          const { data } = await axios.get(`https://data.police.uk/api/crimes-street/all-crime?lat=${latitude}&lng=${longitude}&date=${filteredYear}-${month}`)
          // newArray.push(data)
          // setCrimesPerMonth(crimesPerMonth[month] = data.length)
          newArray.push(data.length)                                              // ? Number of crimes per each month, pushed inside a new, empty array.
          monthWithCrimesData.push(data)                                          // ? Data for each month separately, pushed inside of a new, empty array.
          monthData.push({                                                        // ? Creating an array of month-numberOfCrimesPerMonth pair, pushed inside of a new, empty array.
            name: months[month],
            crimesNumber: crimesPerMonth[month] = data.length,
          })
        }
      
        // console.log('monthData >>>>', monthData)
        setMonthData(monthData)

        const reducer = (previousValue, currentValue) => previousValue + currentValue
        const finalNumber = newArray.reduce(reducer)
        setNumberYear(finalNumber)

        // ! ZAENKRAT DELUJE
        setIsLoading(true)

        // ! KONEC - pazi da je zgornja vrstica zadnja!
        //   setCrimesNumberPerYear(finalNumber)
        //   setCrimes(newArray)
        // }
        // setSeparateMonthData(monthWithCrimesData)
        // console.log('separateMonthsData >>>>', monthWithCrimesData)

        const mergedArray = [].concat.apply([], monthWithCrimesData)
        console.log('mergedArray >>>>', mergedArray)
        // setMergedCrimes(mergedArray)
        // setLocations(mergedArray)

        const allLocations = mergedArray.map(item => item.location)
        setLocations(allLocations)

        const allCategoriesData = mergedArray.map(item => item.category)
        setCategories(allCategoriesData)
        

      } catch (err) {
        setHasError(true)
        console.log(err.message)
      }
    }
    getData()
  
  }, [latitude, longitude, crimes, crimesPerMonth, filteredYear])

  console.log('ALL LOCATIONS >>>>', locations)

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

  

  
  return (
    <Fragment>

      {/* <CrimesFilter selected={filteredYear} onChangeFilter={filteredChangeHandler} /> */}
      
      {isLoading ? 
        (<>
          <p>Crimes per year: {numberYear}</p>
 
          <div>
            <LineChart
              width={1000}
              height={600}
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
                stroke="#8884d8"
                activeDot={{ r: 8 }}
              />
            </LineChart>
          </div>


          <div>
            <PieChart width={1200} height={800}>
              <Pie
                activeIndex={activeIndex}
                activeShape={renderActiveShape}
                data={arrayToObject}
                cx={400}
                cy={200}
                innerRadius={120}
                outerRadius={160}
                fill="#8884d8"
                dataKey="value"
                onMouseEnter={onPieEnter}
              />
            </PieChart>
          </div>
        </>) 
        
        : 
        
        (<div className="lds-roller">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>) 
        
      }
      
      
      {/* <CrimesChart crimes={separateMonthData}/> */}

      <>

        {/* {mergedCrimes ?
        
          <>

            <p>There were {mergedCrimes.length} crimes.</p>

            <h3>All Categories:</h3>
            {mergedCrimes && mergedCrimes.map(item => {
              return (
                <div key={item.id}>
                  {}
                </div>
              )
            })}

            <PieChart width={600} height={400}>
              <Pie
                activeIndex={activeIndex}
                activeShape={renderActiveShape}
                data={separateMonthData}
                cx={200}
                cy={200}
                innerRadius={60}
                outerRadius={80}
                fill="#8884d8"
                dataKey="crimesNumber"
                onMouseEnter={onPieEnter}
              />
            </PieChart>

            {/* {mergedCrimes && 
              mergedCrimes.map(item => {
                return (
                  <div key={item.id}>
                    <h6>{item.category}</h6>
                    <p>{item.month}</p>
                  </div>
                )
              })
            } */}

          

      </>



    </Fragment>
  )
}

export default Crimes

