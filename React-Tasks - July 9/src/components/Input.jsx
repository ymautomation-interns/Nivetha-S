import "./Input.css";

function Input({placeholder, value, onChange}){

    return(
        <input
            className="custom-input"
            type="text"
            placeholder={placeholder}
            value={value}
            onChange={onChange}
        />
    )

}

export default Input;