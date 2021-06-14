import { CButton, CDataTable, CModal, CModalBody, CModalFooter, CModalHeader, CTextarea } from '@coreui/react'
import {React, useState, useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from "react-router-dom";
import supabase from '../../../supabase'

const ViewOnly = () =>{
    return(
        <div className="d-flex flex-row justify-content-center">
            <div className="mr-2">
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
    const [modal, setModal] = useState(false)
    const [item, setItem] = useState([])
    const simView = useSelector((state)=>state.simView)
    const arrResponsible = ["Dit. KPLP", "Dit. KAPEL", "BKI", "Kemenlu"]
    const [actionplan, setActionplan] = useState()
    const handleChange= (e) => {
        setActionplan(e.target.value)
    }
    const handleSimpan = async () =>{
        const { data, error } = await supabase
        .from('td_detensi')
        .update({ actionplan: actionplan })
        .eq('id_detensi', 'someValue')        
    }
    // const history = useHistory()
    // const dispatch = useDispatch()
    // const handleCAP = () =>{
    //     history.push('/hdpsc/edit')
    //     dispatch({type:'set', datadetensi:props.datadetensi})
    // }   
    useEffect(async () => {
        let { data: td_deficiency, error } = await supabase
        .from('td_deficiency')
        .select(`
        data, 
        id_deficiency
        `)
        .eq('id_detensi', props.datadetensi.id_detensi)
        // .eq('data->responsiblero', simView)  
        let sementara = td_deficiency.map((x)=>{
            return(
                {...x.data, ['id_deficiency']:x.id_deficiency, ['responsiblero']:arrResponsible[x.data.responsiblero - 1]}
            )
        })
        setItem(sementara)  
        console.log(sementara)    
      },[]);        
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
                <div className="mt-3">
                    <CDataTable
                    addTableClasses="josss"
                    items={item}
                    fields={[
                        {key:"no", label:"No"},
                        {key:"natureofdeficiency", label:"Nature of Deficiency"},
                        {key:"responsiblero", label:"Responsible RO"},                        
                        {key:"actionplan", label:"Action Plan"},
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
                        'actionplan':
                        (item, index)=>{
                            return(
                                <td>
                                    <CTextarea></CTextarea>
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
            <div className="mr-2">
                <CButton className="btn btn-sm btn-success">
                    <i class="fas fa-eye"></i>
                </CButton>                                     
            </div>  
            <div>
                <CButton onClick={()=>setModal(true)} className="btn btn-sm btn-info">
                    <i class="fas fa-wrench"></i>
                </CButton>                                     
            </div>                                   
        </div> 
        </>       
    )
}

const ViewAndEdit = (props) =>{
    const history = useHistory()
    const dispatch = useDispatch()
    const handleEdit = () =>{
        history.push('/hdpsc/edit')
        dispatch({type:'set', datadetensi:props.datadetensi})
    }     
    return(
        <div className="d-flex flex-row justify-content-center">
            <div className="mr-2">
                <CButton className="btn btn-sm btn-success">
                    <i class="fas fa-eye"></i>
                </CButton>                                     
            </div>  
            <div>
                <CButton onClick={()=>handleEdit()} className="btn btn-sm btn-warning">
                    <i class="fas fa-pencil-alt"></i>
                </CButton>                                     
            </div>                                   
        </div>          
    )
}

export {ViewOnly, ViewAndEdit, ViewAndCAP, ViewAndMonitor}