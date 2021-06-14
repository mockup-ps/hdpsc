import React, { lazy, useEffect, useState, useRef } from 'react'
import Chart from 'chart.js'
import { 
    CCardBody,
    CCard,
    CCardHeader,
    CRow,
    CCol
 } from '@coreui/react';

const Kotak = () => {
    const referen = useRef(null);
    const [data, setData] = useState(
    [
        [
            {
                "label": "2016",
                "value": 90
            },
            {
                "label": "2017",
                "value": 50
            }  
        ],
        [
            {
                "label": "2016",
                "value": 30
            },
            {
                "label": "2017",
                "value": 40
            }  
        ]  
    ])
    const [warna, setWarna] = useState(['#02265d', '#f80e0e'])
    var myChart
    useEffect(() => {
        myChart = new Chart(referen.current, {
            type: 'horizontalBar',
            options: {
            maintainAspectRatio: true,
            scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true,
                        }
                    }],
                    xAxes: [{
                        ticks: {
                            suggestedMax: 10,
                            suggestedMin: 0
                        }
                    }],                    
            }
            },
            data: {
              labels: [2018,2019,2020],
              yAxisID:0,
              datasets: [
                {
                label: 'Fire Safety',    
                data: [1, 3, 6],
                backgroundColor: "#4472c4"
                },
                {
                label: 'Life Saving Appliances',            
                data: [2, 7, 8],
                backgroundColor: "#a5a5a5"
                },
                {
                label: 'Emergency System',            
                data: [7, 8, 3],
                backgroundColor: "#5b9bd5"
                }, 
                {
                label: 'Certificate and Documentation',            
                data: [6, 4, 2],
                backgroundColor: "#ed7d31"
                },    
                {
                label: 'Safety and Navigation',            
                data: [8, 3, 6],
                backgroundColor: "#ffc000"
                },  
                {
                label: 'Pollution Prevention',            
                data: [3, 7, 2],
                backgroundColor: "#70ad47"
                },                                                                                            
            ]
            }
          });  
      });
  return (
    <>
    <canvas ref={referen} />
    </>
  )
}

export default Kotak
