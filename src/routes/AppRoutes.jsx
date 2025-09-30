import { Route, Routes } from 'react-router-dom';
import About from '../Pages/Home';
import MainLayout from '../Layouts/MainLayout';
import Home from '../Pages/Home';
import Shop from '../Pages/Shop';
import Login from '../Pages/Login';
import Register from '../Pages/Register';
import Dashboard from '../Pages/Dashboard';
const AppRoutes = () => {
    return (
            <Routes>
                <Route element={<MainLayout/>}> 
                    <Route path='/' element={<Home/>}/>
                    <Route path="about" element={<About/>}/>
                    <Route path="shop" element={<Shop/>}/>
                    <Route path="login" element={<Login/>}/>
                    <Route path="register" element={<Register/>}/>
                    <Route path="dashboard" element={<Dashboard/>}/>
                </Route>
                
            </Routes>
    );
};

export default AppRoutes;