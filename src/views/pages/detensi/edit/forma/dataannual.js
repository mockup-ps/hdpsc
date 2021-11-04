import {React, useState, useEffect} from 'react'
import {CDataTable, CButton, CModalHeader, CModal, CModalBody, CRow, CFormGroup, CLabel, CCol, CInput, CModalFooter} from '@coreui/react'
import supabase from '../../../../../supabase'

const DataAnnual = (props) =>{
    const [data, setData] = useState({})
    const [item, setItem] = useState([])
    const [modal, setModal] = useState(false)
    const [trigger, setTrigger] = useState(false)
    const handleChange = (e) =>{
        setData({...data, [e.target.name]:e.target.value})
    }
    const handleSimpan  = async () =>{
        const Simpan = await supabase
        .from('td_survey')
        .insert([
          { id_detensi: props.datadetensi.id_detensi, data: data },
        ])      
        if(Simpan.error){
            alert(Simpan.error)
        } else {
            setTrigger(!trigger)
            setModal(false)
        }
    }
    useEffect(async() => {
        let { data: td_survey, error } = await supabase
        .from('td_survey')
        .select("data")
        .eq('id_detensi', props.datadetensi.id_detensi) 
        let sementara = td_survey.map((x)=>{
            return(
                {...x.data}
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
                <h5>Tambah Data</h5>
            </CModalHeader>
            <CModalBody>
                <CRow>
                    <CCol md="12">
                        <CFormGroup>
                            <CLabel><i>Date</i></CLabel>
                            <CInput name="dateannual" value={data.dateannual} onChange={(e)=>handleChange(e)} type="date"/>
                        </CFormGroup>
                    </CCol>
                </CRow>
                <CRow>
                    <CCol md="12">
                        <CFormGroup>
                            <CLabel><i>Surveying Authority</i></CLabel>
                            <CInput name="surveyingauthority" value={data.surveyingauthority} onChange={(e)=>handleChange(e)}/>
                        </CFormGroup>
                    </CCol>
                </CRow>
                <CRow>
                    <CCol md="12">
                        <CFormGroup>
                            <CLabel><i>Place</i></CLabel>
                            <CInput name="place" value={data.place} onChange={(e)=>handleChange(e)}/>
                        </CFormGroup>
                    </CCol>
                </CRow>                                
            </CModalBody>
            <CModalFooter>
                <div className="d-flex justify-content-end">
                    <div className="mr-3">
                        <CButton onClick={()=>handleSimpan()} color="success">Simpan</CButton>
                    </div>
                    <div className="mr-3">
                        <CButton color="danger">Batal</CButton>
                    </div>                    
                </div>
            </CModalFooter>
        </CModal>
        <div className="mt-3">
            <div className="d-flex justify-content-end mb-2">
                <CButton disabled={props.disabled} onClick={()=>setModal(true)} className="btn btn-sm btn-info">Tambah</CButton>
            </div>
            <CDataTable
            addTableClasses="josss"
            items={item}
            fields={[
                {key:"no", label:"No"},
                {key:"dateannual", label:"Date"},
                {key:"surveyingauthority", label:"Surveying Authority"},
                {key:"place", label:"Place"},
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
                                    <CButton disabled={props.disabled} className="btn btn-sm btn-success">Simpan</CButton>
                                </div>
                                <div className="mr-2">
                                    <CButton disabled={props.disabled} className="btn btn-sm btn-danger">Batal</CButton>
                                </div>                                
                            </div>
                        </td>
                    )
                }
            }}
            />                               
        </div>
        </>
    )
}

export default DataAnnual