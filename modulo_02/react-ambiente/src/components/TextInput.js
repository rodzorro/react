export default function TextInput(props){

    function handleInputChange(event){
        const newValue = event.currentTarget.value;
        props.onInputChange(newValue);
    }

    return (
        
        <div>

            <label htmlFor={props.id}>{props.LabelDescripition}</label>
            <input 
                autoFocus = {props.autoFocus}
                id={props.id} 
                className='border' 
                value={props.InputValue}
                type='text' 
                onChange={handleInputChange}
                 />            

        </div>
        
    );

}