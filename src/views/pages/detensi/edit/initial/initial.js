import {React} from 'react'
import { CCardBody, CCard, CFormGroup, CLabel, CInput, CRow , CCol, CButton, CDataTable} from '@coreui/react'
import supabase from '../../../../../supabase'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router'
import { uid } from 'uid';
import Swal from 'sweetalert2'

const Initial = (props) => {
    const trigger = useSelector((state)=>state.trigger)
    const dispatch = useDispatch()
    const simView = useSelector((state)=>state.simView)
    const history = useHistory()
    const handleSimpan = async () =>{
        const simpanBiasa = async () =>{
            const { data:td_detensi, error } = await supabase
            .from('td_detensi')
            .update({ kd_status: 2 })
            .eq('id_detensi', props.datadetensi.id_detensi)
            if (!error){
                const simpanHistory = async () =>{
                    const { data, error } = await supabase
                    .from('th_detensi')
                    .insert([
                      { id_detensi: props.datadetensi.id_detensi, kd_status: 2, createdby:simView},
                    ])
                    if(!error){
                        let sementara = {['id_detensi']:td_detensi[0].id_detensi, ...td_detensi[0].data, ['kd_status']:td_detensi[0].kd_status}
                        dispatch({type:'set', datadetensi:sementara})
                        Swal.fire({
                            icon: 'success',
                            title: 'Sukses',
                            text:'Apakah Anda Ingin Mengisi data elektronik Form A & Form B ?',
                            showConfirmButton:true,
                            showDenyButton:true
                          }).then((res)=>{
                              if(res.isConfirmed){
                                const updateLock = async(hehe) =>{
                                    const { data, error } = await supabase
                                    .from('td_detensi')
                                    .update({ 
                                        fl_lock: 1, 
                                        locked_by:simView                          
                                    })
                                    .eq('id_detensi', hehe)
                                    if(error){
                                        return error
                                    } else {
                                        history.push('/hdpsc/edit')
                                    }
                                }  
                                updateLock(props.datadetensi.id_detensi)                                  
                              } else {
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
                                updateLock(props.datadetensi.id_detensi)                                  
                              }
                          })                        
                        // history.push('/hdpsc')
                    }            
                }  
                simpanHistory()               
            }
        }
        simpanBiasa()
    }
    const handleRelease = async () =>{
        const { data:td_detensi, error } = await supabase
        .from('td_detensi')
        .update({ kd_status: 4 })
        .eq('id_detensi', props.datadetensi.id_detensi) 
        if (!error){
            const kirimHistori = await supabase
            .from('th_detensi')
            .insert({ id_detensi: props.datadetensi.id_detensi, kd_status: 4, createdby:simView},)
            if(!kirimHistori.error){
                history.push('/hdpsc')                
            }
        }       
    }
    const handleDelete = async (a) =>{
        const deleteFile = await supabase
        .from('td_dokumen')
        .delete()
        .eq('id_dokumen', a) 
        if (!deleteFile.error){
            Swal.fire({
                icon: 'success',
                title: 'Sukses',
                timer:300
              })
            dispatch({type:'set', trigger:trigger+1})
        }         
    }
    const handleUpload = async (e, a) =>{       
        const file = e.target.files[0]
        const namedok = a
        const { data, error } = await supabase
        .storage
        .from('dokumen')
        .upload(uid(32) , file)    
        if (error){
            alert("Error")
        } else {
            const url = 'https://ctvjpxocqeajngziaxji.supabase.co/storage/v1/object/public/'+ data.Key
            console.log(url)
            const uploadFile = await supabase
            .from('td_dokumen')
            .insert([
              { id_detensi: props.datadetensi.id_detensi, kd_dokumen: namedok, url_dokumen : url },
            ])
            if (!uploadFile.error){
                // alert("Sukses")
                Swal.fire({
                    icon: 'success',
                    title: 'Sukses',
                  })
                dispatch({type:'set', trigger:trigger+1})
            }
        }
    }
    return(
        <CRow>
            <CCol md="6">                  
                <CRow>
                    <CCol md="12">
                        <CFormGroup>
                            <CLabel><b>Nama Kapal</b></CLabel>
                            <CInput disabled value={props.datadetensi.namakapal} name="namakapal" />
                        </CFormGroup>                                
                    </CCol>                                
                </CRow>
                <CRow>
                    <CCol md="12">
                        <CFormGroup>
                            <CLabel><b>Nomor IMO Kapal</b></CLabel>
                            <CInput disabled value={props.datadetensi.imokapal} name="imokapal"/>
                        </CFormGroup>                                
                    </CCol>                                
                </CRow>  
                <CRow>
                    <CCol md="12">
                        <CFormGroup>
                            <CLabel><b>Tanggal Detensi</b></CLabel>
                            <CInput disabled value={props.datadetensi.tgldetensi} name="tgldetensi" type="date"/>
                        </CFormGroup>                                
                    </CCol>                                
                </CRow>                        
            </CCol>
            <CCol md="6">
                {
                    props.datadetensi.kd_status == 4 || props.datadetensi.kd_status == 3 ?
                    <>
                        <CRow>
                            <CCol md="12">
                                <CFormGroup>
                                    <CLabel><b>Date of Release from Detention</b></CLabel>
                                    <div className="d-flex flex-row">
                                        <div style={{width:'50vw'}} className="mr-2">
                                            <CInput type="date"/>
                                        </div>
                                        {
                                            props.disabled ?
                                                <div>
                                                    <CButton disabled={props.disabled2} onClick={()=>handleRelease()} className="btn btn-warning">Simpan</CButton>
                                                </div>
                                            :
                                            <>
                                            </>                                    
                                        }
                                    </div>
                                    {/* disabled={props.disabled} */}
                                </CFormGroup>                
                            </CCol>                
                        </CRow>                     
                    </>
                    :
                    <>
                    </>
                }               
                <div className="d-flex flex-column mt-3">
                    <div style={{width:'100%'}}>
                        <CDataTable
                        addTableClasses="josss mt-2"
                        items={[
                            {no:1, namadok:"Form A", kddok:"forma"},
                            {no:2, namadok:"Form B", kddok:"formb"}
                        ]}
                        fields={[
                            {key:"no", label:"Nomor"},
                            {key:"namadok", label:"Nama Dokumen"},
                            {key:"action", label:"Action"},
                        ]}
                        scopedSlots={{
                            'action':
                            (item, index)=>{
                                const namedok = item.kddok                                
                                if(props.datadokumen.filter(x=>x.kd_dokumen == item.kddok).length !== 0){
                                    const linkdok = props.datadokumen.filter(x=>x.kd_dokumen == item.kddok)[0].url_dokumen
                                    const iddok = props.datadokumen.filter(x=>x.kd_dokumen == item.kddok)[0].id_dokumen
                                    return(
                                        <td>
                                            <a target="_blank" href={linkdok} role="button" className="btn btn-info btn-sm mr-1"><i class="fas fa-file-download"></i></a>
                                            {
                                                props.disabled ?
                                                <>
                                                <CButton disabled={props.disabled2} onClick={()=>handleDelete(iddok)} className="btn btn-danger btn-sm">
                                                    <i class="far fa-trash-alt"></i>
                                                </CButton>
                                                </>
                                                :
                                                <>
                                                </>
                                            }
                                        </td>
                                    )
                                } else {
                                    return(
                                        <td>
                                            <input onInput={(e)=>handleUpload(e,namedok)} type="file" name="upload" id="file" class="inputfile" />
                                            <label role="button" className="btn btn-info btn-sm "for="file">Upload</label>                                            
                                            {/* <a type="file" role="button" className="btn btn-info btn-sm">Upload</a> */}
                                        </td>
                                    )
                                }
                            }
                        }}
                        />                           
                    </div>  
                    {
                        props.datadetensi.kd_status == 1 ?
                        <>
                            <div className="d-flex mt-auto mb-2 justify-content-end">
                                <div className="mr-2">
                                    <CButton onClick={()=>handleSimpan()} color="success">Simpan</CButton>
                                </div>
                                <div className="mr-2">
                                    <CButton onClick={()=>history.push('/hdpsc')} style={{color:'white'}} color="warning">Kembali</CButton>
                                </div>                        
                            </div>                         
                        </>
                        :
                        <>
                        </>
                    }                
                </div>                       
            </CCol>
        </CRow>        
    )    
}

export default Initial