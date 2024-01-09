export default function Header(props){
    return (
        <header>      
            <div >
            <h1>{props.children}</h1>
            </div>
            
        </header>
        
    );
}