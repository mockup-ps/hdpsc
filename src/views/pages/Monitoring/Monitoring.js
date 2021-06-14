import React, { lazy, useEffect, useState, useRef } from 'react'
import Donat from './Donat.js'
import Kotak from './Kotak.js'
import { 
    CCardBody,
    CCard,
    CCardHeader,
    CButton,
    CRow,
    CCol,
    CDataTable
 } from '@coreui/react';
 import {fieldviavalen, fieldshipcertificate, fieldinformation, fieldformb, fieldsubdefisiensi} from './source.js'

const Jos = (props) => {
    if(props.mantab == 1) {
        return (
            <>
                <CCard>
                <CCardHeader>
                    <h5>List of Detain</h5>
                </CCardHeader>
                <CCardBody>
                    <CDataTable
                    fields={fieldviavalen}
                    items={props.datadetain}
                    scopedSlots = {{
                        'action':
                          (item)=>(
                            <td>
                                <CButton onClick={() => props.calleback("jos")} size="sm" color="success">→</CButton>
                            </td>
                          )              
                      }}
                    />
                </CCardBody>
                </CCard>
            </>
        )
    } else if(props.mantab == 0) {
        return (
            <>
                <CCard>
                <CCardHeader>
                    <h5>List of Inspection</h5>
                </CCardHeader>
                <CCardBody>
                    <CDataTable
                    fields={fieldviavalen}
                    items={props.datainspection}
                    itemsPerPage="3"
                    pagination
                    scopedSlots = {{
                        'action':
                          (item)=>(
                            <td>
                                <CButton onClick={() => props.calleback("jos")} size="sm" color="success">→</CButton>
                            </td>
                          )              
                      }}
                    />
                </CCardBody>
                </CCard>
            </>
        )
    } else {
        return ""
    }
}
 
const Monitoring = (props) => {
    const [datadetain, setDatadetain] = useState([
        {
          no:1,
          namakapal:"MERATUS JIMBARAN",
          tempatdetensi:"INCHEON",
          tanggalmulai:"20/03/2020",
          tanggalselesai:"30/03/2020",
        },
        {
          no:2,
          namakapal:"MERAK JAYA",
          tempatdetensi:"TOKYO",
          tanggalmulai:"10/04/2020",
          tanggalselesai:"29/09/2020",
        },    
      ])
      const [datainspection, setDatainspection] = useState([
        {
          no:1,
          namakapal:"MV XIN RONG",
          tempatdetensi:"ARGENTINE",
          tanggalmulai:"-",
          tanggalselesai:"-",
        },
        {
          no:2,
          namakapal:"MT. SUNYIELD",
          tempatdetensi:"BRAZIL",
          tanggalmulai:"-",
          tanggalselesai:"-",
        }, 
        {
          no:3,
          namakapal:"MK ENERGY DUA",
          tempatdetensi:"COLOMBIA",
          tanggalmulai:"-",
          tanggalselesai:"-",
        },
        {
          no:4,
          namakapal:"AOM T1302",
          tempatdetensi:"CHINA",
          tanggalmulai:"-",
          tanggalselesai:"-",
        },
        {
          no:5,
          namakapal:"ABADI 5",
          tempatdetensi:"SPAIN",
          tanggalmulai:"-",
          tanggalselesai:"-",
        }, 
        {
          no:6,
          namakapal:"BG.HIGHLINE 58",
          tempatdetensi:"TOKYO",
          tanggalmulai:"-",
          tanggalselesai:"-",
        }, 
        {
          no:7,
          namakapal:"MT. MEHMET A",
          tempatdetensi:"OMAN",
          tanggalmulai:"-",
          tanggalselesai:"-",
        },                                          
      ])      
    const [mantab, setMantab] = useState(null)
    const handleData = (id) => {
        setMantab(id)
    }
    useEffect(() => {
        if(mantab == 0){
            window.scrollBy(0, 1000)
        } else if(mantab == 1) {
            window.scrollBy(0, 1000)
        }
        if(callback == "jos"){
            window.scrollBy(0, -1000)
            props.history.push('/helpkapal/form')
        }
      });
      const [callback, setCallback] = useState("")
    const handlecalleback = (item) => {
        setCallback(item)
      }
  return (
    <>
    <CRow>
        <CCol sm="6">
        <CCard>
        <CCardHeader><h5>Flag Performance 2020</h5><a><i>(Click Portion of the Chart for Details)</i></a>
        {/* <CButton onClick={()=>setMantab("hiya")} color="info">Hiya !</CButton>
        <CButton onClick={()=>setMantab("yahi")} color="danger">Yahi !</CButton> */}
        </CCardHeader>
        <CCardBody>
            <div>
            <Donat kirimData={handleData} />
            </div>            
        </CCardBody>
        </CCard>
        </CCol>
        <CCol sm="6">
        <CCard>
        <CCardHeader><h5>Detainable Items</h5><a><i>(In the Last 3 years)</i></a></CCardHeader>
        <CCardBody>
            <div>
            <Kotak/>
            </div>            
        </CCardBody>
        </CCard>
        </CCol>        
    </CRow>
    <CRow>
        <CCol sm="12">
            <Jos calleback={handlecalleback} datadetain={datadetain} datainspection={datainspection} mantab={mantab}/>
        </CCol>
    </CRow>
    </>
  )
}

export default Monitoring