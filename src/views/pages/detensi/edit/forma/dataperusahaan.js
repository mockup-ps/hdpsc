import {React} from 'react'
import {CRow, CCol, CFormGroup, CLabel, CInput, CSelect} from '@coreui/react'
import { useDispatch, useSelector } from 'react-redux'

const DataPerusahaan = () =>{
    const dispatch = useDispatch()
    const forma = useSelector((state)=>state.forma)
    const handleChange = (e) => {
        let copyforma = {...forma}
        copyforma[e.target.name]=e.target.value
        dispatch({type:'set', forma:copyforma})
    }
    return(
        <div className="mt-3">
        <CRow>
            <CCol md="6">
                <CFormGroup>
                    <CLabel>IMO Company Number</CLabel>
                    <CInput name="imocompany" value={forma.imocompany} onChange={(e)=>handleChange(e)}/>
                </CFormGroup>                    
            </CCol>
            <CCol md="6">
                <CFormGroup>
                    <CLabel>Particulars of Company</CLabel>
                    <CInput name="particulars" value={forma.particulars} onChange={(e)=>handleChange(e)}/>
                </CFormGroup>                
            </CCol>                                 
        </CRow>
        <CRow>
            <CCol md="12">
                <CFormGroup>
                    <CLabel>Name of Master</CLabel>
                    <CInput name="nameofmaster" value={forma.nameofmaster} onChange={(e)=>handleChange(e)}/>
                </CFormGroup>                
            </CCol>                     
        </CRow>  
        </div>
    )
}

export default DataPerusahaan