import {React, useState, useEffect} from 'react'
import supabase from '../../../../../supabase'
import {CRow, CCol, CFormGroup, CLabel, CInput, CSelect} from '@coreui/react'
import { useDispatch, useSelector } from 'react-redux'
import Select from 'react-select'

const DataKapal = (props) =>{
    const [negara, setNegara] = useState([]) 
    const dispatch = useDispatch()
    const forma = useSelector((state)=>state.forma)  
    const handleChangeSelect = (id, e) =>{
        let copyforma = {...forma}
        copyforma[e.name]=id
        dispatch({type:'set', forma:copyforma})
        console.log(forma)
    }  
    const handlechange= (e) => {
        let copyforma = {...forma}
        copyforma[e.target.name]=e.target.value
        dispatch({type:'set', forma:copyforma})
        console.log(forma)
    }
    useEffect(async() => { 
        const fetchNegara = async () =>{
            let { data: tr_negara, error } = await supabase
            .from('tr_negara')
            .select('*')    
            setNegara(tr_negara)        
        }
        fetchNegara()
    },[]);     
    return(
        <div className="mt-3">
        <CRow>
            <CCol md="6">
                <CFormGroup>
                    <CLabel>Otoritas PSC</CLabel>
                    <Select
                    isDisabled={props.disabled}
                    options={[
                        {
                            "value": "1",
                            "label": "Australia"
                          },
                          {
                            "value": "2",
                            "label": "Canada"
                          },
                          {
                            "value": "3",
                            "label": "Chile"
                          },
                          {
                            "value": "4",
                            "label": "China"
                          },
                          {
                            "value": "5",
                            "label": "Fiji"
                          },
                          {
                            "value": "6",
                            "label": "Hong Kong, China"
                          },
                          {
                            "value": "7",
                            "label": "Indonesia"
                          },
                          {
                            "value": "8",
                            "label": "Japan"
                          },
                          {
                            "value": "9",
                            "label": "Korea, Republic of"
                          },
                          {
                            "value": "10",
                            "label": "Malaysia"
                          },
                          {
                            "value": "11",
                            "label": "New Zealand"
                          },
                          {
                            "value": "12",
                            "label": "Papua New Guinea"
                          },
                          {
                            "value": "13",
                            "label": "Phillipines"
                          },
                          {
                            "value": "14",
                            "label": "Russia"
                          },
                          {
                            "value": "15",
                            "label": "Singapore"
                          },
                          {
                            "value": "16",
                            "label": "Thailand"
                          },
                          {
                            "value": "17",
                            "label": "Vanuatu"
                          },
                          {
                            "value": "18",
                            "label": "Vietnam"
                          }
                    ]} onChange={(id, e)=>handleChangeSelect(id, e)} name="otoritaspsc" value={forma.otoritaspsc}
                    />
                    {/* <CInput name="otoritaspsc" onChange={(e)=>handlechange(e)} value={forma.otoritaspsc}/> */}
                </CFormGroup>                    
            </CCol>                    
        </CRow>
        <CRow>
            <CCol md="6">
                <CFormGroup>
                    <CLabel>Nama Kapal</CLabel>
                    <CInput disabled value={forma.namakapal}/>
                </CFormGroup>                
            </CCol>
            <CCol md="6">
                <CFormGroup>
                    <CLabel>Tipe Kapal</CLabel>
                    <CInput disabled={props.disabled} onChange={(e)=>handlechange(e)} name="tipekapal" value={forma.tipekapal}/>
                    {/* <CSelect onChange={(e)=>handlechange(e)} name="tipekapal" value={forma.tipekapal}>
                        <option value="1">Gas Carrier</option> 
                        <option value="2">Oil Tanker</option> 
                        <option value="3">Bulk Carrier</option> 
                        <option value="4">General Cargo/Multipurpose</option> 
                    </CSelect> */}
                </CFormGroup>                
            </CCol>                                     
        </CRow>  
        <CRow>
            <CCol md="4">
                <CFormGroup>
                    <CLabel>Call Sign</CLabel>
                    <CInput disabled={props.disabled} onChange={(e)=>handlechange(e)} name="callsign" value={forma.callsign}/>
                </CFormGroup>                
            </CCol>  
            <CCol md="4">
                <CFormGroup>
                    <CLabel>Nomor MMSI</CLabel>
                    <CInput disabled={props.disabled} onChange={(e)=>handlechange(e)} name="nommsi" value={forma.nommsi}/>
                </CFormGroup>                
            </CCol>  
            <CCol md="4">
                <CFormGroup>
                    <CLabel>Nomor IMO</CLabel>
                    <CInput disabled value={forma.imokapal} />
                </CFormGroup>                
            </CCol>                                                        
        </CRow> 
        <CRow>
            <CCol md="4">
                <CFormGroup>
                    <CLabel>Gross Tonnage</CLabel>
                    <CInput disabled={props.disabled} onChange={(e)=>handlechange(e)} name="grosstonage" value={forma.grosstonage}/>
                </CFormGroup>                
            </CCol>  
            <CCol md="4">
                <CFormGroup>
                    <CLabel>Dead Weight</CLabel>
                    <CInput disabled={props.disabled} onChange={(e)=>handlechange(e)} name="deadweight" value={forma.deadweight}/>
                </CFormGroup>                
            </CCol>  
            <CCol md="4">
                <CFormGroup>
                    <CLabel>Tanggal Keel Laid</CLabel>
                    <CInput disabled={props.disabled} onChange={(e)=>handlechange(e)} name="tglkeellaid" value={forma.tglkeellaid} type="date"/>
                </CFormGroup>                
            </CCol>                                                        
        </CRow>                                
        </div>         
    )    
}

export default DataKapal