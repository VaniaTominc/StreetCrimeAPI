import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Footer from './components/Footer/Footer'
import SearchAddress from './components/SearchAddress/SearchAddress'
// import Crimes from './components/ShowCrimes/Crimes'
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
        <Route component={SearchAddress} path='/' exact={true} />
        <Route component={ResultCard} path='/results' />
      </Switch>
      <Footer />
    </BrowserRouter>
    
  )
}

export default App
