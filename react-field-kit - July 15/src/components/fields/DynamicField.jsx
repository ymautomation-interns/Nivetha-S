import InputField from "./InputField";
import TextArea from "./TextArea";


function DynamicField({

type,
id,
label,
value,
onChange,
placeholder,
required,
maxLength,
showCounter,
error,
helperText


}){


if(type==="textarea"){

return(

<TextArea

id={id}

label={label}

value={value}

onChange={onChange}

placeholder={placeholder}

maxLength={maxLength}

showCounter={showCounter}

/>

)

}



return(

<InputField

id={id}

type={type}

label={label}

value={value}

onChange={onChange}

placeholder={placeholder}

required={required}

maxLength={maxLength}

error={error}

helperText={helperText}

/>

)


}


export default DynamicField;