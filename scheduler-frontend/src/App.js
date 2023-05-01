
import './App.css';
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import Navbar from './layout/Navbar';
import Home from './pages/Home';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AddUser from './users/AddUser';
import EditUser from './users/EditUser';
import ViewUser from "./users/ViewUser";
import Register from './pages/Register';
import Test from "./pages/Test"

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar/>

        <Routes>
          <Route exact path='/dashboard/:id' element = {<Home/>}/>
          <Route exact path='/users/new' element = {<Register/>}/>
          <Route exact path ='/edituser/:id' element = {<EditUser/>} />
          <Route exact path="/users/:id" element={<Home />} />
          <Route exact path="/users/joint" element={<Test />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;