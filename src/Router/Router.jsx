import React from 'react';

import {
  createBrowserRouter,
} from "react-router";
import Home from '../Pages/Home';
import AllArtifacts from '../Pages/Allartifacts';
import AddArtifacts from '../Pages/AddArtifacts';
import Login from '../Pages/Login';
import Register from '../Pages/Register';
import MainLaOut from '../Layout/Mainlaout';
import PrivateRouter from '../PrivateRouter/PrivateRouter';
import ArtifactDetail from '../Pages/ArtiFactsDetails';

const Router = createBrowserRouter([
  {
    path: "/",
    Component:MainLaOut,
    children:[
    {index:true,Component:Home},
     {path:'allArtifacts',Component:AllArtifacts},
     {path:'addArtifacts',element:<PrivateRouter><AddArtifacts></AddArtifacts></PrivateRouter>},
     {path:'login',Component:Login},
     {path:'register',Component:Register},
    //  {path:"artifact/:id",Component:ArtifactDetails},
    { path:"artifacts/:id", element:<PrivateRouter><ArtifactDetail /></PrivateRouter> }

    ]
  },
]);

export default Router;