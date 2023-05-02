
import './App.css';
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import Navbar from './layout/Navbar';
import Home from './pages/Home';
import { BrowserRouter as Router, Routes, Route, Redirect } from 'react-router-dom';
import EditUser from './users/EditUser';
import Register from './pages/Register';
import WelcomePage from './pages/Welcome';

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar/>

        <Routes>
          <Route exact path='/' element = {<WelcomePage/>}/>
          <Route exact path='/user/new' element = {<Register/>}/>
          <Route exact path ='/edituser/:id' element = {<EditUser/>} />
          <Route exact path="/users/:id" element={<Home />} />
        </Routes>
      </Router>
      
    </div>
  );
}

export default App;