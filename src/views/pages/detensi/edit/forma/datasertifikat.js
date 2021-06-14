import {React, useState, useEffect} from 'react'
import {CDataTable, CButton, CModalHeader, CModal, CModalBody, CFormGroup, CLabel, CInput, CRow, CCol, CSelect, CModalFooter} from '@coreui/react'
import { useSelector } from 'react-redux'
import supabase from '../../../../../supabase'

const DataSertifikat = (props) =>{
    const [data, setData] = useState({})
    const [trigger, setTrigger]=useState(true)
    const [item, setItem] = useState([])
    const [modal, setModal] = useState(false)
    const forma = useSelector((state)=>state.forma)
    const handleChange= (e) =>{
        setData({...data, [e.target.name]:e.target.value})
    }
    const arrAuth = ["Load Line","SC","SE","SR","IOPP","IAPP"]
    const handleSimpan = async () =>{
        const Simpan = await supabase
        .from('td_sertifikat')
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
        let { data: td_sertifikat, error } = await supabase
        .from('td_sertifikat')
        .select("data")
        .eq('id_detensi', props.datadetensi.id_detensi) 
        let sementara = td_sertifikat.map((x)=>{
            return(
                {...x.data, ['titlesertifikat']:arrAuth[x.data.titlesertifikat - 1 ]}
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
                <h5>Tambah Sertifikat</h5>
            </CModalHeader>
            <CModalBody>
                <CRow>
                    <CCol md="12">
                        <CFormGroup>
                            <CLabel>Title</CLabel>
                            <CSelect name="titlesertifikat" value={data.titlesertifikat} onChange={(e)=>handleChange(e)}>
                                <option value="0">-</option> 
                                <option value="1">Load Line</option> 
                                <option value="2">SC</option> 
                                <option value="3">SE</option> 
                                <option value="4">SR</option>       
                                <option value="5">IOPP</option>  
                                <option value="6">IAPP</option>                           
                            </CSelect>
                        </CFormGroup>
                    </CCol>
                </CRow>
                <CRow>
                    <CCol md="12">
                        <CFormGroup>
                            <CLabel>Issuing Authority</CLabel>
                            <CInput name="issuingauthority" value={data.issuingauthority} onChange={(e)=>handleChange(e)}/>
                        </CFormGroup>
                    </CCol>
                </CRow> 
                <CRow>
                    <CCol md="12">
                        <CFormGroup>
                            <CLabel>Date of Issuance</CLabel>
                            <CInput name="dateofissuance" value={data.dateofissuance} onChange={(e)=>handleChange(e)} type="date"/>
                        </CFormGroup>
                    </CCol>
                </CRow> 
                <CRow>
                    <CCol md="12">
                        <CFormGroup>
                            <CLabel>Date of Expiry</CLabel>
                            <CInput name="dateofexpiry" value={data.dateofexpiry} onChange={(e)=>handleChange(e)} type="date"/>
                        </CFormGroup>
                    </CCol>
                </CRow>                                                
            </CModalBody>
            <CModalFooter>
                <div className="d-flex justify-content-end">
                    <CButton onClick={()=>handleSimpan()} color="success">Simpan</CButton>
                </div>
            </CModalFooter>
        </CModal>
        <div className="mt-3">
            <div className="d-flex justify-content-end mb-2">
                <CButton onClick={()=>setModal(true)} className="btn btn-sm btn-info">Tambah</CButton>
            </div>
            <CDataTable
            addTableClasses="josss"
            items={item}
            fields={[
                {key:"no", label:"No"},
                {key:"titlesertifikat", label:"Title"},
                {key:"issuingauthority", label:"Issuing Authority"},
                {key:"dateofissuance", label:"Date of Issuance"},
                {key:"dateofexpiry", label:"Date of Expiry"},
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
                            <div className="d-flex flex-row align-items-center">
                                <div className="mr-2">
                                    <CButton className="btn btn-sm btn-success">Edit</CButton>
                                </div>
                                <div className="mr-2">
                                    <CButton className="btn btn-sm btn-danger">Hapus</CButton>
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

export default DataSertifikat