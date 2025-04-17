import './App.css'
import "../src/utils/axiosInterceptor"
// import RegistrationForm from "./components/RegistrationForm/RegistrationForm.tsx";
import RegistrationPage from "./page/RegistrationPage/RegistrationPage.tsx";
import LoginPage from "./page/LoginPage/LoginPage.tsx";
import Sidebar from "./components/Sidebar/Sidebar.tsx";

// import InputField from "./components/InputField/InputField";

function App() {

  return (
    <>
        <LoginPage/>
        <RegistrationPage/>
        <Sidebar/>
    </>
  )
}

export default App
