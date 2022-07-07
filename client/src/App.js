import Navbar from "./components/Navbar";
import "./App.css";
import { Route, Routes } from "react-router";
import Homepage from "./components/Homepage";
// import react from "react";
function App() {
  return (
    <div className='main'>
      <Navbar />
      <Routes>
        <Route path='/' element={<Homepage />} />
        {/* <Route path='/TBD' element={<TBD />} /> */}
      </Routes>
    </div>
  );
}

export default App;
