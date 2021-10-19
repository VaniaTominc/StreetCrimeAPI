import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Footer from './components/Helpers/Footer'
import Search from './components/SearchAddress/Search'
import ResultCard from './components/ShowCrimes/ResultCard'

const App = () => {

  return (
    
    <BrowserRouter>
      {/* <Switch>
        <Route path='/results'>
          <ResultCard />
        </Route>                                            // ! With this block of code if does not send props from '/' to '/results'
        <Route path='/'>
          <SearchAddress />
        </Route>
      </Switch> */}

      <Switch>
        <Route component={Search} path='/' exact={true} />
        <Route component={ResultCard} path='/results' />
      </Switch>

      <Footer />

    </BrowserRouter>
    
  )
}

export default App
