import { Route, Routes } from 'react-router-dom'
import './global.css'
import { Home } from './_root/pages'
import SigninForm from './_auth/forms/SigninForm'
import SignupForm from './_auth/forms/SignupForm'
import AuthLayout from './_auth/AuthLayout'
import RootLaout from './_root/RootLayout'
import { Toaster } from './components/ui/toaster'


const App = () => {
  return (
    <main className='flex h-scree'>
        <Routes>
          {/* public routes */}
          <Route element={<AuthLayout />}>
            <Route path='/iniciar-sesion' element={<SigninForm />} />
            <Route path='/registrarse' element={<SignupForm />} />
          </Route>
          {/* private routes */}
          <Route element={<RootLaout />}>
            <Route index element={<Home />} />
          </Route>

        </Routes>
        <Toaster   />
    </main>
  )
}

export default App