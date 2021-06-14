import {React, useEffect} from 'react'
import {
  TheContent,
  TheSidebar,
  TheFooter,
  TheHeader
} from './index'
import { useDispatch } from 'react-redux'

const TheLayout = () => {
  const dispatch = useDispatch()  
  useEffect(() => {
      const simView = localStorage.getItem('simView')
      if(simView){
        dispatch({ type: 'set', simView: simView })
      } else {
        dispatch({ type: 'set', simView: 1 })
      }  
  },[]);  
  return (
    <div className="c-app c-default-layout">
      {/* <TheSidebar/> */}
      <div className="c-wrapper">
        <TheHeader/>
        <div className="c-body">
          <TheContent/>
        </div>
        <TheFooter/>
      </div>
    </div>
  )
}

export default TheLayout
