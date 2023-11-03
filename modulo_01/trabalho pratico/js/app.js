//import fetch from 'node-fetch';

async function makeup() {
  const response = await fetch("http://makeup-api.herokuapp.com/api/v1/products.json");
   makeupCatalog = await response.json();
  
   makeupCatalog = makeupCatalog.slice(0,10);

   await MostraMarca();
   await retiraNull();
   await ordena(1);

}

makeup();

async function ordena (escolha){

  const makeuparray = Object.values(makeupCatalog);
  document.querySelector('.catalog').innerHTML = '';

  if (escolha == 1){makeuparray.sort((a,b) => a.rating - b.rating );}
  if (escolha == 2){makeuparray.sort((a,b) => a.price - b.price );}
  if (escolha == 3){makeuparray.sort((a,b) => b.price - a.price );}
  if (escolha == 4){makeuparray.sort((a,b) => a.name.trim().localeCompare(b.name.trim()));}
  if (escolha == 5){makeuparray.sort((a,b) => b.name.trim().localeCompare(a.name.trim()));}   

      for (let makeupSort of makeuparray )
        productItem(makeupSort);        
}

async function MostraMarca(){

  let MostraOption = '';
  for (let MostraMaca of makeupCatalog){
    //FAZER UM ARRAY PARA NAO MOSTRAR OS REPITIDOS
    MostraOption += `<option>${MostraMaca.brand}</option>`
  }
  console.log(MostraOption);
  document.querySelector('.MostraMarca').innerHTML = '<option>aaa</option>';
  
}

async function retiraNull(){

  for (makeupNull of makeupCatalog){
   
    if  (makeupNull.price == null){
      alert('price null ')
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

//EXEMPLO DO CÓDIGO PARA UM PRODUTO
function productItem(product) {
    
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
  let details = `<section class="product-details"><div class="details-row">
        <div>Brand</div>
        <div class="details-bar">
          <div class="details-bar-bg" style="width= 250">nyx</div>
        </div>
      </div><div class="details-row">
        <div>Price</div>
        <div class="details-bar">
          <div class="details-bar-bg" style="width= 250">10.49</div>
        </div>
      </div><div class="details-row">
        <div>Rating</div>
        <div class="details-bar">
          <div class="details-bar-bg" style="width= 250">5</div>
        </div>
      </div><div class="details-row">
        <div>Category</div>
        <div class="details-bar">
          <div class="details-bar-bg" style="width= 250"></div>
        </div>
      </div><div class="details-row">
        <div>Product_type</div>
        <div class="details-bar">
          <div class="details-bar-bg" style="width= 250">bronzer</div>
        </div>
      </div></section>`;
}
