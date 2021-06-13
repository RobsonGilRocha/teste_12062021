const readlineSync = require('readline-sync');
const csv = require('csvtojson');
const utils = require('./utils');

async function app() {          
  const pontos = await csv({delimiter: ";"}).fromFile('pontos_taxi.csv'); 
  let op = 0;
  let enter = 0;
  let lat = -30.023927;
  let long = -51.219871;
  
  while(true) {   
    console.log('=== MENU ===');
    console.log('1. Listar todos os pontos de taxi');  
    console.log('2. Informar minha localização');  
    console.log('3. Encontrar pontos próximos');
    console.log('4. Buscar pontos por logradouro');  
    console.log('5. Terminar o programa\n');

    op = readlineSync.question('Escolha uma das opções: ');  
  
    if (op == 1) { 
      pontos.forEach(ponto => console.log(ponto.nome))
      enter = readlineSync.question('Aperte qualquer tecla para continuar.'); 

    } else if(op == 2) {    
        console.log('Informe sua localização:');
        lat = readlineSync.question('Digite sua latitude: ');  
        long = readlineSync.question('Digite sua longitude: ');
        console.log('Localização armazenada.\n');
        enter = readlineSync.question('Aperte qualquer tecla para continuar.');

    } else if (op == 3) {    
        if (lat === null || long === null) {    
            console.log('Informe sua localização primeiro');
            enter = readlineSync.question('Aperte qualquer tecla para continuar.');
          } else {
            console.log('Os pontos de taxi mais próximos são:');
    
            const pontosProximos = []
            pontos.forEach(ponto => { 
              pontosProximos.push({ 
                ...ponto, 
                distancia: utils.haversine(  
                  [parseFloat(lat), parseFloat(long)], 
                  [parseFloat(ponto.latitude.replace(",", ".")), parseFloat(ponto.longitude.replace(",", "."))]  
                )
              })
            })
    
            pontosProximos.sort(utils.comparaDistancia).slice(0, 3).forEach(ponto => console.log(`${ponto.nome} (${ponto.distancia}km)`))
            enter = readlineSync.question('Aperte qualquer tecla para continuar.');
          }

    } else if (op == 4) {      
        let busca = readlineSync.question('Digite todo ou parte do nome do logradouro: ');
        console.log(`Os pontos de taxi ao longo de ${busca.toUpperCase()} são:`);          
        const pontosBuscados = pontos.filter(ponto => ponto.logradouro.includes(busca.toUpperCase()));
        pontosBuscados.forEach(ponto => console.log(ponto.nome));
        enter = readlineSync.question('Aperte qualquer tecla para continuar.');

    } else if (op !== 5) {    
        console.log(' \n Digite uma opção valida! ',`${op}`,' não é opção valida \n \n ');
        enter = readlineSync.question('Aperte qualquer tecla para continuar.');
          
    } else if (op == 5){
        console.log(' \n Fim da aplicação \n \n ');
        break  
    }
             
    }
    
}

app() 
