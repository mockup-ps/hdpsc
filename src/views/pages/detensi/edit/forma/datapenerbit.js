import {React} from 'react'
import {CRow, CCol, CFormGroup, CLabel, CInput} from '@coreui/react'
import { useDispatch, useSelector } from 'react-redux'

const DataPenerbit = () =>{
    const dispatch = useDispatch()
    const forma = useSelector((state)=>state.forma)
    const handleChange = (e) =>{
        let copyforma = {...forma}
        copyforma[e.target.name]=e.target.value
        dispatch({type:'set', forma:copyforma})
    } 
    return(
        <div className="mt-3">
            <CRow>
                <CCol md="12">
                    <CFormGroup>
                        <CLabel>Issuing Office</CLabel>
                        <CInput name="issuingoffice" value={forma.issuingoffice} onChange={(e)=>handleChange(e)} />
                    </CFormGroup>                    
                </CCol>                                
            </CRow>
            <CRow>
                <CCol md="6">
                    <CFormGroup>
                        <CLabel>Telephone</CLabel>
                        <CInput name="telephone" value={forma.telephone} onChange={(e)=>handleChange(e)}/>
                    </CFormGroup>                
                </CCol>
                <CCol md="6">
                    <CFormGroup>
                        <CLabel>Telefax</CLabel>
                        <CInput name="telefax" value={forma.telefax} onChange={(e)=>handleChange(e)}/>
                    </CFormGroup>                
                </CCol>                                 
            </CRow>
            <CRow>
                <CCol md="12">
                    <CFormGroup>
                        <CLabel>Nama PSOC</CLabel>
                        <CInput name="namapsoc" value={forma.namapsoc} onChange={(e)=>handleChange(e)}/>
                    </CFormGroup>                    
                </CCol>                                
            </CRow>            
        </div>
    )
}

export default DataPenerbit