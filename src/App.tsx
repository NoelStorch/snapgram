import { Route, Routes } from 'react-router-dom'
import './global.css'
import { Home } from './_root/pages'
import SigninForm from './_auth/forms/SigninForm'
import SignupForm from './_auth/forms/SignupForm'
import AuthLayout from './_auth/AuthLayout'
import RootLaout from './_root/RootLaout'


const App = () => {
  return (
    <main className='flex h-scree'>
        <Routes>
          {/* public routes */}
          <Route element={<AuthLayout />}>
            <Route path='/sign-in' element={<SigninForm />} />
            <Route path='/sign-up' element={<SignupForm />} />
          </Route>
          {/* private routes */}
          <Route element={<RootLaout />}>
            <Route index element={<Home />} />
          </Route>

        </Routes>
    </main>
  )
}

export default App