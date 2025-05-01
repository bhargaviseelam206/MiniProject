import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import App from './App.jsx';
import Home from './components/Home.jsx';
import Login from './components/Login.jsx';
import Signup from './components/Signup.jsx';
import DonorDashboard from './components/DonorDashboard.jsx';
import AdminDashboard from './components/AdminDashboard.jsx';
import AgentDashboard from './components/AgentDashboard.jsx';
import DonationForm from './components/DonationForm.jsx';
import PreviousDonations from './components/PreviousDonations.jsx';
import Feedback from './components/Feedback.jsx';
import AboutUs from './components/Aboutus.jsx';
import Corousel from './components/Corousel.jsx';
import CreateCampign from './components/CreateCampign.jsx';
import Orphanages from './components/Orphanages.jsx';
import ExplorePage from './components/ExplorePage.jsx';
import ODonate from './components/ODonate.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [

      { path: '/', element: <Home /> },
      { path: '/login', element: <Login /> },
      { path: '/signup', element: <Signup /> },
      { path: '/donor-dashboard', element: <DonorDashboard /> },
      {path:'/admin-dashboard',element:<AdminDashboard/>},
      {path:'/donor-dashboard',element:<DonorDashboard/>},
      {path:'/agent-dashboard',element:<AgentDashboard/>},
      {path:"/donation",element:<DonationForm/>},
      {path:"/previous-donations",element:<PreviousDonations/>},
      {path:"/feedback" ,element:<Feedback/>},
      {path:"/aboutus" ,element:<AboutUs/>},
      {path:"/",element:<Corousel/>},
      {path:"/create-campaign",element:<CreateCampign/>},
      {path:"/Orphanages",element:<Orphanages />},
      {path:"/explore",element:<ExplorePage/>},
      {path:"/donations",element:<ODonate />}

    ],
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
