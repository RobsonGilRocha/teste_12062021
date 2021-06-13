const readlineSync = require('readline-sync');
const csv = require('csvtojson');
const utils = require('./utils');

async function app() {          
  const pontos = await csv({delimiter: ";"}).fromFile('pontos_taxi.csv'); 
  let op = 0 
  let enter = 0;
  let lat = 0;       //-30.023927;
  let long = 0;      //-51.219871;
  let limitgeo = [-29.855968,-30.285812,-50.981312,-51.367795];

/* lat maxima norte  -29.855968
   lat CENTRO        -30.023927
   lat maxima sul    -30.285812
   long maxima leste -50.981312
   long CENTRO       -51.219871
   long maxima oeste -51.367795
*/
  
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
         if (lat < limitgeo[0] && lat > limitgeo[1]  &&  long < limitgeo[2]  && long > limitgeo[3]) /* certo */{    
            console.log(`\nSua localizaão é ,latidude ${lat}`,` e lontitude ${long}`);
            enter = readlineSync.question('Aperte qualquer tecla para continuar.\n');
          } else {    
            console.log('\nDados invalidos');
            console.log('   Siga o exemplo para prencher os dados');
            console.log('   corretamente, latitude: \"-30.023927\", ');
            console.log('   longitude \"-51.219871\", qualquer outro valor não é valido');
            console.log('   qualquer outro valor não é valido');
            enter = readlineSync.question('\nAperte qualquer tecla para continuar.\n');
          }


    } else if (op == 3) {    
        if (lat === null || long === null) {    
            console.log('Informe sua localização primeiro');
            enter = readlineSync.question('Aperte qualquer tecla para continuar.');
          } else if (lat === null || long === null) {    
            console.log('Informe sua localização primeiro');
            enter = readlineSync.question('Aperte qualquer tecla para continuar.');
          } else if (lat === null || long === null) {    
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

    } else if (op <= 0 || op >= 6 ) {    
        console.log(' \n  nunberDigite uma opção valida! ',`${op}`,' não é opção valida \n \n ');
        enter = readlineSync.question('Aperte qualquer tecla para continuar.');
          
    } else if (op !== 5 && op !== "5" && op != 5 && op != "5"){
        console.log(' \nDigite uma opção valida! ',`${op}`,' não é opção valida \n \n ');
        enter = readlineSync.question('Aperte qualquer tecla para continuar.');
    } else if (op == "5" || op == 5){
        console.log(' \n Fim da aplicação \n \n ');
         break
    } else  {
        console.log(' \n Fim da aplicação \n \n ');
         app(false) 
    }
             
    }
    
}

app() 
