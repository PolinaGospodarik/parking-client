import './App.css'
import "../src/utils/axiosInterceptor"
// import RegistrationForm from "./components/RegistrationForm/RegistrationForm.tsx";
import RegistrationPage from "./page/RegistrationPage/RegistrationPage.tsx";
import LoginPage from "./page/LoginPage/LoginPage.tsx";
// import InputField from "./components/InputField/InputField";

function App() {

  return (
    <>
        <LoginPage/>
        <RegistrationPage/>
    </>
  )
}

export default App
