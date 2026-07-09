class Employee{
        constructor(id,name,age,salary,dept){
            this.id=id;
            this.name=name;
            this.age=age;
            this.salary=salary;
            this.dept=dept;
        }
    }
    
        let e=[new Employee(1,"Akash",24,25000,"IT") , 
        new Employee(2, "Priya", 27, 40000, "HR" ), 
        new Employee(3,"John",30,55000,"Finance"),
        new Employee(4,"Yogesh",22, 28000, "IT"),
        new Employee( 5, "Anu",26,35000,"HR")];
        
        for(let i=0;i<e.length;i++){
            if(e[i].dept==="IT"){
                console.log(e[i].name);
            }
        }
        
        console.log(" ");
        for(let i=0;i<e.length;i++){
            if(e[i].id==3){
                console.log(e[i].name);
            }
        }
        console.log(" ");
        
        for(let i=0;i<e.length;i++){
            if(e[i].id==2){
                console.log(i);
            }
        }
        console.log(" ");
        
        for(let i=0;i<e.length;i++){
            e[i].salary=e[i].salary*1.10;
            console.log(e[i].salary);
        }
        
        console.log(" ");
        
        let total=0;
        for(let i=0;i<e.length;i++){
            total=total+e[i].salary;
        }
        console.log(total);
        console.log(" ");
        
        for(let i=0;i<e.length-1;i++){
            for(let j=0;j<e.length-1;j++){
                if(e[j].salary>e[j+1].salary){
                    let temp=e[j];
                    e[j]=e[j+1];
                    e[j+1]=temp;
                }
            }
        }
        
for(let i=0;i<e.length;i++){
    console.log(e[i].salary);
}        
console.log(" ");
        
        
        for(let i=0;i<e.length-1;i++){
            for(let j=0;j<e.length-1;j++){
                if(e[j].salary<e[j+1].salary){
                    let temp=e[j];
                    e[j]=e[j+1];
                    e[j+1]=temp;
                }
            }
        }
        
        for(let i=0;i<e.length;i++){
            console.log(e[i].salary);
        }
        
        console.log(" ");
        
        let result=true;
        for(let i=0;i<e.length;i++){
            if(e[i].dept==="HR"){
             console.log("true"); 
             break;
            }
        }
        
        console.log(" ");
        
        let sal=true;
        for(let i=0;i<e.length;i++){
            if(e[i].salary>20000){
                console.log("true");
                break;
            }
        }
        console.log(" ");
        
        for(let i=0;i<e.length;i++){
            console.log(e[i].name);
        }
        
        console.log(" ");