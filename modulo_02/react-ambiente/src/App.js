import { useEffect,useState } from 'react';
import Header from './components/Header.js';
import Main from './components/Main.js';
import TextInput from './components/TextInput.js';
import DateInput from './components/DateInput.js';
import { getBirthFrom } from './funcoes/funcoes.js';
import Timer from './components/Timer.js';

function App() {
  const [name,setName] = useState('Rodrigo');
  const [birthDate,setBirthDate] = useState('2003-04-30');
 
  useEffect(()=>{
    document.title = name;
  },[name]);

  function handleNameChange(newName){    
    setName(newName);    
  }

  function handleDateChange(newBirthDate){
    setBirthDate(newBirthDate);
  }
  
  return (
    <>
      
      <Header>heact hello</Header>

      <Main>                              

        <div className='text-right'>
          <Timer />
        </div>

        <TextInput 
          id="InputName"
          LabelDescripition="Digite seu nome:" 
          InputValue = {name}
          onInputChange = {handleNameChange}
          autoFocus
        />

        <DateInput
          id="dateName"
          LabelDescription="Digite sua data de nascimento:"
          DateValue = {birthDate}
          onDateChange = {handleDateChange}
        />
        
        <p>O seu nome é {name} , com {name.length} caracteres e sua idade é {getBirthFrom(birthDate)}</p>           

      </Main>      

      {/* <Test number={10}>
      </Test> */}
    </>

    
  );
}

export default App;
