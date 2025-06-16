import React from 'react';
import { createBrowserRouter } from "react-router"; 
import Home from '../Pages/Home';
import AllArtifacts from '../Pages/Allartifacts';
import AddArtifacts from '../Pages/AddArtifacts';
import Login from '../Pages/Login';
import Register from '../Pages/Register';
import MainLayout from '../Layout/Mainlaout'; 
import PrivateRoute from '../PrivateRouter/PrivateRouter';
import ArtifactDetail from '../Pages/ArtiFactsDetails';
import MyArtifacts from '../Pages/MyArtiFacts';
import UpdateArtifact from '../Pages/UpdateArtifacts';
import NotFound from '../Pages/NotFound';

const Router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />, 
    // errorElement: <ErrorPage />,
    children: [
      {
        index: true, 
        element: <Home />, 
      },
      {
        path: 'allArtifacts',
        element: <AllArtifacts />, 
      },
      {
        path: 'addArtifacts',
        element: (
          <PrivateRoute>
            <AddArtifacts />
          </PrivateRoute>
        ),
      },
      {
        path: 'login',
        element: <Login />, 
      },
      {
        path: 'register',
        element: <Register />,
      },
      {
        path: "artifacts/:id",
        element: (
          <PrivateRoute>
            <ArtifactDetail />
          </PrivateRoute>
        ),
      },
      {
        path:"/my-artifacts",
        element:<PrivateRoute><MyArtifacts></MyArtifacts></PrivateRoute>
      },
      {
  path: "/update/:id",
  element: <PrivateRoute><UpdateArtifact></UpdateArtifact></PrivateRoute>,
}
,

      {
        path: "*",
        element: <NotFound></NotFound>,
      }
    ],
  },

]);

export default Router;
