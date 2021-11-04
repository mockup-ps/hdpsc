import {React, useState} from 'react'
import {CRow, CCol, CFormGroup, CLabel, CInput, CSelect, CInputCheckbox} from '@coreui/react'
import { useDispatch, useSelector } from 'react-redux'

const DataInspeksi = (props) =>{
    const dispatch = useDispatch()
    const forma = useSelector((state)=>state.forma)
    const [datacheck, setDatacheck] = useState(false)
    const handleChange= (e) => {
        let copyforma = {...forma}
        const name = e.target.name
        if (name == 'deficiencies' || name == 'shipdetained' || name == 'supportdocument'){
            copyforma[e.target.name]=e.target.checked
            dispatch({type:'set', forma:copyforma})
            console.log(forma)
        } else {
            copyforma[e.target.name]=e.target.value
            dispatch({type:'set', forma:copyforma})
            console.log(forma)            
        }
    }
    return(
        <div className="mt-3">
        <CRow>
            <CCol md="6">
                <CFormGroup>
                    <CLabel>Tanggal Inspeksi</CLabel>
                    <CInput disabled={props.disabled} onChange={(e)=>handleChange(e)} value={forma.tglinspeksi} name="tglinspeksi" type="date"/>
                </CFormGroup>                    
            </CCol>
            <CCol md="6">
                <CFormGroup>
                    <CLabel>Tempat Inspeksi</CLabel>
                    <CInput disabled={props.disabled} onChange={(e)=>handleChange(e)} value={forma.tempatinspeksi} name="tempatinspeksi"/>
                </CFormGroup>                
            </CCol>                                 
        </CRow>
        <CRow>                                   
        </CRow>
        <CRow>
            <CCol md="12">
                <CFormGroup>
                    <CLabel>Classification Society</CLabel>
                    <CInput disabled={props.disabled} onChange={(e)=>handleChange(e)} value={forma.classificationsociety} name="classificationsociety"/>
                </CFormGroup>                
            </CCol>                    
        </CRow>
        <CRow>
            <CCol md="4">
                <CLabel>Deficiencies</CLabel>
            </CCol>
            <CCol md="3">
                <CFormGroup variant="custom-checkbox" inline>
                    <CInputCheckbox disabled={props.disabled} onChange={(e)=>handleChange(e)} checked={forma.deficiencies} custom id="deficiencies" name="deficiencies"/>
                    <CLabel variant="custom-checkbox" htmlFor="deficiencies">Yes</CLabel>
                </CFormGroup>
            </CCol>                    
        </CRow>
        <CRow>
            <CCol md="4">
                <CLabel>Ship Detained</CLabel>
            </CCol>
            <CCol md="3">
                <CFormGroup variant="custom-checkbox" inline>
                    <CInputCheckbox disabled={props.disabled} onChange={(e)=>handleChange(e)} checked={forma.shipdetained} custom id="shipdetained" name="shipdetained"/>
                    <CLabel variant="custom-checkbox" htmlFor="shipdetained">Yes</CLabel>
                </CFormGroup>
            </CCol>                    
        </CRow>
        <CRow>
            <CCol md="4">
                <CLabel>Supporting Documentation</CLabel>
            </CCol>
            <CCol md="3">
                <CFormGroup variant="custom-checkbox" inline>
                    <CInputCheckbox disabled={props.disabled} onChange={(e)=>handleChange(e)} checked={forma.supportdocument} custom id="supportdocument" name="supportdocument"/>
                    <CLabel variant="custom-checkbox" htmlFor="supportdocument">Yes</CLabel>
                </CFormGroup>
            </CCol>                    
        </CRow>                                                          
        </div> 
    )
}

export default DataInspeksi