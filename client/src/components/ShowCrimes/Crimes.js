import React, { useState, useEffect, Fragment, useCallback } from 'react'
import axios from 'axios'
import CrimesFilter from './CrimesFilter'
import CrimesChart from './CrimesChart'
import { PieChart, Pie, Sector } from 'recharts'

const renderActiveShape = (props) => {
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

  const [mergedCrimes, setMergedCrimes] = useState([])


  const [separateMonthData, setSeparateMonthData] = useState([])


  const [categories, setCategories] = useState([])

  useEffect(() => {
    const getData = async () => {
      try {
        const newArray = []
        const months = [null,'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
        const monthWithCrimesData = []
        for (let month = 1; month < 13; month++) {
          const { data } = await axios.get(`https://data.police.uk/api/crimes-street/all-crime?lat=${latitude}&lng=${longitude}&date=${filteredYear}-${month}`)
          newArray.push(data)
          setCrimesPerMonth(crimesPerMonth[month] = data.length)
          monthWithCrimesData.push({
            name: months[month],
            crimesNumber: crimesPerMonth[month] = data.length,
          })

          const reducer = (previousValue, currentValue) => previousValue + currentValue
          const finalNumber = crimesPerMonth.reduce(reducer)
          setCrimesNumberPerYear(finalNumber)
          setCrimes(newArray)
        }
        setSeparateMonthData(monthWithCrimesData)

        const mergedArray = [].concat.apply([], newArray)
        setMergedCrimes(mergedArray)

        const allCategoriesData = mergedArray.map(item => item.category)
        setCategories(allCategoriesData)
        
      } catch (err) {
        setHasError(true)
        console.log(err.message)
      }
    }
    getData()
  
  }, [latitude, longitude, filteredYear, crimesPerMonth, mergedCrimes, crimes, categories])

  // console.log('All Categories inside mergedArray [unsorted] >>>', categories)
  console.log('Posamezni mesec >>>', separateMonthData)


  const howManyTimesEachCategory = array => array.reduce((obj, e) => {
    obj[e] = (obj[e] || 0) + 1
    return obj
  }, {})
  
  // console.log('Working? >>>>', typeof howManyTimesEachCategory(categories))
  

  const object = howManyTimesEachCategory(categories)
  const result = Object
    .keys(object)
    .map(item => ({ [item]: object[item] }))
  //   .entries(object)
    
  console.log('result', result)

  // const dataCategories = {
  //   rows: result,
  // }


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
      <h1>Test 01</h1>
      <CrimesFilter selected={filteredYear} onChangeFilter={filteredChangeHandler} />
      
      <CrimesChart crimes={separateMonthData}/>

      <>

        {mergedCrimes ?
        
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

          </> :

          hasError ? 

            <h2>Something has gone wrong</h2>

            :

            <h2>Loading ...</h2>

        }

      </>



    </Fragment>
  )
}

export default Crimes

