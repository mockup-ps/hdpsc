import { CCardBody, CCard, CFormGroup, CLabel, CInput, CRow , CCol, CButton} from '@coreui/react'
import {React , useState} from 'react'
import {ReactComponent as Initial} from '../../../../assets/icons/animate/svg/001-approved.svg'
import supabase from '../../../../supabase'
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';

const NewDetensi = () =>{
    const dispatch = useDispatch()
    let history = useHistory()
    const initial = useSelector((state)=>state.initial)
    const [data, setData] = useState(1)
    const [input, setInput]= useState({})
    const handleChangePage = (e) =>{
        setData(e)
        console.log(e)
    }
    const handleInputChange= (e) =>{
        let sementara = {...initial, [e.target.name]:e.target.value}
        dispatch({type:'set', initial:sementara})
    }
    const handleKirim = async () =>{
        if(!initial.namakapal || !initial.imokapal || !initial.tgldetensi){
            alert("Harap Dilengkapi")
        } else {
            const { data, error } = await supabase
            .from('td_detensi')
            .insert([
                { data: initial, kd_status : 1},
            ])
            const kirimHistori = await supabase
            .from('th_detensi')
            .insert([
                { id_detensi: data[0].id_detensi, data: initial, kd_status : 1},
            ])
            if (data.error || kirimHistori.error){
                alert("Error")
            } else {
                dispatch({type:'set', initial:{}})
                let datas = {['id_detensi']:data[0].id_detensi, ...data[0].data, ['kd_status']:data[0].kd_status} 
                dispatch({type:'set', datadetensi:datas})                               
                history.push('/hdpsc/edit')
            }
        }
    }
    return(
        <CCard>
            <CCardBody>
                <div className="d-flex flex-row justify-content-center mb-4">
                    <div onClick={()=>handleChangePage(1)} className="d-flex flex-column mr-5 align-items-center">
                        <Initial role="button" className={
                            data == 1 ?
                            "on"
                            :
                            "off"
                        } />
                        <div className="mt-1">
                            <b><h5>Initial Info</h5></b>
                        </div>
                    </div>
                </div>
                <CRow>
                    <CCol md="12">
                        <CRow>
                            <CCol md="12">
                                <CFormGroup>
                                    <CLabel><b>Nama Kapal</b></CLabel>
                                    <CInput name="namakapal" value={initial.namakapal} onChange={(e)=>handleInputChange(e)} />
                                </CFormGroup>                                
                            </CCol>                                
                        </CRow>
                        <CRow>
                            <CCol md="12">
                                <CFormGroup>
                                    <CLabel><b>Nomor IMO Kapal</b></CLabel>
                                    <CInput name="imokapal" value={initial.imokapal} onChange={(e)=>handleInputChange(e)}/>
                                </CFormGroup>                                
                            </CCol>                                
                        </CRow>  
                        <CRow>
                            <CCol md="12">
                                <CFormGroup>
                                    <CLabel><b>Tanggal Detensi</b></CLabel>
                                    <CInput name="tgldetensi" value={initial.tgldetensi} onChange={(e)=>handleInputChange(e)} type="date"/>
                                </CFormGroup>                                
                            </CCol>                                
                        </CRow>  
                        <CRow>
                            <CCol md="12">
                                <CFormGroup>
                                    <div className="d-flex justify-content-end">
                                        <div className="mr-2">
                                            <CButton onClick={()=>handleKirim()} color="success">Simpan</CButton>
                                        </div>
                                        <div className="mr-2">
                                            <CButton color="danger">Batal</CButton>
                                        </div>                                
                                    </div>                                     
                                </CFormGroup>
                            </CCol>
                        </CRow>                      
                    </CCol>
                    {/* <CCol className="d-flex align-items-center justify-content-center" md="6">
                        <div className="d-flex flex-column">
                            <div className="mb-2">
                                <input type="checkbox" className="mr-2"/>
                                Saya Menyatakan bahwa Data yang Saya Isikan adalah Benar                            
                            </div>
                            <div className="d-flex justify-content-center">
                                <div className="mr-2">
                                    <CButton onClick={()=>handleKirim()} color="success">Simpan</CButton>
                                </div>
                                <div className="mr-2">
                                    <CButton color="danger">Batal</CButton>
                                </div>                                
                            </div>                            
                        </div>
                    </CCol> */}
                </CRow>                              
            </CCardBody>
        </CCard>
    )
}

export default NewDetensi