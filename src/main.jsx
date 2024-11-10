import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import './index.css'
const router = createBrowserRouter([
  {
    path: "/",
    element: <Root></Root>,
    children:[
      {
        path:"/",
        element: <Home></Home>
      },
      {
        path: "/routine",
        element: <Routine></Routine>
      },
      {
        path: "/resources",
        element: <Resources></Resources>
      },
      {
        path: "/questionBank",
        element: <QuestionBank></QuestionBank>
      },
      {
        path: "/upcoming",
        element: <Upcoming></Upcoming>
      },
    ]
  },
]);
import Root from './Components/root/Root.jsx';
import Home from './Components/home/Home.jsx';
import Routine from './Components/routine/Routine.jsx';
import Resources from './Components/resources/Resources.jsx';
import QuestionBank from './Components/questionBank/QuestionBank.jsx';
import Upcoming from './Components/upcoming/Upcoming.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />

  </StrictMode>,
)
