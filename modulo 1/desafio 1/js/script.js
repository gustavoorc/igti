let tabEncontrados = null;
let tabEstatistica = null;

let allEncontrados = [];
let filtroEncontrados = [];

let buttonPesq = null;
let input = null;

let countMens = 0;
let countWomans = 0;
let media = 0; 
let somaIdades = 0;

let numberFormat = null;

window.addEventListener('load', () => {
    tabEncontrados = document.querySelector('#tabEncontrados');
    tabEstatistica = document.querySelector('#tabEstatistica');
    buttonPesq = document.querySelector('#btnSrc');
    input = document.querySelector('#input');

    numberFormat = Intl.NumberFormat('pt-BR');

    fetchPeoples();
});


async function fetchPeoples(){
    const res = await fetch('https://randomuser.me/api/?seed=javascript&results=100&nat=BR&noinfo');
    const json = await res.json();


    allEncontrados = json.results.map(people => {
        const { name, picture, dob, gender} = people;

        return{
            name: name.first +" "+ name.last ,
            picture: picture.large ,
            age: dob.age,
            gender
        };
    });
    handler();
    
}

function handler(){
    carregaBotao();
    doEvent();
   
}

function carregaBotao(){
    input.addEventListener('input', () => {
        if(input.value != ""){
            buttonPesq.disabled = false;
        }else{
            buttonPesq.disabled = true;
        }

        
    })
}

function doEvent(){

    input.addEventListener('keyup', () => {
        if(event.key === 'Enter' && input.value != ""){
            filterPeople();
        }    
    });

    buttonPesq.addEventListener('click', ()=>{
        filterPeople();
    });
}


function filterPeople(){
    filtroEncontrados = allEncontrados.filter((people) => {
        const lowerCaseName = people.name.toLowerCase();
        const lowerCaseInput = input.value.toLowerCase();
        return lowerCaseName.includes(lowerCaseInput);
    }).sort((a,b) => {
        return a.name.localeCompare(b.name);
    });

    renderUsuario();
    
}

function renderUsuario(){
    console.log('entrou');
    let peoplesHTML =   `<div>
                            <h4> ${filtroEncontrados.length} pessoa(s) encontrada(s)</h4>'
    `

    filtroEncontrados.forEach(people => {
        const {name, picture, age, gender} = people;

        const peopleHTML = `
                <div class="user">
                    <img src="${picture}" alt="name">
                    <p> ${name}, ${age} anos </p>
                </div>
        `;

        peoplesHTML += peopleHTML;
    })

    peoplesHTML += '</div>'
    tabEncontrados.innerHTML = peoplesHTML;
    
    renderEstatistica();
}

function renderEstatistica(){

    countMens = 0;
    countWomans = 0;
    somaIdades = 0;
    

     filtroEncontrados.forEach(people => {
         const {name, picture, age, gender} = people;

         if(people.gender == 'female'){
             ++countWomans; 
         }else {
             ++countMens 
         }
         somaIdades += people.age;
        });

        media = somaIdades/filtroEncontrados.length;

         const estatisticaHTML = `
         <div>
            <div>
                <h4>Estastísticas</h4>
                <p> Homens: ${countMens}</p>
                <p> Mulheres: ${countWomans}</p>
                <p> Soma Idades: ${somaIdades}</p>
                <p> Média Idades: ${formatNumber(media)}</p>
                </div>
        </div>    
         `
         
     console.log(estatisticaHTML);

     tabEstatistica.innerHTML = estatisticaHTML;


}

function formatNumber(number){
    return numberFormat.format(number);
}