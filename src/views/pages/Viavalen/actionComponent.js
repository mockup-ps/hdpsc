import { CButton, CDataTable, CModal, CModalBody, CModalFooter, CModalHeader, CTextarea, CSelect, CTooltip} from '@coreui/react'
import {React, useState, useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from "react-router-dom";
import Swal from 'sweetalert2';
import { uid } from 'uid';
import supabase from '../../../supabase'

const ViewOnly = () =>{
    return(
        <div className="d-flex flex-row justify-content-center">
            <div>
                <CButton className="btn btn-sm btn-success">
                    <i class="fas fa-eye"></i>
                </CButton>                                 
            </div>                                  
        </div>          
    )
}

const ViewAndMonitor = (props) =>{
    const simView = useSelector((state)=>state.simView)
    const [modal, setModal] = useState(false)
    const [item, setItem] = useState([])
    useEffect(async () => {
        let { data: td_deficiency, error } = await supabase
        .from('td_deficiency')
        .select(`
        data, 
        actionplan
        `)
        .eq('id_detensi', props.datadetensi.id_detensi)
        .eq('data->responsiblero', JSON.stringify(simView))  
        let sementara = td_deficiency.map((x)=>{
            return(
                {...x.data, ['actionplan']:x.actionplan}
            )
        })
        console.log(sementara)
        setItem(sementara)     
      },[]);    
    return(
        <>
        <CModal
        show={modal}
        onClose={()=>setModal(false)}
        size="xl"
        >
            <CModalHeader>
                <h5>Monitoring Detensi Kapal {props.datadetensi.namakapal} </h5>
            </CModalHeader>
            <CModalBody>
                <CDataTable
                addTableClasses="josss"
                items={item}
                fields={[
                    {key:'no', label:'No'},
                    {key:'natureofdeficiency', label:'Nature of Deficiency'},
                    {key:'actionplan', label:'Action Plan'},
                    {key:'action', label:'Action'},
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
                    'action':
                    (item, index)=>{
                        return(
                            <td>
                                <div className="d-flex justify-content-center">
                                    <div className="mr-2">
                                        <CButton className="btn btn-sm btn-success">Setujui</CButton>
                                    </div>
                                    <div className="mr-2">
                                        <CButton className="btn btn-sm btn-danger">Tolak</CButton>
                                    </div>                                    
                                </div>
                            </td>
                        )
                    }
                }}
                />
            </CModalBody>
        </CModal>
        <div className="d-flex flex-row justify-content-center">
            <div className="mr-2">
                <CButton className="btn btn-sm btn-success">
                    <i class="fas fa-eye"></i>
                </CButton>                                     
            </div>  
            <div>
                <CButton onClick={()=>setModal(true)} className="btn btn-sm btn-warning">
                    <i class="fas fa-desktop"></i>
                </CButton>                                     
            </div>                                   
        </div>   
        </>      
    )
}

const ViewAndCAP = (props) =>{
    const history = useHistory()
    const trigger = useSelector((state)=>state.trigger)
    const [disabled, setDisabled] = useState(false)
    const dispatch = useDispatch()
    const [data, setData] = useState([])
    const [modal, setModal] = useState(false)
    const [item, setItem] = useState([])
    const simView = useSelector((state)=>state.simView)
    const arrResponsible = ["Dit. KPLP", "Dit. KAPEL", "BKI", "Kemenlu"]
    const handleChange= (e) => {
        setData({...data, [e.target.name]:e.target.value})
    }
    const handleSimpan = async () =>{
        const { data, error } = await supabase
        .from('td_detensi')
        .update({ data_cap: data })
        .eq('id_detensi', props.datadetensi.id_detensi)        
    }
    const handleUpload = async (e, a) =>{       
        const file = e.target.files[0]
        console.log(a)
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
            .from('td_deficiency')
            .update({ url_doc: url })
            .eq('id_deficiency', a)
            if (!uploadFile.error){
                // alert("Sukses")
                Swal.fire({
                    icon: 'success',
                    title: 'Sukses',
                    timer:300
                  })
                dispatch({type:'set', trigger:trigger+1})
            }
        }
    }     
    useEffect(async () => {
        let { data: td_deficiency, error } = await supabase
        .from('td_deficiency')
        .select(`
        data, 
        data_cap,
        id_deficiency,
        url_doc
        `)
        .eq('id_detensi', props.datadetensi.id_detensi)
        // .eq('data->responsiblero', simView)  
        let sementara = td_deficiency.map((x)=>{
            return(
                {...x.data, ['data_cap']:x.data_cap, ['id_deficiency']:x.id_deficiency, ['certificatetitle']:x.data.certificate.label, ['url_doc']:x.url_doc}
            )
        })
        setItem(sementara.sort((a,b)=>{
            return a.id_deficiency - b.id_deficiency
        }))  
        setData(sementara)
        console.log(data)
        console.log(sementara)    
      },[trigger]);
      const handleDelete = async(a) =>{
        const deleteFile = await supabase
        .from('td_deficiency')
        .update({ url_doc: null })
        .eq('id_deficiency', a) 
        if (!deleteFile.error){
            // alert("Sukses")
            Swal.fire({
                icon: 'success',
                title: 'Sukses',
                timer:300
              })
            dispatch({type:'set', trigger:trigger+1})
        }                 
      }  
      const handleRelease = () =>{
        history.push('/hdpsc/edit')
        dispatch({type:'set', datadetensi:props.datadetensi})          
      }      
    return(
        <>
        <CModal
        size="xl"
        show={modal}
        onClose ={()=>setModal(false)}
        >
            <CModalHeader>
                <h5><i>Correction Action Plan</i></h5>
            </CModalHeader>
            <CModalBody>
                <div className="mt-1">
                    <div className="d-flex justify-content-end mb-1">
                        <CButton disabled={disabled} onClick={()=>handleRelease()} className="btn btn-info btn-sm"><i className="fas fa-ship mr-2"></i>Kapal <i>Release</i></CButton>
                    </div>
                    <CDataTable
                    addTableClasses="josss"
                    items={item}
                    fields={[
                        {key:"no", label:"No", _style: { width: '1%'}},
                        {key:"natureofdeficiency", label:"Nature of Deficiency", _style: { width: '15%'}},
                        {key:"actiontaken", label:"Code", _style: { width: '1%'}},
                        // {key:"responsiblero", label:"Responsible RO"}, 
                        {key:"issuingauthority", label:"Certificate / Issuer", _style: { width: '5%'}},                        
                        {key:"actionplan", label:"Action Plan"},
                        {key:"result", label:"Result"},
                        {key:"remark", label:"Remarks", _style: { width: '12%'}},
                        {key:"doc", label:"Docs"}
                    ]}
                    scopedSlots={{
                        'doc':
                        (item, index)=>{
                            if (item.url_doc){
                                return(
                                    <td>
                                        <div className="d-flex justify-content-center">
                                            <a target="_blank" href={item.url_doc} role="button" className="btn btn-info btn-sm mr-1"><i class="fas fa-file-download"></i></a>  
                                            <CButton disabled={disabled} onClick={()=>handleDelete(item.id_deficiency)} className="btn btn-danger btn-sm"><i class="fas fa-trash-alt"></i></CButton>                                                                            
                                        </div>
                                    </td>
                                )
                            } else {
                                const id_deficiency = item.id_deficiency
                                return(
                                    <td>
                                        <div className="d-flex justify-content-center">
                                            <input onInput={(e)=>handleUpload(e, id_deficiency)} type="file" name="upload" id="file" class="inputfile" />
                                            <label role="button" className="btn btn-success btn-sm"for="file"><i class="far fa-file"></i></label>                                                                                
                                        </div>
                                    </td>
                                )                                
                            }
                        },
                        'issuingauthority':
                        (item, index)=>{
                            return(
                                <td>
                                    {item.certificatetitle} / {item.issuingauthority}
                                </td>
                            )
                        },
                        'result':
                        (item, index)=>{
                            return(
                                <td>
                                    <CTextarea name="result"  onChange={(e)=>handleChange(e)} disabled={disabled}></CTextarea>
                                </td>
                            )
                        },
                        'remark':
                        (item, index)=>{
                                return(
                                    <td>
                                        <CSelect name="remark"  onChange={(e)=>handleChange(e)} disabled={disabled}>
                                            <option value="0">NOT CLOSED</option>
                                            <option value="1">CLOSED</option>
                                        </CSelect>
                                    </td>
                                )
                        },
                        'actiontaken':
                        (item, index)=>{
                            return(
                                <td>
                                    {item.actiontaken.value}
                                </td>
                            )
                        },
                        'responsiblero':
                        (item, index) =>{
                            console.log(item)
                            return(
                                <td>
                                    {
                                        item.responsiblero ?
                                        "Yes"
                                        :
                                        "No"
                                    }
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
                        'actionplan':
                        (item, index)=>{
                            return(
                                <td>
                                    <CTextarea name="actionplan"  onChange={(e)=>handleChange(e)} disabled={disabled}></CTextarea>
                                </td>
                            )
                        }
                    }}
                    />
                </div>
            </CModalBody>
            <CModalFooter>
                <div className="d-flex justify-content-end">
                    <div className="mr-2">
                        <CButton onClick={()=>setModal(false)} color="success">Simpan</CButton>
                    </div>
                    <div className="mr-2">
                        <CButton onClick={()=>setModal(false)} color="danger">Batal</CButton>
                    </div>                    
                </div>
            </CModalFooter>
        </CModal>
        <div className="d-flex flex-row justify-content-center">
            {
                props.datadetensi.kd_status == 4 ?
                <div className="mr-2">
                    <CButton onClick={()=>{
                        history.push('/hdpsc/edit')
                        dispatch({type:'set', datadetensi:props.datadetensi})                    
                    }}className="btn btn-sm btn-success">
                        <i class="fas fa-eye"></i>
                    </CButton>                                     
                </div> 
                :
                <></>                
            } 
            <div>
                <CButton onClick={()=>{
                    if(props.datadetensi.kd_status == 4){
                        setDisabled(true)
                    }
                    setModal(true)                    
                }} className="btn btn-sm btn-info">
                    <i class="fas fa-wrench"></i>
                </CButton>                                     
            </div>                                   
        </div> 
        </>       
    )
}

const Edit = (props) =>{
    const history = useHistory()
    const dispatch = useDispatch()
    const simView = useSelector((state)=>state.simView)
    const handleEdit = () =>{
        if(!props.datadetensi.fl_lock){
            Swal.fire({
                icon:'question',
                text:'Apakah Anda Yakin ingin Men-Check Out informasi ini ?',
                showConfirmButton:true,
                showDenyButton:true,
                denyButtonText:'Tidak',
                confirmButtonText:'Ya'
            }).then((x)=>{
                if (x.isConfirmed){
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
                            dispatch({type:'set', datadetensi:props.datadetensi})
                        }
                    }     
                    // const updateHistori = async (hehe) =>{
                    //     const { data, error } = await supabase
                    //     .from('th_detensi')
                    //     .insert([
                    //         { id_detensi: hehe, kd_status : 5, createdby:simView, locked_by:simView},
                    //     ])
                    //     if (error){
                    //         return error
                    //     } else {
                    //         history.push('/hdpsc/edit')
                    //         dispatch({type:'set', datadetensi:props.datadetensi})
                    //     }                     
                    // }
                    updateLock(props.datadetensi.id_detensi)                    
                }
            })
        } else {
            history.push('/hdpsc/edit')
            dispatch({type:'set', datadetensi:props.datadetensi})
        }
    }     
    return(
        <div className="d-flex flex-row justify-content-center">
            {/* <div className="mr-2">
                <CButton className="btn btn-sm btn-success">
                    <i class="fas fa-eye"></i>
                </CButton>                                     
            </div>   */}
            {props.disabled}
            <div>
                    <div>
                        <CButton disabled={props.disabled} onClick={()=>handleEdit()} 
                        className={
                            props.fl_lock && props.disabled ?
                            "btn btn-sm btn-success"
                            :
                            props.fl_lock ?
                            "btn btn-sm btn-warning"
                            :
                            "btn btn-sm btn-success"
                        }
                        >
                        {
                            props.fl_lock && props.disabled ?
                            <i class="fas fa-check"></i>
                            :
                            props.fl_lock ?
                            <i class="fas fa-pencil-alt"></i>
                            :
                            <i class="fas fa-check"></i>
                        }
                        </CButton>                         
                    </div>                                   
            </div>                                   
        </div>          
    )
}

export {ViewOnly, Edit, ViewAndCAP, ViewAndMonitor}