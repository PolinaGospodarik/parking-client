import {Routes, Route, Navigate} from 'react-router-dom';
import Header from "../components/Header/Header.tsx";
import RegistrationForm from "../page/RegistrationPage/RegistrationForm/RegistrationForm.tsx";
import ParkingMap from "../components/ParkingMap/ParkingMap.tsx";
import AdminList from "../page/AdminList/AdminList.tsx";


function App() {
    return (
        <Routes>
           <Route path="admin" element={<Header/>}>
               <Route index element={<Navigate to="registration" replace />} />
               <Route path="registration" element={<RegistrationForm/>}/>
               <Route path="userList" element={<AdminList/>}/>
               <Route path="map" element={<ParkingMap/>}/>
           </Route>
        </Routes>
    );
}

export default App;
