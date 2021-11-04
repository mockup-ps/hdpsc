import { CCardHeader, CCard, CCardBody, CDataTable, CBadge, CButton, CCollapse, CCol, CRow, CModal, CModalHeader, CModalBody, CModalFooter, CFormGroup, CLabel, CInput, CSelect } from '@coreui/react'
import {React, useEffect, useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import supabase from '../../../supabase'
import {Edit, ViewOnly, ViewAndCAP, ViewAndMonitor} from './actionComponent'
import { useHistory } from "react-router-dom";
import Swal from 'sweetalert2'

const Viavalen = () =>{
    const dispatch = useDispatch()
    const arrView = ["Direktorat KPLP", "Direktorat KAPEL", "BKI","Kemenlu", "Kemenkomarves"] 
    let history = useHistory()
    const [data, setData] = useState([])
    const [details, setDetails] = useState([])
    const arrWarna = ["success","primary","warning","info", "danger", "light"]
    const [modal, setModal] = useState(false)
    const simView = useSelector((state)=>state.simView)
    const [field, setField] = useState({})
    const handleChange = (e) =>{
        setField({...field, [e.target.name]:e.target.value})
    }
    const validasiDuplikat = async () =>{
        if (field.imokapal && field.tgldetensi){
            let { data: td_detensi, error } = await supabase
            .from('td_detensi')
            .select("*")
            .eq('data->imokapal', JSON.stringify(field.imokapal))
            .eq('data->tgldetensi', JSON.stringify(field.tgldetensi))
            if (td_detensi.length){
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Data Detensi tersebut Sudah Pernah Diajukan Sebelumnya'
                  })
            } else {
                let initial = {}
                initial.imokapal = field.imokapal
                initial.tgldetensi = field.tgldetensi
                dispatch({type:'set', initial: initial})               
                Swal.fire({
                  icon: 'success',                    
                  title: 'Validasi Sukses',
                  html: 'Anda Akan Diarahkan ke Halaman Selanjutnya',
                  timer: 1500,
                  timerProgressBar: true
                }).then((result) => {
                    history.push('/hdpsc/new')
                })                
            }           
        } else {
            console.log(field.imokapal, field.tgldetensi)
        }
    }
    const toggleDetails = (index) => {
        const position = details.indexOf(index)
        let newDetails = details.slice()
        if (position !== -1) {
          newDetails.splice(position, 1)
        } else {
          newDetails = [...details, index]
        }
        setDetails(newDetails)
      } 
    useEffect(async () => {
        const detensi = await supabase
        .from('td_detensi')
        .select(`
            id_detensi,
            data,
            fl_lock,
            locked_by,
            tr_status (
                kd_status,
                ur_status
            ),
            th_detensi (
                kd_status,
                created_at,
                createdby,
                locked_by
            )
        `)          
        const urstatus = await supabase
        .from('tr_status')
        .select(`
            kd_status,
            ur_status
        `)         
        let datas = detensi.data.map(x=>{
            return(
                {['id_detensi']:x.id_detensi, ...x.data, ...x.tr_status, ['histori']:x.th_detensi, ['locked_by']:x.locked_by, ['fl_lock']:x.fl_lock}
            )
        })
        setData(datas)   
        console.log(urstatus)
      },[]);      
    return(
        <>
        {/* history.push('/hdpsc/new') */}
        <CModal
        show={modal}
        onClose={()=>setModal(false)}
        >
            <CModalHeader>
                <h5>Masukkan Data Awal</h5>
            </CModalHeader>
            <CModalBody>               
                <CRow>
                    <CCol md="12">
                        <CFormGroup>
                            <CLabel>Nomor IMO Kapal</CLabel>
                            <CInput value={field.imokapal} name="imokapal" onChange={(e)=>handleChange(e)} type="text"/>
                        </CFormGroup>
                    </CCol>
                </CRow>
                <CRow>
                    <CCol md="12">
                        <CFormGroup>
                            <CLabel>Tanggal Detensi</CLabel>
                            <CInput value={field.tgldetensi} name="tgldetensi" onChange={(e)=>handleChange(e)} type="date"/>
                        </CFormGroup>
                    </CCol>
                </CRow>                
            </CModalBody>
            <CModalFooter>
                <div className="d-flex justify-content-end">
                    <div className="mr-2">
                        <CButton onClick={()=>validasiDuplikat()} color="success">Lanjutkan</CButton>
                    </div>
                    <div className="mr-2">
                        <CButton onClick={()=>setModal(false)} color="danger">Batal</CButton>
                    </div>                    
                </div>
            </CModalFooter>
        </CModal>
        <CCard>
            <CCardHeader>
                <h5>Data Detensi Kapal</h5>
            </CCardHeader>          
            <CCardBody>
                {
                    simView == 1 || simView == 2 || simView == 3 ?
                    <>
                        <div className="d-flex justify-content-end mb-2">
                            <CButton onClick={()=>setModal(true)} className="btn btn-info">
                                Buat Baru <i class="fas fa-plus"></i>
                            </CButton>
                        </div>  
                    </>
                    :
                    <></>                                        
                }                
                <CDataTable
                addTableClasses="josss"
                items={data}
                fields={[
                    { key: 'no', label: 'No', _style: { width: '5%'} },
                    { key: 'namakapal', label: 'Nama Kapal' },
                    { key: 'imokapal', label: 'Nomor IMO Kapal' },
                    { key: 'tgldetensi', label: 'Tanggal Detensi' },
                    { key: 'status', label: 'Status' }, 
                    { key: 'lock', label: 'Available ?', _style: { width: '15%'}},                    
                    { key: 'action', label: 'Action' }                                        
                ]}
                scopedSlots={{
                    'lock':
                    (item, index) =>{
                    let locked
                    let locker 
                    if (item.locked_by == simView){
                        locker="Me"
                    } else {
                        locker=arrView[item.locked_by-1]
                    }
                    if(item.fl_lock){
                        locked = "Checked Out by "+locker
                    } else {
                        locked = "Available"
                    }
                    return(
                        <td>
                            {locked}
                        </td>
                    )
                    },
                    'no':
                    (item, index)=>{
                        return(
                            <td>
                                {index+1}
                            </td>
                        )
                    },
                    'status':
                    (item, index) =>{
                        return(
                            <td>
                                <CBadge onClick={()=>{toggleDetails(index)}} role="button" color={arrWarna[parseInt(item.kd_status)-1]}>
                                    {item.ur_status}                                
                                </CBadge>
                            </td>
                        )
                    },
                    'action':
                    (item, index) =>{
                        console.log(item)
                        console.log()
                        let locker = arrView[item.locked_by-1]
                        let locked
                        if (item.fl_lock){
                            if (item.locked_by == simView){
                                locked = false
                            } else {
                                locked = true
                            }
                        } else {
                            locked = false
                        }
                        return(
                            <td>
                                {
                                    (simView == 1 || simView == 2 || simView == 3) && item.kd_status == 3 ?
                                    <ViewAndCAP datadetensi={item} datadetensi={item}/>
                                    :                                  
                                    (simView == 1 || simView == 2 || simView == 3) && item.kd_status != 4 ?
                                    <Edit  fl_lock={item.fl_lock} locker={locker} disabled={locked} datadetensi={item} />
                                    :
                                    (simView == 1 || simView == 2 || simView == 3) && item.kd_status == 4 ?
                                    <ViewAndCAP datadetensi={item} datadetensi={item}/>
                                    :
                                    <ViewOnly/>
                                }                                
                            </td>
                        )
                    },
                    'details':
                    (item, index) =>{
                        console.log(item)
                        return(
                            <CCollapse show={details.includes(index)}>
                                {item.histori.map(x=>{
                                    let date = new Date(x.created_at)
                                    let hari = date.getDate()
                                    let bulan = date.getMonth() + 1
                                    let tahun = date.getFullYear()
                                    let jam = date.getHours()
                                    let menit = date.getMinutes()
                                    let detik = date.getSeconds()
                                    return(
                                        <div className="d-flex flex-row justify-content-end mx-3 my-3">
                                            <div className="d-flex flex-column justify-content-center mr-2">
                                                <CBadge color={arrWarna[parseInt(x.kd_status)-1]}>
                                                    {
                                                        x.kd_status == 1 ?
                                                        "Initial Info"
                                                        :
                                                        x.kd_status == 2 ?
                                                        "Cetakan Form A & B"
                                                        :
                                                        x.kd_status == 3 ?
                                                        "Data Elektronik Form A & B"
                                                        :
                                                        x.kd_status == 4 ?
                                                        "Input Tanggal Release"
                                                        :
                                                        ""
                                                    }                                                    
                                                </CBadge>
                                            </div>
                                            <div style={{minWidth:"15vw"}} className="d-flex flex-column">
                                                {hari.toString().length == 1 ? "0"+hari : hari}-{bulan.toString().length == 1 ? "0"+bulan : bulan}-{tahun}{' '}{jam}:{menit}:{detik}
                                            </div> 
                                            <div style={{minWidth:"15vw"}} className="d-flex flex-column">
                                                {arrView[parseInt(x.createdby)-1]}
                                            </div>                                                                                
                                        </div>                                        
                                    )
                                })}
                            </CCollapse>                            
                        )
                    }
                }}
                />
            </CCardBody>
        </CCard>
        </>
    )
}

export default Viavalen