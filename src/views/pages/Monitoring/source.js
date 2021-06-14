  const fieldviavalen = [
    { key: 'no', _style: { width: '3%'}, label:"No" },
    { key: 'namakapal', _style: { width: '30%'}, label:"Nama Kapal" },
    { key: 'tempatdetensi', _style: { width: '20%'}, label:"Tempat Inspeksi" },
    { key: 'tanggalmulai', _style: { width: '20%'}, label:"Tanggal Mulai Detensi" },
    { key: 'tanggalselesai', _style: { width: '20%'}, label:"Tanggal Selesai Detensi" },
    { key: 'action', _style: { width: '10%'}, label:"Aksi", filter: false },
  ]
  const fieldshipcertificate = [
    { key: 'no', _style: { width: '3%'}, label:"No" },
    { key: 'title', _style: { width: '25%'}, label:"Title" },
    { key: 'issuingauthority', label:"Issuing Authority" },
    { key: 'dateofissue', label:"Date of Issue" },
    { key: 'dateofexpiry', label:"Date of Expiry" },
    { key: 'action', _style: { width: '10%'}, label:"Aksi", filter: false },
  ]  
  const fieldinformation = [
    { key: 'no', _style: { width: '3%'}, label:"No" },
    { key: 'date', _style: { width: '25%'}, label:"Date" },
    { key: 'surveyingauthority', label:"Surveying Authority" },
    { key: 'place', label:"Place" },
    { key: 'action', _style: { width: '10%'}, label:"Aksi", filter: false },
  ] 
  const fieldformb = [
    { key: 'no',_style: { width: '3%'},  label:"No" },
    { key: 'code', _style: { width: '10%'}, label:"Code" },
    { key: 'nature',_style: { width: '20%'}, label:"Nature of Deficiency" },
    { key: 'convention',_style: { width: '15%'},  label:"Convention Reference"},
    { key: 'action',_style: { width: '10%'},  label:"Action Taken"},
    { key: 'responsible',_style: { width: '15%'}, label:"Responsible RO"},
    { key: 'RP',_style: { width: '3%'}, label:"RP"},
    { key: 'aksi',_style: { width: '10%'}, label:"Aksi"},
  ]  
  const fieldsubdefisiensi = [
    { key: 'no',_style: { width: '3%'},  label:"No" },
    { key: 'subdeficiencies', _style: { width: '35%'}, label:"Subdeficiencies" },
    { key: 'status', _style: { width: '25%'}, label:"Status" },
    { key: 'komentargovt', _style: { width: '10%'}, label:"Komentar Pemerintah" },
    { key: 'komentarro', _style: { width: '10%'}, label:"Komentar RO" },
    { key: 'action',_style: { width: '15%'},  label:"Action"}
  ]            

  export {fieldviavalen, fieldshipcertificate, fieldinformation, fieldformb, fieldsubdefisiensi}