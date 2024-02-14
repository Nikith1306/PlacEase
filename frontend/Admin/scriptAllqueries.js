fetch("http://localhost:3000/Allqueries")
.then((data)=>{
    return data.json();// converted to object 
}).then((x)=>{
    console.log(x)
   let tableData="";
   let c=0
   x.filter((values)=>{
     c=c+1
      tableData+=`
  <tr>
  <td>${values._id}</td>
  <td>${values.companyname}</td>
  <td>${values.companyType}</td>
  <td>${values.queryid}</td>
  <td>${values.query}</td>
  <td>${values.studentName}</td>
  <td>${values.studentemail}</td>
  </tr>
  
  `
     
   
   })
   console.log(c)
   document.getElementById("table-body").innerHTML=tableData;
   
  
})
 

