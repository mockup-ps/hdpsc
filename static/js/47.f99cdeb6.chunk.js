(this["webpackJsonp@coreui/coreui-free-react-admin-template"]=this["webpackJsonp@coreui/coreui-free-react-admin-template"]||[]).push([[47],{638:function(e,t,n){"use strict";var c=n(672),s=Object(c.a)("https://ctvjpxocqeajngziaxji.supabase.co","eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTYyMzE4Mjc3OSwiZXhwIjoxOTM4NzU4Nzc5fQ.pCQD8_U0cgWJtgLbOh90kUGpxpOmpwzDmsfwKzj7PwE");t.a=s},784:function(e,t,n){"use strict";n.r(t);var c=n(660),s=n(634),a=n.n(s),i=n(639),r=n(164),l=n(43),j=n(630),d=n(628),o=n(1),b=n(162),u=n(638),O=n(19),f=n(20),x=function(){return Object(f.jsx)("div",{className:"d-flex flex-row justify-content-center",children:Object(f.jsx)("div",{children:Object(f.jsx)(d.f,{className:"btn btn-sm btn-success",children:Object(f.jsx)("i",{class:"fas fa-eye"})})})})},h=function(e){var t=Object(o.useState)(!1),n=Object(j.a)(t,2),c=n[0],s=n[1],O=Object(o.useState)([]),x=Object(j.a)(O,2),h=x[0],m=x[1],k=(Object(b.c)((function(e){return e.simView})),["Dit. KPLP","Dit. KAPEL","BKI","Kemenlu"]),p=Object(o.useState)(),y=Object(j.a)(p,2);y[0],y[1];return Object(o.useEffect)(Object(i.a)(a.a.mark((function t(){var n,c,s;return a.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,u.a.from("td_deficiency").select("\n        data, \n        id_deficiency\n        ").eq("id_detensi",e.datadetensi.id_detensi);case 2:n=t.sent,c=n.data,n.error,s=c.map((function(e){var t;return Object(l.a)(Object(l.a)({},e.data),{},(t={},Object(r.a)(t,"id_deficiency",e.id_deficiency),Object(r.a)(t,"responsiblero",k[e.data.responsiblero-1]),t))})),m(s),console.log(s);case 8:case"end":return t.stop()}}),t)}))),[]),Object(f.jsxs)(f.Fragment,{children:[Object(f.jsxs)(d.db,{size:"xl",show:c,onClose:function(){return s(!1)},children:[Object(f.jsx)(d.gb,{children:Object(f.jsx)("h5",{children:Object(f.jsx)("i",{children:"Correction Action Plan"})})}),Object(f.jsx)(d.eb,{children:Object(f.jsx)("div",{className:"mt-3",children:Object(f.jsx)(d.y,{addTableClasses:"josss",items:h,fields:[{key:"no",label:"No"},{key:"natureofdeficiency",label:"Nature of Deficiency"},{key:"actiontaken",label:"Code"},{key:"issuingauthority",label:"Issuing Authority"},{key:"actionplan",label:"Action Plan"},{key:"result",label:"Result"},{key:"remark",label:"Remarks"},{key:"doc",label:"Documentation"}],scopedSlots:{doc:function(e,t){return Object(f.jsx)("td",{children:Object(f.jsx)("div",{className:"d-flex justify-content-center",children:Object(f.jsx)(d.f,{className:"btn btn-success btn-sm",children:Object(f.jsx)("i",{class:"far fa-file"})})})})},result:function(e,t){return Object(f.jsx)("td",{children:Object(f.jsx)(d.Ib,{})})},remark:function(e,t){return Object(f.jsx)("td",{children:Object(f.jsxs)(d.ub,{children:[Object(f.jsx)("option",{value:"0",children:"NOT CLOSED"}),Object(f.jsx)("option",{value:"1",children:"CLOSED"})]})})},actiontaken:function(e,t){return Object(f.jsx)("td",{children:e.actiontaken.value})},responsiblero:function(e,t){return console.log(e),Object(f.jsx)("td",{children:e.responsiblero?"Yes":"No"})},no:function(e,t){return Object(f.jsx)("td",{children:t+1})},actionplan:function(e,t){return Object(f.jsx)("td",{children:Object(f.jsx)(d.Ib,{})})}}})})}),Object(f.jsx)(d.fb,{children:Object(f.jsxs)("div",{className:"d-flex justify-content-end",children:[Object(f.jsx)("div",{className:"mr-2",children:Object(f.jsx)(d.f,{onClick:function(){return s(!1)},color:"success",children:"Simpan"})}),Object(f.jsx)("div",{className:"mr-2",children:Object(f.jsx)(d.f,{onClick:function(){return s(!1)},color:"danger",children:"Batal"})})]})})]}),Object(f.jsx)("div",{className:"d-flex flex-row justify-content-center",children:Object(f.jsx)("div",{children:Object(f.jsx)(d.f,{onClick:function(){return s(!0)},className:"btn btn-sm btn-info",children:Object(f.jsx)("i",{class:"fas fa-wrench"})})})})]})},m=function(e){var t=Object(O.g)(),n=Object(b.b)();return Object(f.jsx)("div",{className:"d-flex flex-row justify-content-center",children:Object(f.jsx)("div",{children:Object(f.jsx)(d.f,{onClick:function(){return t.push("/hdpsc/edit"),void n({type:"set",datadetensi:e.datadetensi})},className:"btn btn-sm btn-warning",children:Object(f.jsx)("i",{class:"fas fa-pencil-alt"})})})})},k=n(653),p=n.n(k);t.default=function(){var e=Object(b.b)(),t=["Direktorat KPLP","Direktorat KAPEL","BKI","Kemenlu","Kemenkomarves"],n=Object(O.g)(),s=Object(o.useState)([]),k=Object(j.a)(s,2),y=k[0],g=k[1],v=Object(o.useState)([]),N=Object(j.a)(v,2),_=N[0],w=N[1],C=["success","primary","warning","info"],I=Object(o.useState)(!1),S=Object(j.a)(I,2),D=S[0],K=S[1],P=Object(b.c)((function(e){return e.simView})),A=Object(o.useState)({}),B=Object(j.a)(A,2),E=B[0],J=B[1],M=function(e){J(Object(l.a)(Object(l.a)({},E),{},Object(r.a)({},e.target.name,e.target.value)))},z=function(){var t=Object(i.a)(a.a.mark((function t(){var c,s,i;return a.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(!E.imokapal||!E.tgldetensi){t.next=9;break}return t.next=3,u.a.from("td_detensi").select("*").eq("data->imokapal",JSON.stringify(E.imokapal)).eq("data->tgldetensi",JSON.stringify(E.tgldetensi));case 3:c=t.sent,s=c.data,c.error,s.length?p.a.fire({icon:"error",title:"Oops...",text:"Data Detensi tersebut Sudah Pernah Diajukan Sebelumnya"}):((i={}).imokapal=E.imokapal,i.tgldetensi=E.tgldetensi,e({type:"set",initial:i}),p.a.fire({icon:"success",title:"Validasi Sukses",html:"Anda Akan Diarahkan ke Halaman Selanjutnya",timer:1500,timerProgressBar:!0}).then((function(e){n.push("/hdpsc/new")}))),t.next=10;break;case 9:console.log(E.imokapal,E.tgldetensi);case 10:case"end":return t.stop()}}),t)})));return function(){return t.apply(this,arguments)}}();return Object(o.useEffect)(Object(i.a)(a.a.mark((function e(){var t,n,c;return a.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,u.a.from("td_detensi").select("\n            id_detensi,\n            data,\n            tr_status (\n                kd_status,\n                ur_status\n            ),\n            th_detensi (\n                kd_status,\n                created_at,\n                createdby\n            )\n        ");case 2:return t=e.sent,e.next=5,u.a.from("tr_status").select("\n            kd_status,\n            ur_status\n        ");case 5:n=e.sent,c=t.data.map((function(e){return Object(l.a)(Object(l.a)(Object(l.a)(Object(r.a)({},"id_detensi",e.id_detensi),e.data),e.tr_status),{},Object(r.a)({},"histori",e.th_detensi))})),g(c),console.log(n);case 9:case"end":return e.stop()}}),e)}))),[]),Object(f.jsxs)(f.Fragment,{children:[Object(f.jsxs)(d.db,{show:D,onClose:function(){return K(!1)},children:[Object(f.jsx)(d.gb,{children:Object(f.jsx)("h5",{children:"Masukkan Data Awal"})}),Object(f.jsxs)(d.eb,{children:[Object(f.jsx)(d.tb,{children:Object(f.jsx)(d.u,{md:"12",children:Object(f.jsxs)(d.K,{children:[Object(f.jsx)(d.Z,{children:"Nomor IMO Kapal"}),Object(f.jsx)(d.P,{value:E.imokapal,name:"imokapal",onChange:function(e){return M(e)},type:"text"})]})})}),Object(f.jsx)(d.tb,{children:Object(f.jsx)(d.u,{md:"12",children:Object(f.jsxs)(d.K,{children:[Object(f.jsx)(d.Z,{children:"Tanggal Detensi"}),Object(f.jsx)(d.P,{value:E.tgldetensi,name:"tgldetensi",onChange:function(e){return M(e)},type:"date"})]})})})]}),Object(f.jsx)(d.fb,{children:Object(f.jsxs)("div",{className:"d-flex justify-content-end",children:[Object(f.jsx)("div",{className:"mr-2",children:Object(f.jsx)(d.f,{onClick:function(){return z()},color:"success",children:"Lanjutkan"})}),Object(f.jsx)("div",{className:"mr-2",children:Object(f.jsx)(d.f,{onClick:function(){return K(!1)},color:"danger",children:"Batal"})})]})})]}),Object(f.jsxs)(d.j,{children:[Object(f.jsx)(d.n,{children:Object(f.jsx)("h5",{children:"Data Detensi Kapal"})}),Object(f.jsxs)(d.k,{children:[1==P||2==P||3==P?Object(f.jsx)(f.Fragment,{children:Object(f.jsx)("div",{className:"d-flex justify-content-end mb-2",children:Object(f.jsxs)(d.f,{onClick:function(){return K(!0)},className:"btn btn-info",children:["Buat Baru ",Object(f.jsx)("i",{class:"fas fa-plus"})]})})}):Object(f.jsx)(f.Fragment,{}),Object(f.jsx)(d.y,{addTableClasses:"josss",items:y,fields:[{key:"no",label:"No",_style:{width:"5%"}},{key:"namakapal",label:"Nama Kapal"},{key:"imokapal",label:"Nomor IMO Kapal"},{key:"tgldetensi",label:"Tanggal Detensi"},{key:"status",label:"Status"},{key:"action",label:"Action"}],scopedSlots:{no:function(e,t){return Object(f.jsx)("td",{children:t+1})},status:function(e,t){return Object(f.jsx)("td",{children:Object(f.jsx)(d.b,{onClick:function(){!function(e){var t=_.indexOf(e),n=_.slice();-1!==t?n.splice(t,1):n=[].concat(Object(c.a)(_),[e]),w(n)}(t)},role:"button",color:C[parseInt(e.kd_status)-1],children:e.ur_status})})},action:function(e,t){return Object(f.jsx)("td",{children:1!=P&&2!=P&&3!=P||3!=e.kd_status?1==P||2==P||3==P?Object(f.jsx)(m,{datadetensi:e}):Object(f.jsx)(x,{}):Object(f.jsx)(h,{datadetensi:e})})},details:function(e,n){return console.log(e),Object(f.jsx)(d.v,{show:_.includes(n),children:e.histori.map((function(e){var n=new Date(e.created_at),c=n.getDate(),s=n.getMonth()+1,a=n.getFullYear(),i=n.getHours(),r=n.getMinutes(),l=n.getSeconds();return Object(f.jsxs)("div",{className:"d-flex flex-row justify-content-end mx-3 my-3",children:[Object(f.jsx)("div",{className:"d-flex flex-column justify-content-center mr-2",children:Object(f.jsx)(d.b,{color:C[parseInt(e.kd_status)-1],children:1==e.kd_status?"Initial Info":2==e.kd_status?"Cetakan Form A & B":3==e.kd_status?"Data Elektronik Form A & B":4==e.kd_status?"Corrective Action Plan":""})}),Object(f.jsxs)("div",{style:{minWidth:"15vw"},className:"d-flex flex-column",children:[1==c.toString().length?"0"+c:c,"-",1==s.toString().length?"0"+s:s,"-",a," ",i,":",r,":",l]}),Object(f.jsx)("div",{style:{minWidth:"15vw"},className:"d-flex flex-column",children:t[parseInt(e.createdby)-1]})]})}))})}}})]})]})]})}}}]);
//# sourceMappingURL=47.f99cdeb6.chunk.js.map