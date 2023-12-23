import { Route, Routes } from 'react-router-dom'
import './globals.css'
import { Home, Explore,Saved, AllUsers, CreatePost, EditPost, PostDetails, Profile, UpdateProfile } from './_root/pages'
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
            <Route path='/explorar' element={<Explore />}/>
            <Route path='/guardados' element={<Saved />}/>
            <Route path='/usuarios' element={<AllUsers />}/>
            <Route path='/crear-publicacion' element={<CreatePost />}/>
            <Route path='/editar-publicacion/:id' element={<EditPost />}/>
            <Route path='/publicaciones/:id' element={<PostDetails />}/>
            <Route path='/perfil/:id/*' element={<Profile />}/>
            <Route path='/editar-perfil/:id' element={<UpdateProfile />}/>
          </Route>

        </Routes>
        <Toaster   />
    </main>
  )
}

export default App