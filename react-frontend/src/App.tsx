//import './App.css'

import { Route, Routes } from "react-router-dom";
import GetAllStaff from "./assets/pages/manager/getAllStaff";


function App() {
  return (
    <Routes>
       <Route path="/getAllStaff" element={<GetAllStaff />} />
         
    </Routes>
  );
}

export default App;
