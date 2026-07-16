import { useState } from "react";
import axios from "axios";
import "./App.css";


function App(){

const [file,setFile]=useState(null);
const [message,setMessage]=useState("");
const [students,setStudents]=useState([]);
const [view,setView]=useState("table");



const uploadFile=async(selectedFile)=>{


if(!selectedFile){

setMessage("Please select Excel file");
return;

}



const formData=new FormData();

formData.append("file",selectedFile);



try{


const uploadResponse=await axios.post(

"http://localhost:5000/upload",

formData,

{
headers:{
"Content-Type":"multipart/form-data"
}
}

);



setMessage(uploadResponse.data.message);




// Fetch data from database

const studentResponse=await axios.get(

"http://localhost:5000/students"

);



setStudents(studentResponse.data);



}

catch(error){

console.log(error);

setMessage(
error.response?.data?.message ||
"Upload Failed"
);

}


};







const handleFileChange=(e)=>{


const selectedFile=e.target.files[0];


setFile(selectedFile);


uploadFile(selectedFile);


};









// Download Excel with uploaded file name

const downloadExcel=()=>{


if(!file){

alert("Please upload Excel file first");

return;

}



const fileName=file.name.replace(/\.(xlsx|xls)$/,"");



window.open(

`http://localhost:5000/download/excel?name=${fileName}`,

"_blank"

);



};









// Download PDF with uploaded file name

const downloadPDF=()=>{


if(!file){

alert("Please upload Excel file first");

return;

}



const fileName=file.name.replace(/\.(xlsx|xls)$/,"");



window.open(

`http://localhost:5000/download/pdf?name=${fileName}`,

"_blank"

);



};








return(


<div className="page">


<div className="upload-container">



<h1>
Student Data Service
</h1>



<p className="subtitle">
Upload and manage student records
</p>






<div className="content">





<div className="upload-card">


<h2>
Upload Excel
</h2>






<div className="drop-box">



<input

id="excelUpload"

type="file"

hidden

accept=".xlsx,.xls"

onChange={handleFileChange}

/>





<div className="cloud">
☁
</div>



<h3>
Drag and drop files here
</h3>



<span>
- OR -
</span>





<label

htmlFor="excelUpload"

className="upload-file-btn"

>

Upload Excel File

</label>





{

file &&

<p className="selected-file">

{file.name}

</p>

}



</div>


</div>









<div className="files-card">


<h2>
Download Reports
</h2>



<div className="download">



<button onClick={downloadExcel}>

Download Excel

</button>




<button onClick={downloadPDF}>

Download PDF

</button>



</div>


</div>





</div>







<div className="message">

{message}

</div>









{

students.length>0 &&



<div className="student-section">



<h2 className="record-title">

Student Records

</h2>






<div className="switch">



<button

onClick={()=>setView("table")}

>

Table View

</button>




<button

onClick={()=>setView("card")}

>

Card View

</button>




</div>









{

view==="table" ?





<table>


<thead>


<tr>

<th>ID</th>

<th>Name</th>

<th>Age</th>

<th>Department</th>

<th>Email</th>

<th>Phone</th>


</tr>


</thead>






<tbody>



{

students.map((student)=>(



<tr key={student.id}>


<td>
{student.id}
</td>


<td>
{student.name}
</td>


<td>
{student.age}
</td>


<td>
{student.department}
</td>


<td>
{student.email}
</td>


<td>
{student.phone}
</td>



</tr>



))


}



</tbody>



</table>







:







<div className="cards">



{

students.map((student)=>(



<div

className="student-card"

key={student.id}

>



<h3>

{student.name}

</h3>



<p>
ID : {student.id}
</p>



<p>
Age : {student.age}
</p>



<p>
Department : {student.department}
</p>



<p>
Email : {student.email}
</p>



<p>
Phone : {student.phone}
</p>



</div>



))


}



</div>



}







</div>



}





</div>


</div>


)


}



export default App;