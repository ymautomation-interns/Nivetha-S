let e=[
"  Akash Kumar  ",
  "Priya Sharma",
  "John David",
  "Anu Priya",
  "Kiran Kumar",
  "Nivetha S",
  "Poorani Thirumurugan",
  "Tanisha Rafiq",
  "Arun Prakash",
  "Meena Lakshmi"
];
       
       for(let i=0;i<e.length;i++){
           let name=e[i].trim();
           let rev="";
           
           for(let j=name.length-1;j>=0;j--){
               rev+=name.charAt(j);
               
           }
           console.log(rev);
       }
       
       console.log(" ");
       
       for(let i=0;i<e.length;i++)
       {
           let name=e[i].trim();
           let words=name.split(" ");
           
           console.log(words.length);
       }
       
       console.log(" ");
       
       for(let i=0;i<e.length;i++){
           let name=e[i].trim();
           let fletter=name.charAt(0).toUpperCase();
           
           console.log(fletter+name.substring(1));
       }
       console.log(" ");
       
       for(let i=0;i<e.length;i++){
           let name=e[i].trim();
           console.log(name);
       }
       
       console.log(" ");
       
       
       
       for(let i=0;i<e.length;i++){
           let name=e[i].trim();
           let rev="";
           
           for(let j=name.length-1;j>=0;j--){
               rev+=name.charAt(j);
           }
               if(name === rev){
                   console.log("Palindrome");
               }
               else{
                   console.log("Not palindrome");
               }
           }
    
      console.log(" ");
       
       for(let i=0;i<e.length;i++){
          let name=e[i].toLowerCase();
         let count=0;
           
           for(let j=0;j<name.length;j++){
               let ch=name.charAt(j);
               
               if(ch=='a' || ch=='e' || ch=='i' || ch=='o' || ch=='u'){
                   count++;
               }
           }
           
          console.log(count);
       }
       
       console.log(" ");
       
       
       for(let i=0;i<e.length;i++){
           let name=e[i].toLowerCase();
           let count=0;
           
           for(let j=0;j<name.length;j++){
               let ch=name.charAt(j);
               if(ch>='a' && ch<='z'){
                  
               
               if(ch!='a' && ch!='e' && ch!='i' && ch!='o' && ch!='u'){
                   count++;
               }
               }
           }
           console.log(count);
       }
       console.log(" ");
       
       for(let i=0;i<e.length;i++){
           let name=e[i].trim();
           
           let result="";
           
           for(let j=0;j<name.length;j++){
               let ch=name.charAt(j);
               
               if(result.indexOf(ch)==-1){
                   result+=ch;
               }
           }
           console.log(result);
           
       }
       
       console.log(" ");