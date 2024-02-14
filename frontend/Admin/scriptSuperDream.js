fetch("http://localhost:3000/Allqueries")
.then((data)=>{
    return data.json();// converted to object 
}).then((x)=>{
   query=[" ","when will the results be out","I didnt get my exam link","I didnt applied for exam due to technical glitch","I got shortlisted for dream , Can i apply Super Dream","query5"]
   let names=new Set()
   x.filter((values)=>{
     
      if(values.companyType==="Super-dream"){
        names.add(values.companyname)
      }
   })

   let tabledata="";
   names.forEach(element => {
      for(let i=1;i<=5;i++){
        let c=0
         x.filter((val)=>{
            if(val.companyType==="Super-dream" && val.companyname===element && val.queryid===i){
                c=c+1
            }
         })

         tabledata+=`
         <tr>
         <td>${element}</td>
         <td>Super-Dream</td>
         <td>${i}</td>
         <td>${query[i]}</td>
         <td>${c}</td>
        
       <td><button type="button" class="btn btn-success" id="${element}" onclick="myFunction(${i},${c})">Send</button></td>
         </tr>
         `
      }
   });
   document.getElementById("table-body").innerHTML=tabledata;
  
})
 
function myFunction(i, c) {
   if (c == 0) {
      alert("No queries are there");
   } else {
      var z = prompt("enter your answer here");
      console.log(z);
      const names = new Set();
      let a = event.srcElement.id;
      
      fetch("http://localhost:3000/Allqueries")
      .then((data) => {
         return data.json(); // converted to object 
      })
      .then((res) => {
         res.filter((x) => {
            if (x.companyname === a && x.queryid === i) {
               console.log(x.studentName);
               names.add(x.studentemail);
            }
         });
         
         const array = Array.from(names);
         
         // SMTP Configuration
         const smtpConfig = {
            host: "smtp.elasticemail.com", // Replace with your SMTP server host
            username: "nikith1306@gmail.com", // Replace with your SMTP username
            password: "7CD42032D086B61761A7A328C79A0E452FFD", // Replace with your SMTP password
         };
         
         // Send emails using SMTP
         Promise.all(
            array.map((email) => {
               return Email.send({
                  Host: smtpConfig.host,
                  Username: smtpConfig.username,
                  Password: smtpConfig.password,
                  To: email,
                  From: smtpConfig.username,
                  Subject: "This is the subject",
                  Body: z,
               });
            })
         )
            .then((results) => {
               results.forEach((message, index) => {
                  console.log(array[index], message);
                  // Handle the message result here if needed
               });

               // After sending emails, set query-count to "0" for this query
               res.forEach((query) => {
                  if (query.companyname === a && query.queryid === i) {
                     query.queryCount = 0;
                  }
               });

               // Now, you can update the website content with the modified query data
               // Assuming you have an element with an ID "query-count" to display the count
               const queryCountElement = document.getElementById("query-count");
               queryCountElement.textContent = "0"; // Update the website content

               // Update your backend with the modified query data (similar to previous code)
               fetch("http://localhost:3000/UpdateQueryCounts", {
                  method: "PUT",
                  headers: {
                     "Content-Type": "application/json",
                  },
                  body: JSON.stringify(res),
               })
                  .then((response) => response.json())
                  .then((data) => {
                     // Handle the response from the server if needed
                  })
                  .catch((error) => {
                     console.error("Error updating query counts:", error);
                  });
            })
            .catch((error) => {
               console.error("Error sending emails:", error);
            });
      });
}
}