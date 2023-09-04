import React from 'react'
import "./style.scss"
import {Link, useLocation} from 'react-router-dom'
import { ROUTES } from '../../constants/routes'
const SideBar = () => {
  const location=useLocation
  return (
    <div className='sidebar-container'>
     <ul className='sidebar-container__list'>
        <li
         className={`sidebar-container__list-item ${ROUTES.ALL_TASK.includes(location.pathname)?"active":""}`}>
           <Link to={ROUTES.ALL_TASK}>ALL TASKS</Link>
        </li>
        <li className={`sidebar-container__list-item ${ROUTES.NEW_TASK.includes(location.pathname)?"active":""}`}>
        <Link to={ROUTES.NEW_TASK}>NEWTASKS</Link>
        </li>
        <li className={`sidebar-container__list-item ${ROUTES.DOING_TASK.includes(location.pathname)?"active":""}`}>
        <Link to={ROUTES.DOING_TASK}>DOINGTASKS</Link>
        </li>
        <li className={`sidebar-container__list-item ${ROUTES.DONE_TASK.includes(location.pathname)?"active":""}`}>
        <Link to={ROUTES.DONE_TASK}>DONETASKS</Link>
        </li>
     </ul>
    </div>
  )
}

export default SideBar