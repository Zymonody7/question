import React from 'react'
import { createBrowserRouter } from 'react-router-dom'
import MainLayout from '../Layouts/MainLayout'
import ManagerLayout from '../Layouts/ManagerLayout'
import QuestionLayout from '../Layouts/QuestionLayout'
import Home from '../pages/Home'
import Login from '../pages/Login'
import Register from '../pages/Register'
import List from '../pages/manager/List'
import Trash from '../pages/manager/Trash'
import Star from '../pages/manager/Star'
import Edit from '../pages/Question/Edit'
import Stat from '../pages/Question/Stat'
import NotFound from '../pages/NotFound'

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout></MainLayout>,
    children: [
      {
        path: '/',
        element: <Home></Home>
      },
      {
        path: 'login',
        element: <Login></Login>
      },
      {
        path: 'register',
        element: <Register></Register>
      },
      {
        path: 'manager',
        element: <ManagerLayout></ManagerLayout>,
        children: [
          {
            path: 'list',
            element: <List></List>
          },
          {
            path: 'star',
            element: <Star></Star>
          },
          {
            path: 'trash',
            element: <Trash></Trash>
          }
        ]
      },
      {
        path: '*',
        element: <NotFound></NotFound>
      }
    ]
  },
  {
    path: 'question',
    element: <QuestionLayout></QuestionLayout>,
    children: [
      {
        path: 'edit/:id',
        element: <Edit></Edit>
      },
      {
        path: 'stat/:id',
        element: <Stat></Stat>
      }
    ]
  }
])

export default router

export const HOME_PATHNAME = '/'
export const LOGIN_PATHNAME = '/login'
export const REGISTER_PATHNAME = '/register'
export const MANAGER_INDEX_PATHNAME = '/manager'

export function isLoginOrRegister(pathname: string) {
  if ([LOGIN_PATHNAME, REGISTER_PATHNAME].includes(pathname)) {
    return true
  }
  return false
}

export function isNoNeedUserInfo(pathname: string) {
  if ([HOME_PATHNAME, LOGIN_PATHNAME, REGISTER_PATHNAME].includes(pathname)) {
    return true
  }
  return false
}
