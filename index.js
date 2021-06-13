const readlineSync = require('readline-sync'); 
const csv = require('csvtojson') 




function app(){
    let op = 0

    console.log('=== MENU ===') 
    console.log('1. Listar todos os pontos de taxi') 
    console.log('2. Informar minha localização') 
    console.log('3. Encontrar pontos próximos')
    console.log('4. Buscar pontos por logradouro')  
    console.log('5. Terminar o programa\n')

    op = readlineSync.question('Escolha uma das opções: ');

    console.log(op)
}
app()
