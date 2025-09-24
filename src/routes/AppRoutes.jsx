import { Route, Routes } from 'react-router-dom';
import About from '../Pages/Home';
import MainLayout from '../Layouts/MainLayout';
import Home from '../Pages/Home';
import Shop from '../Pages/Shop';
const AppRoutes = () => {
    return (
            <Routes>
                <Route element={<MainLayout/>}> 
                    <Route path='/' element={<Home/>}/>
                    <Route path="about" element={<About/>}/>
                    <Route path="shop" element={<Shop/>}/>
                </Route>
                
            </Routes>
    );
};

export default AppRoutes;