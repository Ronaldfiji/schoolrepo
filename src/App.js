
import './App.css';
import Header from './module/layout/Header';
import Footer from './module/layout/Footer';
import { Fragment } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Home from './module/layout/Home';
import Layout from '../src/module/layout/Layout'
import About from '../src/module/layout/About'
import PersistLogin from '../src/shared/component/PersistLogin';
import Login from '../src/module/user/component/Login'
import Signup from '../src/module/user/component/Signup'
import Profile from '../src/module/user/component/Profile';
import PageNotFound from '../src/module/layout/PageNotFound';
import Unauthorized from '../src/shared/component/Unauthorized';
import RequireAuth from './shared/component/RequireAuth';
import Users from './module/admin/component/users/User';
import EditUser from './module/admin/component/users/Edituser';
import Enrollment  from './module/school/component/Enrollment';
import Grades from './module/school/component/Grades';

const ROLES = {
  'User': 'User',
  'Editor': 1984,
  'Admin': 'Admin',
  'Manager': 'Manager'
}

function App() {
  return (
    <Fragment>
      <Header />
      <Routes>
        {/* Public routes */}
        <Route path={"/"} element={<Home />} />
        <Route path="/" element={<Layout />}>
          
          <Route path={'/aboutus'} element={<About />} />
          <Route path={'/user/login'} element={<Login />} />
          <Route path={'/user/signup'} element={<Signup />} /> 
          <Route path="unauthorized" element={<Unauthorized />} />

          <Route element={<PersistLogin />}>
            <Route path={'/user/profile'} element={<Profile />} />
            <Route path={'/user/enrollment'} element={<Enrollment/>} />
            <Route path={'/user/grades'} element={<Grades/>} />
          </Route>

         {/* wrap persistent route to admin module to refresh user if app is refreshed */}
          <Route element={<RequireAuth allowedRoles={[ROLES.Manager, ROLES.Admin]} />}>            
            <Route path={'/admin/users'} element={<Users />} />            
            <Route path={"/admin/user/edit/:userid"} element={<EditUser />} />   
          </Route>

          {/* catch all */}
          <Route path={"*"} element={<PageNotFound />} />
        </Route>


      </Routes>
     
      <Footer />
    </Fragment>
  );
}

export default App;
