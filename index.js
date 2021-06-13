const readlineSync = require('readline-sync'); // lib para ter ao input do usuario
const csv = require('csvtojson'); // lib para ler o arquivo CSV para JSON
const utils = require('./utils'); //acessando arquivo utils.js


async function app() {          // aplicação em si. Função principal
  const pontos = await csv({delimiter: ";"}).fromFile('pontos_taxi.csv'); // lendo o arquivo CSV
  let op = 0  //Menu vareavel opção
  let enter = 0; //Menu vareavel
  let lat = 0;       //-30.023927; rodoviaria de PoA
  let long = 0;      //-51.219871; rodoviaria de PoA 
  let limitgeo = [-29.855968,-30.285812,-50.981312,-51.367795]; //limit da latitude e longitude em lista

/* lat maxima norte  -29.855968 let limitgeo[0]
   lat CENTRO        -30.023927
   lat maxima sul    -30.285812 let limitgeo[1]
   long maxima leste -50.981312 let limitgeo[2]
   long CENTRO       -51.219871
   long maxima oeste -51.367795 let limitgeo[3]
*/
  
  while(true) {   //Menu da apliacação
    console.log('=== MENU ==='); // exibe na tela 
    console.log('1. Listar todos os pontos de taxi');  // exibe na tela 
    console.log('2. Informar minha localização');  // exibe na tela 
    console.log('3. Encontrar pontos próximos');// exibe na tela 
    console.log('4. Buscar pontos por logradouro');  // exibe na tela 
    console.log('5. Terminar o programa\n');// exibe na tela 

    op = readlineSync.question('Escolha uma das opções: ');  //exibe na tela e input do usuario
  
  
    if (op == 1) { //Menu opção
      pontos.forEach(ponto => console.log(ponto.nome))  //percorre lista e exibe na tela 
      enter = readlineSync.question('Aperte qualquer tecla para continuar.'); //exibe na tela e input do usuario

    } else if(op == 2) {    //Menu opção
        console.log('Informe sua localização:');
                lat = readlineSync.question('Digite sua latitude: ');  //exibe na tela e input do usuario
                long = readlineSync.question('Digite sua longitude: ');//exibe na tela e input do usuario
         if (lat < limitgeo[0] && lat > limitgeo[1]  &&  long < limitgeo[2]  && long > limitgeo[3]){    
            console.log(`\nSua localizaão é ,latidude ${lat}`,` e lontitude ${long}`);
            enter = readlineSync.question('Aperte qualquer tecla para continuar.\n'); //exibe na tela e input do usuario
          } else {    
            console.log('\nDados invalidos');//exibe na tela
            console.log('   Siga o exemplo para prencher os dados');//exibe na tela
            console.log('   corretamente, latitude: \"-30.023927\", ');//exibe na tela
            console.log('   longitude \"-51.219871\", qualquer outro valor não é valido');//exibe na tela
            console.log('   qualquer outro valor não é valido');//exibe na tela
            enter = readlineSync.question('\nAperte qualquer tecla para continuar.\n');//exibe na tela
          }


    } else if (op == 3) {    //Menu opção
        if (lat == "0" || long == "0") {    
            console.log('Informe sua localização primeiro');//exibe na tela
            enter = readlineSync.question('Aperte qualquer tecla para continuar.');//exibe na tela e input do usuario
          } else if (lat == 0 || long == 0) {    
            console.log('Informe sua localização primeiro');//exibe na tela
            enter = readlineSync.question('Aperte qualquer tecla para continuar.');//exibe na tela
          } else if (lat === null || long === null) {    
            console.log('Informe sua localização primeiro');//exibe na tela
            enter = readlineSync.question('Aperte qualquer tecla para continuar.');//exibe na tela e input do usuario
          } else {
            console.log('Os pontos de taxi mais próximos são:'); //exibe na tela
    
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

    } else if (op == 4) {     //Menu opção 
        let busca = readlineSync.question('Digite todo ou parte do nome do logradouro: ');
        console.log(`Os pontos de taxi ao longo de ${busca.toUpperCase()} são:`);          
        const pontosBuscados = pontos.filter(ponto => ponto.logradouro.includes(busca.toUpperCase()));
        pontosBuscados.forEach(ponto => console.log(ponto.nome));
        enter = readlineSync.question('Aperte qualquer tecla para continuar.');

    } else if (op <= 0 || op >= 6 ) {   //Menu opção invalida 
        console.log(' \n  nunberDigite uma opção valida! ',`${op}`,' não é opção valida \n \n ');//exibe na tela
        enter = readlineSync.question('Aperte qualquer tecla para continuar.');
          
    } else if (op !== 5 && op !== "5" && op != 5 && op != "5"){ //Menu opção invalida 
        console.log(' \nDigite uma opção valida! ',`${op}`,' não é opção valida \n \n ');//exibe na tela
        enter = readlineSync.question('Aperte qualquer tecla para continuar.'); //exibe na tela e input do usuario
    } else if (op == "5" || op == 5){    //Menu opção invalida 
        console.log(' \n Fim da aplicação \n \n '); //exibe na tela
         break // para sair da apliacação. "while"
    } else  {
        console.log(' \n Erro ,Fim da aplicação, tente novamente... \n \n '); //exibe na tela
         
    }
             
    }
    
}

app() // aplicação em si execução e final do codigo
