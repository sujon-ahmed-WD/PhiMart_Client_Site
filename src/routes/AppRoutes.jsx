import { Route, Routes } from 'react-router-dom';
import About from '../Pages/Home';
import MainLayout from '../Layouts/MainLayout';
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