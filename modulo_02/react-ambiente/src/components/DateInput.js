export default function DateInput(props){

    function handleDateChange(event){
        const newValue = event.currentTarget.value;
        props.onDateChange(newValue);
    }

    return (
        <div>
            <label htmlFor={props.id}>{props.LabelDescription}</label>
            <input
                id={props.id}
                value={props.DateValue}
                type="date"
                onChange={handleDateChange}
            />
        </div>
    );
}