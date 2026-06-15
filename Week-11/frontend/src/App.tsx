import { Route, Routes } from 'react-router-dom'
import './App.css'
import { SignupPage } from './pages/signup'

function App() {

  return (
    <>
      <Routes>
        <Route path='/signup' element={<SignupPage />} />
      </Routes>
    </>
  )
}

export default App
