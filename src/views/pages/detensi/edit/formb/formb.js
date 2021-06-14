import { CDataTable, CRow, CCol, CButton, CModalHeader, CModalBody, CFormGroup, CLabel, CModal, CInput, CTextarea, CSelect, CModalFooter} from '@coreui/react';
import {React, useState, useEffect} from 'react'
import supabase from '../../../../../supabase'

const Formb = (props) =>{
    const [url, setURL] = useState()
    const [data, setData] = useState({})
    const [modal, setModal] = useState(false)
    const [item, setItem] = useState([])
    const [trigger, setTrigger] = useState(true)
    const arrResponsible = ["Dit. KPLP", "Dit. KAPEL", "BKI", "Kemenlu"]
    const handleChange= (e) =>{
        setData({...data, [e.target.name]:e.target.value})
    }
    const handleSimpan  = async () =>{
        const Simpan = await supabase
        .from('td_deficiency')
        .insert([
          { id_detensi: props.datadetensi.id_detensi, data: data },
        ])      
        console.log(data)
        if(Simpan.error){
            alert(Simpan.error)
        } else {
            setTrigger(!trigger)
            setModal(false)
        }
    }
    useEffect(async() => {
        let { data: td_dokumen, error } = await supabase
        .from('td_dokumen')
        .select("url_dokumen")
        .eq('id_detensi', props.datadetensi.id_detensi) 
        .eq('kd_dokumen', 'formb')  
        setURL(td_dokumen[0].url_dokumen)
    },[]); 
    useEffect(async() => {
        let { data: td_deficiency, error } = await supabase
        .from('td_deficiency')
        .select("data")
        .eq('id_detensi', props.datadetensi.id_detensi) 
        let sementara = td_deficiency.map((x)=>{
            return(
                {...x.data, ['responsiblero']:arrResponsible[x.data.responsiblero - 1]}
            )
        })
        setItem(sementara)
        console.log(sementara)
    },[trigger]);         
    return(
        <>
        <CModal
        show={modal}
        onClose={()=>setModal(false)}
        >
            <CModalHeader>
                <h5>Tambah Deficiency</h5>
            </CModalHeader>
            <CModalBody>
                <CRow>
                    <CCol md="3">
                        <CFormGroup>
                            <CLabel>Code</CLabel>
                            <CInput name="codedeficiency" value={data.codedeficiency} onChange={(e)=>handleChange(e)} />
                        </CFormGroup>
                    </CCol>
                    <CCol md="9">
                        <CFormGroup>
                            <CLabel>Nature of Deficiency</CLabel>
                            <CTextarea name="natureofdeficiency" value={data.natureofdeficiency} onChange={(e)=>handleChange(e)}/>
                        </CFormGroup>
                    </CCol>                    
                </CRow>
                <CRow>
                    <CCol md="6">
                        <CFormGroup>
                            <CLabel>Convention Reference</CLabel>
                            <CInput name="conventionreference" value={data.conventionreference} onChange={(e)=>handleChange(e)}/>
                        </CFormGroup>
                    </CCol>
                    <CCol md="6">
                        <CFormGroup>
                            <CLabel>Action Taken</CLabel>
                            <CSelect name="actiontaken" value={data.actiontaken} onChange={(e)=>handleChange(e)}>
                                <option value="1">-</option>   
                                <option value="10">10</option> 
                                <option value="15">15</option> 
                                <option value="16">16</option>
                                <option value="17">17</option>                                
                            </CSelect>
                        </CFormGroup>
                    </CCol>                    
                </CRow>
                <CRow>
                    <CCol md="12">
                        <CFormGroup>
                            <CLabel>Responsible RO</CLabel>
                            <CSelect name="responsiblero" value={data.responsiblero} onChange={(e)=>handleChange(e)}>
                                <option value="0">-</option>
                                <option value="1">Dit. KPLP</option>
                                <option value="2">Dit. KAPEL</option> 
                                <option value="3">BKI</option>
                                <option value="4">Kemenlu</option>
                            </CSelect>
                        </CFormGroup>
                    </CCol>
                </CRow>                                
            </CModalBody>
            <CModalFooter>
                <div className="d-flex justify-content-end">
                    <div className="mr-2">
                        <CButton onClick={()=>handleSimpan()} color="success">Simpan</CButton>
                    </div>
                    <div className="mr-2">
                        <CButton color="danger">Batal</CButton>
                    </div>                    
                </div>
            </CModalFooter>
        </CModal>
        <CRow style={{minHeight:'90vh'}}>
            <CCol md="6">
                <div style={{height:'100%'}}>
                <embed src={url} type="application/pdf" width="100%" height="100%"/>                                    
                </div>                                             
            </CCol>
            <CCol md="6">
                <div className="d-flex justify-content-end mb-2">
                    <CButton onClick={()=>setModal(true)} className="btn btn-sm btn-info">Tambah</CButton>
                </div>
                <CDataTable
                addTableClasses="josss mantaps"
                items={item}
                fields={[
                    {key:"no", label:"No"},
                    {key:"codedeficiency", label:"Code"},
                    {key:"natureofdeficiency", label:"Nature of Deficiency"},
                    {key:"conventionreference", label:"Convention Reference"},
                    {key:"actiontaken", label:"Action Taken"},
                    {key:"responsiblero", label:"Responsible RO"},
                    {key:"action", label:"Action"},
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
                                        <CButton className="btn btn-info btn-sm">Edit</CButton>
                                    </div>
                                    <div className="mr-2">
                                        <CButton className="btn btn-danger btn-sm">Hapus</CButton>
                                    </div>                                    
                                </div>
                            </td>
                        )
                    }
                }}
                />                           
            </CCol>            
        </CRow> 
        </>       
    )
}

export default Formb