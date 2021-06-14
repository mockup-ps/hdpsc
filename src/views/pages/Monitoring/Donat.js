import React, { lazy, useEffect, useState, useRef } from 'react'
import Chart from 'chart.js'
import { 
    CCardBody,
    CCard,
    CCardHeader,
    CRow,
    CCol
 } from '@coreui/react';

const Donat = (props) => {
    const referen = useRef(null);
    const [aidi, setID] = useState(null)
    const [data, setData] = useState([
        {
            "label": "Inspection",
            "value": 90
        },
        {
            "label": "Detain",
            "value": 10
        }       
    ])
    const [warna, setWarna] = useState(['#02265d', '#f80e0e'])
    var myChart
    useEffect(() => {
        myChart = new Chart(referen.current, {
            type: 'doughnut',
            options: {
              maintainAspectRatio: true
            },
            options: {
                tooltips: {
                    mode: 'single',
                    callbacks: {
                        label: function(tooltipItems, data) { 
                            return " " + data.labels[tooltipItems.index] + " : " + data.datasets[0].data[tooltipItems.index] + " (Click For Detail)"  ;
                        }
                    }
                },
            },
            data: {
              labels: data.map(d => d.label),
              datasets: [{
                data: data.map(d => d.value),
                backgroundColor: warna
              }]
            }
          });
        //   if(aidi == 0) {
        //       alert("Kamu Memilih Inspection")
        //   } else if (aidi == 1) {
        //       alert("Kamu Memilih Detention")
        //   }      
      });
      const handleClick = (evt) => {
        if(myChart.getElementAtEvent(evt)[0]){
            var activePoints = myChart.getElementAtEvent(evt)
            var id = activePoints[0]._index
            setID(id)
            props.kirimData(id)
        }
        // if (id == 0) {
        //     alert("Kamu memilih Inspection")
        // } else if (id == 1){
        //     alert("Kamu Memilih Detention")
        // }
      }
  return (
    <>
    <canvas onClick={handleClick} ref={referen} />
    </>
  )
}

export default Donat
