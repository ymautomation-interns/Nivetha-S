const PDFDocument = require("pdfkit");
const express = require("express");
const cors = require("cors");
const multer = require("multer");
const XLSX = require("xlsx");
const ExcelJS = require("exceljs");
const path = require("path");
const pool = require("./db");


const app = express();


app.use(cors());
app.use(express.json());



const upload = multer({
    dest:"uploads/"
});


// Store uploaded file name

let uploadedFileName = "students";





// Home

app.get("/",(req,res)=>{

    res.send("Student Data Service API Running...");

});







// Get Students

app.get("/students",async(req,res)=>{

try{


const result = await pool.query(

"SELECT * FROM students ORDER BY id"

);


res.json(result.rows);



}

catch(err){

console.log(err);


res.status(500).json({

message:err.message

});


}


});









// Upload Excel Dynamic Columns


app.post(
"/upload",
upload.single("file"),
async(req,res)=>{


try{


console.log(
"Original File:",
req.file.originalname
);



uploadedFileName =
path.parse(req.file.originalname).name;



const workbook =
XLSX.readFile(req.file.path);



const sheet =
workbook.Sheets[
workbook.SheetNames[0]
];



const data =
XLSX.utils.sheet_to_json(sheet);




// remove previous data

await pool.query(
"DELETE FROM students"
);






for(const row of data){



const name =
row.Name || row.name || null;


const age =
row.Age || row.age || null;


const department =
row.Department || row.department || null;


const email =
row.Email || row.email || null;


const phone =
row.Phone || row.phone || null;





await pool.query(

`
INSERT INTO students
(name,age,department,email,phone)

VALUES($1,$2,$3,$4,$5)

`,

[
name,
age,
department,
email,
phone
]


);



}




res.status(201).json({

message:"Excel uploaded successfully"

});



}


catch(err){


console.log(err);


res.status(500).json({

message:err.message

});


}



});











// Download Excel


app.get("/download/excel",

async(req,res)=>{


try{



const fileName =
req.query.name || uploadedFileName;




const result =
await pool.query(

"SELECT * FROM students ORDER BY id"

);




const workbook =
new ExcelJS.Workbook();



const worksheet =
workbook.addWorksheet("Students");





worksheet.columns=[


{
header:"ID",
key:"id",
width:10
},


{
header:"Name",
key:"name",
width:20
},


{
header:"Age",
key:"age",
width:10
},


{
header:"Department",
key:"department",
width:20
},


{
header:"Email",
key:"email",
width:30
},


{
header:"Phone",
key:"phone",
width:20
}


];





result.rows.forEach(student=>{

worksheet.addRow(student);

});





res.setHeader(

"Content-Type",

"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"

);





res.setHeader(

"Content-Disposition",

`attachment; filename="${fileName}.xlsx"`

);




await workbook.xlsx.write(res);


res.end();



}


catch(err){


console.log(err);


res.status(500).json({

message:err.message

});


}



});












// Download PDF


app.get("/download/pdf",

async(req,res)=>{


try{



const fileName =
req.query.name || uploadedFileName;





const result =
await pool.query(

"SELECT * FROM students ORDER BY id"

);





const doc =
new PDFDocument();





res.setHeader(

"Content-Type",

"application/pdf"

);





res.setHeader(

"Content-Disposition",

`attachment; filename="${fileName}.pdf"`

);





doc.pipe(res);





doc.fontSize(20)

.text(

"Student Report",

{
align:"center"
}

);



doc.moveDown();





result.rows.forEach(student=>{


doc.fontSize(12)

.text(
`ID : ${student.id}`
);


doc.text(
`Name : ${student.name || ""}`
);



if(student.age){

doc.text(
`Age : ${student.age}`
);

}



doc.text(
`Department : ${student.department || ""}`
);



if(student.email){

doc.text(
`Email : ${student.email}`
);

}



if(student.phone){

doc.text(
`Phone : ${student.phone}`
);

}



doc.moveDown();



});





doc.end();



}


catch(err){


console.log(err);


res.status(500).json({

message:err.message

});


}


});








app.listen(5000,()=>{


console.log(

"Server running on port 5000"

);


});