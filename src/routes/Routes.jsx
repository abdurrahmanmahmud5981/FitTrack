import {createBrowserRouter} from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import Home from '../pages/Home';
import AllTrainer from '../pages/AllTrainer';
import AllClasses from '../pages/AllClasses';
import Community from '../pages/Community';

const router = createBrowserRouter([
    {
        path: '/',
        errorElement: 'error',
        element: <MainLayout/>,
        children:[
            {path: '', element: <Home/>},
            {path: '/allTrainer', element: <AllTrainer/>},
            {path: '/allClasses', element: <AllClasses/>},
            {path: '/community', element: <Community/>},
        ],
    },
    {
        path: '/dashboard',
        element: ''  // Default route for unknown paths
    }
   
])

export default router;