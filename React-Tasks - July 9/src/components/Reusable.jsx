import { useState } from "react";
import Button from "./Button";
import Input from "./Input";
import "./Reusable.css";


function Reusable(){

    const [name, setName] = useState("");


    function handleSubmit(){

        alert("Hello " + name);

    }


    return(
        <div className="reusable-container">

            <h2>Reusable Components</h2>

            <div className="reusable-form">
            <Input
                placeholder="Enter Name"
                value={name}
                onChange={(e)=>setName(e.target.value)}
            />


            <Button onClick={handleSubmit}>
                Submit
            </Button>
            </div>

        </div>
    )

}


export default Reusable;