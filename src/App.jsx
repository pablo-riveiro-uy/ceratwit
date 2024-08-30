

import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import CeraScreen from './paginas/cerascreen'
import Home from './paginas/home'
import 'animate.css';
import Manager from './paginas/manager';



function App() {

  return (
    <>
    <Router>
      <Routes>
      <Route path='/' element={<Home/>}> </Route>
      <Route path='/ceratwits' element={<CeraScreen/>}>  </Route>
      <Route path='/manager' element={<Manager/>}>  </Route>
      </Routes>
    </Router>
    </>
  )
}

export default App


