import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import Home from './components/Home/Home.jsx';
import Signup from './components/Signup/Signup.jsx';
import Login from './components/Login/Login.jsx';
import QuestionsPage from './components/Questions/QuestionsPage.jsx';



const router=createBrowserRouter([
  {
    path: '/',
    element: <App/>,
    children: [
      {
         path: "/",
         element: <Home/>
      },
      {
        path: "signup",
        element: <Signup/>
      },
      {
        path: "login",
        element: <Login/>
      },
      {
        path: "quiz/:topicid",
        element: <QuestionsPage/>
      }
    ]
  }
])


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider  router={router}/>
  </React.StrictMode>,
)
