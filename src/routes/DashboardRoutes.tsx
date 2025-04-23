import { Routes, Route, Navigate } from 'react-router-dom';
import DashboardLayoutBasic from '../components/Sidebar/Sidebar.tsx';
import CarPage from '../page/CarPage/CarPage.tsx';
import BookingPage from "../page/BookingPage/BookingPage.tsx";
import HistoryPage from "../page/HistoryPage/HistoryPage.tsx";
import ParkingPage from "../page/ParkingPage/ParkingPage.tsx";


function App() {
    return (
        <Routes>
            <Route path="user" element={<DashboardLayoutBasic />}>
                <Route index element={<Navigate to="parking" replace />} />
                <Route path="parking" element={<ParkingPage/>} />
                <Route path="car" element={<CarPage/>} />
                <Route path="booking" element={<BookingPage/>} />
                <Route path="history" element={<HistoryPage/>} />
                <Route path="*" element={<div>Страница не найдена</div>} />
            </Route>
        </Routes>
    );
}

export default App;
