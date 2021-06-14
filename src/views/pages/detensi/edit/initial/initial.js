import {React} from 'react'
import { CCardBody, CCard, CFormGroup, CLabel, CInput, CRow , CCol, CButton, CDataTable} from '@coreui/react'
import supabase from '../../../../../supabase'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router'

const Initial = (props) => {
    const trigger = useSelector((state)=>state.trigger)
    const dispatch = useDispatch()
    const history = useHistory()
    const handleSimpan = async () =>{
        const simpanBiasa = async () =>{
            const { data, error } = await supabase
            .from('td_detensi')
            .update({ kd_status: 2 })
            .eq('id_detensi', props.datadetensi.id_detensi)
            if (!error){
                const simpanHistory = async () =>{
                    const { data, error } = await supabase
                    .from('th_detensi')
                    .insert([
                      { id_detensi: props.datadetensi.id_detensi, kd_status: 2 },
                    ])
                    if(!error){
                        history.push('/hdpsc')
                    }            
                }  
                simpanHistory()               
            }
        }
        simpanBiasa()
    }
    const handleUpload = async (e, a) =>{       
        const file = e.target.files[0]
        const name = e.target.files[0].name
        const namedok = a
        const { data, error } = await supabase
        .storage
        .from('dokumen')
        .upload(name , file)    
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
                alert("Sukses")
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
                <div style={{height:'100%'}} className="d-flex flex-column">
                    <div style={{width:'100%'}}>
                        <CDataTable
                        addTableClasses="josss mt-4"
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
                                    return(
                                        <td>
                                            <a target="_blank" href={linkdok} role="button" className="btn btn-info btn-sm">Download</a>
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
                                    <CButton color="danger">Batal</CButton>
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