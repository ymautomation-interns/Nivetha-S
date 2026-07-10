import { useState } from "react";
import "./LoginForm.css";

function LoginForm() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");


    const handleLogin = (e) => {

        e.preventDefault();


        // Validation

        if(email === "" || password === "") {

            setError("All fields are required");
            setSuccess("");

        }

        else if(password.length < 6) {

            setError("Password must contain minimum 6 characters");
            setSuccess("");

        }

        else {

            setError("");
            setSuccess("Login Successful");

        }

    };


    return (

        <div className="login-container">

            <h1>Login Form</h1>


            <form onSubmit={handleLogin}>


                <input
                    type="email"
                    placeholder="Enter Email"
                    value={email}
                    onChange={(e)=>setEmail(e.target.value)}
                />


                <input
                    type="password"
                    placeholder="Enter Password"
                    value={password}
                    onChange={(e)=>setPassword(e.target.value)}
                />


                <button type="submit">
                    Login
                </button>


            </form>


            {
                error && 
                <p className="error">
                    {error}
                </p>
            }


            {
                success && 
                <p className="success">
                    {success}
                </p>
            }


        </div>

    );
}

export default LoginForm;