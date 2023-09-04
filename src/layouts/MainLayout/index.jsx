import React from 'react'
import HeaderCompunent from '../../components/HearderCompunent'
import SideBar from '../../components/SideBar'
import "./style.scss"
import {Outlet} from "react-router-dom"

const MainLayout = () => {
  return (
    <div className='main-layout-container'>
        <HeaderCompunent/>
        <div className='main-layout-container__content'>
            <SideBar/>
            <div className='right-side'>
              <Outlet/>
            </div>
        </div>
    </div>
  )
}

export default MainLayout