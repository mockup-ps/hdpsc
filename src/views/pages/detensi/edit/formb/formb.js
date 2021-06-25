import { CDataTable, CRow, CCol, CButton, CModalHeader, CModalBody, CFormGroup, CLabel, CModal, CInput, CTextarea, CSelect, CModalFooter, CInputCheckbox} from '@coreui/react';
import {React, useState, useEffect} from 'react'
import supabase from '../../../../../supabase'
import AsyncSelect from 'react-select/async';

const Formb = (props) =>{
    const [url, setURL] = useState()
    const [data, setData] = useState({})
    const [modal, setModal] = useState(false)
    const [item, setItem] = useState([])
    const [trigger, setTrigger] = useState(true)
    const [triggers, setTriggers] = useState(false)
    const arrResponsible = ["Dit. KPLP", "Dit. KAPEL", "BKI", "Kemenlu"]
    const handleChange= (e) =>{
        if (e.target.name == 'responsiblero'){
            setData({...data, [e.target.name]:e.target.checked})            
        } else {
            setData({...data, [e.target.name]:e.target.value})
        }
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
            setData({
                'codedeficiency':'',
                'natureofdeficiency':'',
                'conventionreference':'',
                'actiontaken':'',
                'responsiblero':'',
                'certificate':'',
                'issuingauthority':''
            })
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
                {...x.data, 
                    ['codedeficiency']:x.data.codedeficiency.value, ['actiontaken']:x.data.actiontaken.value,
                    ['issuingauthority']:x.data.issuingauthority
                }
            )
        })
        setItem(sementara)
        console.log(td_deficiency)
    },[trigger]);      
    const handleChangeSelect = (e, id) =>{
        if (id.name == 'codedeficiency'){
            setData({...data, [id.name]:e, ['natureofdeficiency']:e.label.substring(8,e.label.length)})            
        } else if (id.name == 'certificate'){
            setData({...data, [id.name]:e, ['issuingauthority']:e.issuingauthority})            
        } else {
            setData({...data, [id.name]:e})
        }
    }
    const searchData  = async (inputValue) =>{
        let sementara = '%'+inputValue+'%'
        let { data: tr_defisiensi, error } = await supabase
        .from('tr_defisiensi')
        .select('*')
        .ilike('ur_defisiensi', sementara)
        let dataOptions = tr_defisiensi.map((x=>{
            return(
                {['value']:x.kd_defisiensi, ['label']:x.ur_defisiensi}
            )
        }))
        return dataOptions
    }    
    const searchDataCertificate = async (inputValue) =>{
        let { data: td_sertifikat, error } = await supabase
        .from('td_sertifikat')
        .select('*')
        .eq('id_detensi', props.datadetensi.id_detensi)
        let dataOptions = td_sertifikat.map((x=>{
            return(
                {...x.data.title, ['issuingauthority']:x.data.issuingauthority}
            )
        }))
        return dataOptions        
    }      
    const searchDataAction  = async(inputValue) =>{
        let sementara = '%'+inputValue+'%'
        let { data: tr_action, error } = await supabase
        .from('tr_action')
        .select('*')
        .ilike('ur_action', sementara)
        let dataOptions = tr_action.map((x=>{
            return(
                {['value']:x.kd_action, ['label']:x.ur_action}
            )
        }))
        return dataOptions
    } 
    return(
        <>
        <CModal
        show={modal}
        onClose={()=>setModal(false)}
        size="lg"
        >
            <CModalHeader>
                <h5>Tambah Deficiency</h5>
            </CModalHeader>
            <CModalBody>
                <CRow>
                    <CCol md="3">
                        <CFormGroup>
                            <CLabel>Code</CLabel>
                            <AsyncSelect onChange={(e, id)=>handleChangeSelect(e, id)} value={data.codedeficiency} name="codedeficiency" loadOptions={searchData}/>
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
                            <AsyncSelect cacheOptions defaultOptions onChange={(e,id)=>handleChangeSelect(e, id)} value={data.actiontaken} name="actiontaken" loadOptions={searchDataAction}/>
                        </CFormGroup>
                    </CCol>                    
                </CRow>
                <CRow>
                    <CCol md="6">
                        <CRow>
                            <CCol md="5">
                                <CLabel>Responsible RO ?</CLabel>
                            </CCol>
                            <CCol md="7">
                                <CFormGroup variant="custom-checkbox" inline>
                                    <CInputCheckbox onChange={(e)=>handleChange(e)} checked={data.responsiblero} custom id="responsiblero" name="responsiblero"/>
                                    <CLabel variant="custom-checkbox" htmlFor="responsiblero">Yes</CLabel>
                                </CFormGroup>
                            </CCol>                    
                        </CRow>                        
                    </CCol>
                </CRow> 
                <CRow>
                    <CCol md="6">
                        <CFormGroup>
                            <CLabel>Pilih Sertifikat</CLabel>
                            <AsyncSelect onChange={(e, id)=>handleChangeSelect(e, id)} value={data.certificate} name="certificate" cacheOptions defaultOptions loadOptions={searchDataCertificate}/>                            
                        </CFormGroup>
                    </CCol>
                    <CCol md="6">
                        <CFormGroup>
                            <CLabel>Issuing Authority</CLabel>
                            <CInput value={data.issuingauthority} disabled />
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
                    <CButton onClick={()=>{
                        setModal(true)
                        setTriggers(!triggers)
                    }} className="btn btn-sm btn-info" disabled={props.disabled}>Tambah</CButton>
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
                    {key:"issuingauthority", label:"Issuing Authority"},
                    {key:"action", label:"Action"},
                ]}
                scopedSlots={{
                    'responsiblero':
                    (item, index)=>{
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
                    'action':
                    (item, index)=>{
                        return(
                            <td>
                                <div className="d-flex justify-content-center">
                                    <div className="mr-2">
                                        <CButton disabled={props.disabled} className="btn btn-info btn-sm">Edit</CButton>
                                    </div>
                                    <div className="mr-2">
                                        <CButton disabled={props.disabled} className="btn btn-danger btn-sm">Hapus</CButton>
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