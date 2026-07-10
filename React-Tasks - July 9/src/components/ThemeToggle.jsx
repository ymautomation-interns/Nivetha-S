import { useState } from "react";
import "./ThemeToggle.css";


function ThemeToggle() {

    const [darkMode, setDarkMode] = useState(false);


    const toggleTheme = () => {
        setDarkMode(!darkMode);
    };


    return (

        <div className={darkMode ? "dark container" : "light container"}>


            <h1>
                Theme Toggle
            </h1>


            <h2>
                {
                    darkMode ? "Dark Mode" : "Light Mode"
                }
            </h2>


            <button onClick={toggleTheme}>

                {
                    darkMode ? "Switch to Light" : "Switch to Dark"
                }

            </button>


        </div>

    );

}


export default ThemeToggle;