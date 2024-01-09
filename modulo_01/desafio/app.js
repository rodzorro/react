// Agora você pode usar o Axios com require


async function BuscarDados(){

    let date_1 = document.getElementById('date_1').value;    
    let Region = document.getElementById('Region').value;
    
    let url =  `https://covid-api.com/api/reports/total?date=${date_1}&iso=${Region}`;
     
    let CovidData =   await axios(url)
    .then(  function (resposta){
        console.log(resposta.data);
        return resposta.data;
    });      


    let updateDate = new Date(CovidData.data.last_update);
    document.getElementById('ShowResult').innerHTML = `
    <span>Ultima Atualização:   ${updateDate.getDate().toString().padStart(2, '0')}-${(updateDate.getMonth()+1).toString().padStart(2, '0') }-${updateDate.getFullYear()}</span><br>
    <span>Casos Confirmados:    ${CovidData.data.confirmed.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span><br>
    <span>Mortes Confirmadas:   ${CovidData.data.deaths.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span><br>    
    <span>Recuperados:          ${CovidData.data.recovered.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span><br>
    <span>Média de fatalidades: ${CovidData.data.fatality_rate}</span>
    
    `;
    
}
