import { CCardHeader, CCard, CCardBody, CDataTable, CBadge, CButton, CCollapse, CCol, CRow} from '@coreui/react'
import {React, useEffect, useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import supabase from '../../../supabase'
import {ViewAndEdit, ViewOnly, ViewAndCAP, ViewAndMonitor} from './actionComponent'
import { useHistory } from "react-router-dom";

const Viavalen = () =>{
    const dispatch = useDispatch()
    let history = useHistory()
    const [data, setData] = useState([])
    const [details, setDetails] = useState([])
    const arrWarna = ["success","primary","warning","info"]
    const simView = useSelector((state)=>state.simView)
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
            tr_status (
                kd_status,
                ur_status
            ),
            th_detensi (
                kd_status,
                created_at
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
                {['id_detensi']:x.id_detensi, ...x.data, ...x.tr_status, ['histori']:x.th_detensi}
            )
        })
        setData(datas)   
        console.log(urstatus) 
      },[]);      
    return(
        <CCard>
            <CCardHeader>
                <h5>Data Detensi Kapal</h5>
            </CCardHeader>          
            <CCardBody>
                {
                    simView == 1 ?
                    <>
                        <div className="d-flex justify-content-end mb-2">
                            <CButton onClick={()=>history.push('/hdpsc/new')} className="btn btn-info">
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
                    { key: 'action', label: 'Action' }                                        
                ]}
                scopedSlots={{
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
                        return(
                            <td>
                                {
                                    simView == 1 && item.kd_status == 1 ?
                                    <ViewOnly/>
                                    :
                                    simView == 2 && item.kd_status == 1 ?
                                    <ViewAndEdit datadetensi={item} />
                                    :
                                    simView == 3 && item.kd_status == 2 ?
                                    <ViewAndEdit datadetensi={item}/>
                                    :
                                    simView == 3 && item.kd_status == 3 ?
                                    <ViewAndCAP datadetensi={item}/>
                                    :
                                    simView == 5 && item.kd_status == 3 ?
                                    <ViewOnly/>
                                    :
                                    simView  !== 3 && item.kd_status == 3 ?
                                    <ViewAndMonitor datadetensi={item}/>
                                    :
                                    <ViewOnly/>
                                }                                
                            </td>
                        )
                    },
                    'details':
                    (item, index) =>{
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
                                                        "Pemberitahuan oleh Dit. KPLP"
                                                        :
                                                        x.kd_status == 2 ?
                                                        "Penerusan Informasi oleh Dit. KAPEL"
                                                        :
                                                        x.kd_status == 3 ?
                                                        "Input Data oleh BKI"
                                                        :
                                                        x.kd_status == 4 ?
                                                        "Input CAP oleh BKI"
                                                        :
                                                        ""
                                                    }                                                    
                                                </CBadge>
                                            </div>
                                            <div style={{minWidth:"15vw"}} className="d-flex flex-column">
                                                {hari.toString().length == 1 ? "0"+hari : hari}-{bulan.toString().length == 1 ? "0"+bulan : bulan}-{tahun}{' '}{jam}:{menit}:{detik}
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
    )
}

export default Viavalen