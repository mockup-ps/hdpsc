import {React, useState, useEffect} from 'react'
import supabase from '../../../../../supabase'
import {CRow, CCol, CFormGroup, CLabel, CInput, CSelect} from '@coreui/react'
import { useDispatch, useSelector } from 'react-redux'

const DataKapal = (props) =>{
    const [negara, setNegara] = useState([]) 
    const dispatch = useDispatch()
    const forma = useSelector((state)=>state.forma)    
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
                    <CSelect name="otoritaspsc" onChange={(e)=>handlechange(e)} value={forma.otoritaspsc}>
                        {
                            negara.map((x)=>{
                                return(
                                    <option value={x.kd_negara}>{x.ur_negara}</option>
                                )
                            })
                        }
                    </CSelect>
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
                    <CSelect onChange={(e)=>handlechange(e)} name="tipekapal" value={forma.tipekapal}>
                        <option value="1">Gas Carrier</option> 
                        <option value="2">Oil Tanker</option> 
                        <option value="3">Bulk Carrier</option> 
                        <option value="4">General Cargo/Multipurpose</option> 
                    </CSelect>
                </CFormGroup>                
            </CCol>                                     
        </CRow>  
        <CRow>
            <CCol md="4">
                <CFormGroup>
                    <CLabel>Call Sign</CLabel>
                    <CInput onChange={(e)=>handlechange(e)} name="callsign" value={forma.callsign}/>
                </CFormGroup>                
            </CCol>  
            <CCol md="4">
                <CFormGroup>
                    <CLabel>Nomor MMSI</CLabel>
                    <CInput onChange={(e)=>handlechange(e)} name="nommsi" value={forma.nommsi}/>
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
                    <CInput onChange={(e)=>handlechange(e)} name="grosstonage" value={forma.grosstonage}/>
                </CFormGroup>                
            </CCol>  
            <CCol md="4">
                <CFormGroup>
                    <CLabel>Dead Weight</CLabel>
                    <CInput onChange={(e)=>handlechange(e)} name="deadweight" value={forma.deadweight}/>
                </CFormGroup>                
            </CCol>  
            <CCol md="4">
                <CFormGroup>
                    <CLabel>Tanggal Keel Laid</CLabel>
                    <CInput onChange={(e)=>handlechange(e)} name="tglkeellaid" value={forma.tglkeellaid} type="date"/>
                </CFormGroup>                
            </CCol>                                                        
        </CRow>                                
        </div>         
    )    
}

export default DataKapal