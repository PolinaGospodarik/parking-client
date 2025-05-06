import './App.css'
import "../src/utils/axiosInterceptor"
import LoginPage from "./page/LoginPage/LoginPage.tsx";
import DashboardRoutes from "./routes/DashboardRoutes.tsx";
import {useAppDispatch, useAppSelector} from "./hook.ts";
import {Routes, Route, Navigate} from "react-router-dom";
import {useEffect} from "react";
import {setRoleFromStorage} from "./redux/slice/loginSlice.ts";
import AdminRoutes from "./routes/AdminRoutes.tsx";
import GuardPage from "./page/GuardPage/GuardPage.tsx";


function App() {
    const dispatch = useAppDispatch();
    const role = useAppSelector((state) => state.login.role);

    useEffect(() => {
        dispatch(setRoleFromStorage());
    }, [dispatch]);

  return (
    <>
        <Routes>
            <Route path="/" element={<Navigate to="/login"/>}/>
            <Route path="/login" element={<LoginPage/>}/>

            {role === 'USER'  && <Route path="/*" element={<DashboardRoutes/>}/>}
            {role === 'ADMIN' && <Route path="/*" element={<AdminRoutes/>}/>}
            {role === "GUARD" && (<Route path="/*" element={<GuardPage/>}/>)}

            <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
    </>
  )
}

export default App
