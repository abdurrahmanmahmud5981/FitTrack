import {createBrowserRouter} from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import Home from '../pages/Home';
import AllTrainer from '../pages/AllTrainer';
import AllClasses from '../pages/AllClasses';
import Community from '../pages/Community';
import Login from '../pages/Login/Login';
import Register from '../pages/Register/Register';
import TrainerDetails from '../pages/TrainerDetails';
import TrainerBooking from '../pages/TrainerBooking';
import DashboardLayout from '../layouts/DashboardLayout';
import UserProfile from '../pages/UserProfile';
import AddNewSlot from '../pages/DashBoard/Trainer/AddSlot/AddNewSlot';
import AddNewClass from '../pages/DashBoard/Admin/AddClass/AddNewClass';
import BeTrainer from '../pages/BeTrainer/BeTrainer';
import NewsletterSubscribers from '../pages/DashBoard/Admin/Subscribers/NewsletterSubscribers';
import AllTrainers from '../pages/DashBoard/Admin/AllTrainers/AllTrainers';

const router = createBrowserRouter([
    {
        path: '/',
        errorElement: 'error',
        element: <MainLayout/>,
        children:[
            {path: '', element: <Home/>},
            {path: '/allTrainer', element: <AllTrainer/>},
            {path: '/trainer/:id', element: <TrainerDetails/>},
            {path: '/become-a-trainer', element: <BeTrainer/>},
            {path: '/bookTrainer/:slot', element: <TrainerBooking/>},
            {path: '/allClasses', element: <AllClasses/>},
            {path: '/community', element: <Community/>},
            {path: '/login', element: <Login/>},
            {path: '/register', element: <Register/>},
        ],
    },
    {
        path: '/dashboard',
        element: <DashboardLayout/>,
        children:[
            // Add dashboard routes here
            // mamber routes
            {
                path: '/dashboard/profile',
                element: <UserProfile/>
            },
            // trainer routes
            {
                path: '/dashboard/add-new-slot',
                element: <AddNewSlot/>
            },
            // admin routes
            {
                path: '/dashboard/newsletter-subscribers',
                element: <NewsletterSubscribers/>
            },
            {
                path: '/dashboard/all-trainer',
                element: <AllTrainers/>
            },
            {
                path: '/dashboard/add-new-class',
                element: <AddNewClass/>
            }
        ],
    }
   
])

export default router;