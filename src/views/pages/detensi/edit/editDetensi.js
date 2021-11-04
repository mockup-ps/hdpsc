import {React, useState, useEffect} from 'react'
import { CCardBody, CCard, CButton, CRow} from '@coreui/react'
import {ReactComponent as Initials} from '../../../../assets/icons/animate/svg/001-approved.svg'
import {ReactComponent as FormA} from '../../../../assets/icons/animate/svg/013-approved.svg'
import {ReactComponent as FormB} from '../../../../assets/icons/animate/svg/002-approved.svg'
import Initial from '../edit/initial/initial'
import Forma from '../edit/forma/forma'
import Formb from '../edit/formb/formb'
import { useDispatch, useSelector } from 'react-redux'
import supabase from '../../../../supabase'
import { useHistory } from 'react-router'
import Swal from 'sweetalert2'

const EditDetensi = () =>{
    const dispatch = useDispatch()
    const [disabled, setDisabled] = useState(false)
    const [disabled2, setDisabled2] =useState(false)
    const history = useHistory()
    const [data, setData] = useState(1)
    const [dokumen, setDokumen] = useState([])
    const simView = useSelector((state)=>state.simView)
    const forma = useSelector((state)=>state.forma)
    const [count, setCount] = useState(1)
    const handleChangePage = (e) =>{
        setData(e)
        console.log(e)
    } 
    const handleKirim = () =>{
        const kirimDetensi = async () =>{
            const { data, error } = await supabase
            .from('td_detensi')
            .update({ data: forma, kd_status: 3, fl_lock:0, locked_by:simView})
            .eq('id_detensi', datadetensi.id_detensi)   
            if (error){
                alert(error)
            } else {
                kirimHistori()                 
            }             
        }
        const kirimHistori = async() =>{
            const { data, error } = await supabase
            .from('th_detensi')
            .insert([
              { id_detensi: datadetensi.id_detensi, kd_status: 3, createdby:simView},
            ])  
            if(error){
                alert(error)
            } else {
                Swal.fire({
                    timer:500,
                    icon: 'success',
                    title: 'Sukses',
                })
                history.push('/hdpsc')
            }          
        }         
        kirimDetensi()
    }
    const trigger = useSelector((state)=>state.trigger)
    useEffect(() => {
        const fungsi = async () =>{
            console.log("MANTAB")
            const {data, error} = await supabase
            .from('td_dokumen')
            .select("*")
            .eq('id_detensi', datadetensi.id_detensi)
            if (error){
                console.log(error)
            } else {
                setDokumen(data)
            }
        }  
        fungsi()      
      },[trigger]);
      useEffect(() => {
          console.log(datadetensi)
          if (datadetensi.kd_status == 3 || datadetensi.kd_status == 4){
              setDisabled(true)
              if(datadetensi.kd_status == 4){
                  setDisabled2(true)
              }
          } else {
              setDisabled(false)
          }
        const fetchDataSimpanan = async () =>{
            let { data: td_detensi, error } = await supabase
            .from('td_detensi')
            .select("data")
            .eq('id_detensi', datadetensi.id_detensi)
            dispatch({type:'set', forma:td_detensi[0].data})
        }
        fetchDataSimpanan()                 
      },[]);                      
    const datadetensi = useSelector((state)=>state.datadetensi)
    const handleUnlock = () =>{
        const updateLock = async(hehe) =>{
            const { data, error } = await supabase
            .from('td_detensi')
            .update({ 
                fl_lock: 0, 
                locked_by:simView                          
            })
            .eq('id_detensi', hehe)
            if(error){
                return error
            } else {
                history.push('/hdpsc')
            }
        }     
        // const updateHistori = async (hehe) =>{
        //     const { data, error } = await supabase
        //     .from('th_detensi')
        //     .insert([
        //         { id_detensi: hehe, kd_status : 6, createdby:simView, locked_by:simView},
        //     ])
        //     if (error){
        //         return error
        //     } else {
        //         history.push('/hdpsc')
        //     }                     
        // }
        updateLock(datadetensi.id_detensi)         
    }
    return(
        <CCard>
            <CCardBody>
                <div className="d-flex flex-row justify-content-end">
                    <div className="mr-2">
                        {
                            !disabled ?
                            <CButton onClick={()=>handleUnlock()} className="btn btn-sm btn-danger"><i class="fas fa-unlock"></i> Batal Check Out</CButton>
                            :
                            <>
                            </>
                        }
                    </div>   
                    {
                        datadetensi.kd_status == 2 ?
                        <>
                                <div className="mr-2">
                                    <CButton onClick={()=>history.push('/hdpsc')} className="btn btn-sm btn-info"><i class="fas fa-arrow-circle-left"></i> Kembali</CButton>
                                </div>                    
                                <div>
                                    <CButton onClick={()=>handleKirim()} className="btn btn-sm btn-warning">Kirim <i class="fas fa-paper-plane"></i></CButton>
                                </div>                                      
                        </>
                        :
                        <>
                        </>
                    }                                                        
                </div>                 
                <div className="d-flex flex-row justify-content-center mb-4">
                    {
                        datadetensi.kd_status == 1 ?
                        <>
                            <div onClick={()=>handleChangePage(1)} className="d-flex flex-column mr-5 align-items-center">
                                <Initials role="button" className={
                                    data == 1 ?
                                    "on"
                                    :
                                    "off"
                                } />
                                <div className="mt-1">
                                    <b><h5>Initial Info</h5></b>
                                </div>
                            </div>                        
                        </>
                        :
                        <>
                            <div onClick={()=>handleChangePage(1)} className="d-flex flex-column mr-5 align-items-center">
                                <Initials role="button" className={
                                    data == 1 ?
                                    "on"
                                    :
                                    "off"
                                } />
                                <div className="mt-1">
                                    <b><h5>Initial Info</h5></b>
                                </div>
                            </div> 
                            <div onClick={()=>handleChangePage(2)} className="d-flex flex-column mr-5 align-items-center">
                                <FormA role="button" className={
                                    data == 2 ?
                                    "on"
                                    :
                                    "off"
                                } />
                                <div className="mt-1">
                                    <b><h5>Form A</h5></b>
                                </div>
                            </div> 
                            <div onClick={()=>handleChangePage(3)} className="d-flex flex-column mr-5 align-items-center">
                                <FormB role="button" className={
                                    data == 3 ?
                                    "on"
                                    :
                                    "off"
                                } />
                                <div className="mt-1">
                                    <b><h5>Form B</h5></b>
                                </div>
                            </div>
                        </>                                                  
                    }                                      
                </div>
                {
                    data == 1 ?
                    <Initial disabled2={disabled2} disabled={disabled} datadokumen={dokumen} datadetensi={datadetensi} />  
                    :
                    data == 2 ?
                    <Forma disabled={disabled} datadokumen={dokumen} datadetensi={datadetensi}/>
                    :
                    <Formb disabled={disabled} datadokumen={dokumen} datadetensi={datadetensi}/>

                }                            
            </CCardBody>
        </CCard>        
    )
}

export default EditDetensi