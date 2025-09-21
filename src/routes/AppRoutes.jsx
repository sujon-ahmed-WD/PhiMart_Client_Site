import { Route, Routes } from 'react-router-dom';
import About from '../Pages/Home';
import MainLayout from '../Layouts/MainLayout';
import Home from '../Pages/Home';
const AppRoutes = () => {
    return (
            <Routes>
                <Route element={<MainLayout/>}> 
                    <Route path='/' element={<Home/>}/>
                    <Route path="about" element={<About/>}/>
                </Route>
                
            </Routes>
    );
};

export default AppRoutes;