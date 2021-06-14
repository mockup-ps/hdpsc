import { React} from 'react'
import { CCard, CCardBody,CRow, CCol, CContainer, CSelect } from '@coreui/react'
import {ReactComponent as MenuKapal} from '../../../assets/menukapal2.svg'
import {ReactComponent as MenuDashboard} from '../../../assets/menudashboard.svg'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from "react-router-dom";

const Beranda = (props) =>{
    const dispatch = useDispatch()
    const simView = useSelector((state) => state.simView)
    const handleSetView = (e) =>{
        localStorage.setItem("simView", e.target.value)
        dispatch({ type: 'set', simView: e.target.value })
    }    
    const arrWarna = ["#02275d","#c84b31", "#939b62","#f5a962","#1768ac"]
    let history = useHistory();
    return(
        <>
        <div className="d-flex flex-row mb-4 justify-content-end">
            <div className="d-flex align-items-center mx-3">
                Simulated view as :           
            </div>
            <div>
                <CSelect value={simView} onChange={(e)=>handleSetView(e)} style={{width:"10vw"}} aria-label="Default select example">
                <option value="1">Dit. KPLP</option>
                <option value="2">Dit. KAPEL</option>
                <option value="3">BKI</option>
                <option value="4">Kemenlu</option>
                <option value="5">Kemenkomarves</option>
                </CSelect>              
            </div>               
        </div>                      
        <div className="d-flex">
            <CCard onClick={() => history.push('/hdpsc')} role="button" className="jos" style={{marginRight:'1em', minWidth:'30vw', height:'30vh', backgroundColor:arrWarna[simView-1], color:'white', borderRadius:'20px'}}>
                <CCardBody>
                <CContainer>
                    <CRow>
                        <CCol sm='9'>
                            <h2>3/5</h2>
                            <p style={{color:'white'}}>Detensi telah selesai</p>                     
                        </CCol>
                        <CCol style={{height:'50%'}} sm='3'>
                            <MenuKapal/>
                        </CCol>                   
                    </CRow>
                    <CRow className="mt-2">
                        <CCol sm="12">
                            <h5><b><i>Help Desk Port State Control</i></b> </h5>                             
                        </CCol>
                    </CRow>
                    </CContainer>                
                </CCardBody>
            </CCard>    
            <CCard onClick={() => history.push('/monitoring')} role="button" className="jos" style={{minWidth:'30vw', height:'30vh', backgroundColor:arrWarna[simView-1], color:'white', borderRadius:'20px'}}>
                <CCardBody>
                <CContainer>
                    <CRow>
                        <CCol sm='9'>
                            <h2>5</h2>
                            <p style={{color:'white'}}>Data Detensi</p>                      
                        </CCol>
                        <CCol sm='3'>
                            <MenuDashboard/>
                        </CCol>                   
                    </CRow>
                    <CRow className="mt-2">
                        <CCol sm="12">
                            <h5><b>Monitoring Detensi Kapal</b> </h5>                             
                        </CCol>
                    </CRow>                    
                    </CContainer>                
                </CCardBody>
            </CCard>                        
        </div>   
        </>
    )
}
export default Beranda