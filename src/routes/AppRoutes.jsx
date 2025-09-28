import { Route, Routes } from 'react-router-dom';
import About from '../Pages/Home';
import MainLayout from '../Layouts/MainLayout';
import Home from '../Pages/Home';
import Shop from '../Pages/Shop';
import Login from '../Pages/Login';
const AppRoutes = () => {
    return (
            <Routes>
                <Route element={<MainLayout/>}> 
                    <Route path='/' element={<Home/>}/>
                    <Route path="about" element={<About/>}/>
                    <Route path="shop" element={<Shop/>}/>
                    <Route path="login" element={<Login/>}/>
                </Route>
                
            </Routes>
    );
};

export default AppRoutes;