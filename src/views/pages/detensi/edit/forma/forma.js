import {React, useEffect, useState} from 'react'
import {CDataTable, CRow, CCol, CCard, CCardBody, CForm, CFormGroup, CLabel, CInput, CSelect, CTabs, CNavItem, CNavLink, CNav, CTabContent, CTabPane, CButton} from '@coreui/react'
import { Document, Page } from 'react-pdf';
import supabase from '../../../../../supabase'
import { pdfjs } from 'react-pdf';
import DataKapal from './datakapal'
import DataInspeksi from './datainspeksi'
import DataPerusahaan from './dataperusahaan'
import DataSertifikat from './datasertifikat'
import DataAnnual from './dataannual'
import DataPenerbit from './datapenerbit'
import { useDispatch, useSelector } from 'react-redux';
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const Forma = (props) =>{
    const dispatch = useDispatch()
    const forma = useSelector((state)=>state.forma)
    const [numPages, setNumPages] = useState(null);
    const [pageNumber, setPageNumber] = useState(2);
    const [scale, setScale] = useState(20)
    const [url, setURL] = useState() 
    const [negara, setNegara] = useState([])   
    const onDocumentLoadSuccess = ({ numPages }) => {
        setNumPages(numPages);
    }
    useEffect(async() => {
        let { data: td_dokumen, error } = await supabase
        .from('td_dokumen')
        .select("url_dokumen")
        .eq('id_detensi', props.datadetensi.id_detensi) 
        .eq('kd_dokumen', 'forma')  
        setURL(td_dokumen[0].url_dokumen)
    },[]); 
    const handleSimpan = async () =>{
        // console.log("heheh")
        // console.log("hehe")
        const { data, error } = await supabase
        .from('td_detensi')
        .update({ data: forma })
        .eq('id_detensi', props.datadetensi.id_detensi)   
        if (error){
            alert(error)
        } else {
            alert("Sukses")
        }
    }    
    return(
        <>
        <CRow style={{minHeight:'90vh'}}>
            <CCol md="6">
                <div style={{height:'100%'}}>
                <embed src={url} type="application/pdf" width="100%" height="100%"/>                                    
                </div>                                             
            </CCol>
            <CCol md="6">
                <CTabs activeTab="datakapal">
                    <CNav variant="tabs">
                        <CNavItem>
                            <CNavLink data-tab="datakapal">
                                Kapal
                            </CNavLink>
                        </CNavItem>
                        <CNavItem>
                            <CNavLink data-tab="datainspeksi">
                                Inspeksi
                            </CNavLink>
                        </CNavItem> 
                        <CNavItem>
                            <CNavLink data-tab="dataperusahaan">
                                Perusahaan
                            </CNavLink>
                        </CNavItem> 
                        <CNavItem>
                            <CNavLink data-tab="sertifikat">
                                Sertifikat
                            </CNavLink>
                        </CNavItem>
                        <CNavItem>
                            <CNavLink data-tab="annualsurvey">
                                Survey
                            </CNavLink>
                        </CNavItem>
                        <CNavItem>
                            <CNavLink data-tab="penerbit">
                                Penerbit
                            </CNavLink>
                        </CNavItem>                                                                                                                        
                    </CNav>
                    <CTabContent>
                        <CTabPane data-tab="datakapal">
                            <DataKapal datadetensi={props.datadetensi} datadokumen={props.datadokumen}/>                                                   
                        </CTabPane>
                        <CTabPane data-tab="datainspeksi">
                            <DataInspeksi datadetensi={props.datadetensi} datadokumen={props.datadokumen}/>
                        </CTabPane>
                        <CTabPane data-tab="dataperusahaan">
                            <DataPerusahaan datadetensi={props.datadetensi} datadokumen={props.datadokumen}/>
                        </CTabPane>
                        <CTabPane data-tab="sertifikat">
                            <DataSertifikat datadetensi={props.datadetensi} datadokumen={props.datadokumen}/>
                        </CTabPane> 
                        <CTabPane data-tab="annualsurvey">
                            <DataAnnual datadetensi={props.datadetensi} datadokumen={props.datadokumen}/>
                        </CTabPane> 
                        <CTabPane data-tab="penerbit">
                            <DataPenerbit datadetensi={props.datadetensi} datadokumen={props.datadokumen}/>
                        </CTabPane>                                                                                              
                    </CTabContent>                    
                </CTabs>  
                <div className="d-flex justify-content-end">
                    <div className="mr-3">
                        <CButton onClick={()=>handleSimpan()} color="success">Simpan</CButton>                        
                    </div>                                   
                </div>                          
            </CCol>            
        </CRow>
        </>
    )
}

export default Forma