  //import fetch from 'node-fetch';
  
  
async function makeup() {
  const response = await fetch("http://makeup-api.herokuapp.com/api/v1/products.json");
        
   makeupCatalog = await response.json();
  
//   makeupCatalog = makeupCatalog.slice(0,26);

   makeuparray = Object.values(makeupCatalog);  
   
   await MostraFiltros();
   await EscolhaFiltros();   
   await retiraNull();
   await ordena(1);//PASSA O NUMERO 1 PARA ORDERNAR POR MELHOR AVALIADO AO    
                  //ETRAR NO SITE PELA PRIMEIRA VEZ

}

makeup();

async function ProcuraNome(event){
  
  let EscolhaNome = document.getElementById('filter-name').value;
  EscolhaNome = EscolhaNome.toUpperCase();

  if (event.keyCode === 8 ){
    makeuparray = Object.values(makeupCatalog);  
  }
  
  //AO BUSCAR POR NOME, OS SELECT DA MARCA E DO TIPO TRAZ 
  //TODOS E NAO SOMENTE O QUE FOI TRAZIDO PELO NOME PESQUISADO
  for (let makeupNome of makeuparray){

    makeupNome.name = makeupNome.name.toUpperCase();
    

    if ( makeupNome.name.slice(0,EscolhaNome.length ) !== EscolhaNome ) 
    {
      makeuparray = makeuparray.filter(item => item.id !== makeupNome.id);
    }
  }

  //await MostraFiltros();
  //await ordena();
}

async function EscolhaFiltros(){

  let EscolhaBrand = document.getElementById('filter-brand').value;
  let EscolhaType = document.getElementById('filter-type').value;
  let EscolhaNome = document.getElementById('filter-name').value;
  
  for (let makeupFilter of makeuparray){    
    
    if (EscolhaBrand === 'todos' && EscolhaType === 'todos') {
     // if (EscolhaNome.length > 0) ProcuraNome(EscolhaNome);
      return;
    }

    if (makeupFilter.brand != EscolhaBrand && EscolhaBrand !== 'todos' ){   
      makeuparray = makeuparray.filter(item => item.id !== makeupFilter.id);
    }

    if (EscolhaType !== 'todos'){

      if (makeupFilter.product_type != EscolhaType){
        makeuparray = makeuparray.filter(item => item.id !== makeupFilter.id);
            
      }
    }

  }
  //console.log(makeuparray);
}

async function ordena (){
  
  await EscolhaFiltros();

  let escolha = document.getElementById('sort-type').value;
  
  document.querySelector('.catalog').innerHTML = '';

  if (escolha == 1){makeuparray.sort((a,b) => a.rating - b.rating );}
  if (escolha == 2){makeuparray.sort((a,b) => a.price - b.price );}
  if (escolha == 3){makeuparray.sort((a,b) => b.price - a.price );}
  if (escolha == 4){makeuparray.sort((a,b) => a.name.trim().localeCompare(b.name.trim()));}
  if (escolha == 5){makeuparray.sort((a,b) => b.name.trim().localeCompare(a.name.trim()));}   

      for (let makeupSort of makeuparray ){
         productItem(makeupSort);        
        loadDetails(makeupSort);
      }
}

async function MostraFiltros(){
  
  
  let EscolhaBrand = document.getElementById('filter-brand').value;
  let EscolhaType  = document.getElementById('filter-type').value;
  let EscolhaNome  = document.getElementById('filter-name').value;  

  let OptionBrand = '<option value="todos">Todos</option>';
  let ExisteBrand = [];
  let OptionProductType = '<option value="todos">Todos</option>';
  let ExisteProductType = [];    
  
  makeuparray = Object.values(makeupCatalog);  

  if (EscolhaNome.length > 0) ProcuraNome(EscolhaNome);

  console.log(EscolhaNome.length);
  console.log(makeuparray);

  for (let MostraMarca of makeuparray){

    if (!ExisteBrand.includes(MostraMarca.brand)){
      ExisteBrand.push(MostraMarca.brand);
      if (MostraMarca.brand === EscolhaBrand){
        OptionBrand += `<option value="${MostraMarca.brand}" selected>${MostraMarca.brand}</option>`        
      }else {
        OptionBrand += `<option value="${MostraMarca.brand}">${MostraMarca.brand}</option>`
      }          

    }     
    if (MostraMarca.brand === EscolhaBrand){

      if (!ExisteProductType.includes(MostraMarca.product_type)){
        ExisteProductType.push(MostraMarca.product_type);
        if (MostraMarca.product_type === EscolhaType) {
          OptionProductType += `<option value="${MostraMarca.product_type}" selected>${MostraMarca.product_type}</option>`            
        }else{
          OptionProductType += `<option value="${MostraMarca.product_type}">${MostraMarca.product_type}</option>`            
        }      
      }                
    }

    if (EscolhaBrand === 'todos'){

      
      if (!ExisteProductType.includes(MostraMarca.product_type)){
        ExisteProductType.push(MostraMarca.product_type);
        if (MostraMarca.product_type === EscolhaType){
          OptionProductType += `<option value="${MostraMarca.product_type}" selected>${MostraMarca.product_type}</option>`            
        }else{
          OptionProductType += `<option value="${MostraMarca.product_type}">${MostraMarca.product_type}</option>`            
        }                 

      }                

    }    
  }
  
  document.querySelector('.MostraMarca').innerHTML = OptionBrand;
  document.querySelector('.MostraTipo').innerHTML = OptionProductType;
  await ordena();
  
}

async function retiraNull(){

  for (makeupNull of makeupCatalog){
   
    if  (makeupNull.price == null){
      
      makeupNull.price = 0;
    }
    else {
      makeupNull.price = Number(makeupNull.price);
    }
    if  (makeupNull.rating == null){
      makeupNull.rating = 0;
    }   else {
      makeupNull.rating = Number(makeupNull.rating);
    } 
    
  }
}


function productItem(product) {
 // let preco = (product.price * 5.50).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  const item = `<div class="product" data-name="${ product.name}" data-brand="${ product.brand}" data-type="${ product.product_type}" tabindex="${ product.id}">
  
  <section class="product-description">
    <h1 class="product-name">${ product.name}</h1>
    <div class="product-brands"><span class="product-brand background-brand">${product.brand}</span>
    <span class="product-brand background-price">R$ ${product.preco}</span></div>
  </section>
  
</div>`;
;

  document.querySelector('.catalog').innerHTML += item;
}
//EXEMPLO DO CÓDIGO PARA UM PRODUTOlet preco = (product.price * 5.50).toLocaleString('pfile:///home/rodrigo/Documentos/git/react/modulo_01/trabalho%20pratico/index.html?t-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
function productItem1(product) {
    
   let preco = (product.price * 5.50).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  const item = `<div class="product" data-name="${ product.name}" data-brand="${ product.brand}" data-type="${ product.product_type}" tabindex="${ product.id}">
  <figure class="product-figure">
    <img src="${product.image_link}" onerror="this.onerror=null; this.src='./img/unavailable.png';" >
  </figure>
  <section class="product-description">
    <h1 class="product-name">${ product.name}</h1>
    <div class="product-brands"><span class="product-brand background-brand">${product.brand}</span>
    <span class="product-brand background-price">R$ ${preco}</span></div>
  </section>
  
</div>`;

document.querySelector('.catalog').innerHTML += item;

}

//EXEMPLO DO CÓDIGO PARA OS DETALHES DE UM PRODUTO
function loadDetails(product) {
  let preco = (product.price * 5.50).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  let details = `<section class="product-details">

    <div class="details-row">
        <div>Brand</div>
        <div class="details-bar">
          <div class="details-bar-bg" >${product.brand}</div>
        </div>
    </div>
    <div class="details-row">
      <div>Price</div>
      <div class="details-bar">
        <div class="details-bar-bg" style="width= 250">${ preco }</div>
      </div>
    </div>
    <div class="details-row">
      <div>Rating</div>
      <div class="details-bar">
        <div class="details-bar-bg" style="width= 250">${ product.rating }</div>
      </div>
    </div>
    <div class="details-row">
      <div>Category</div>
      <div class="details-bar">
        <div class="details-bar-bg" style="width= 250">${ product.category }</div>
      </div>
    </div>
    <div class="details-row">
      <div>Product_type</div>
      <div class="details-bar">
        <div class="details-bar-bg" style="width= 250">${ product.product_type }</div>
      </div>
    </div>
      
    </section>`;

      document.querySelector('.catalog').innerHTML += details;
}
