const readlineSync = require('readline-sync');
function oi(){
    let nome
    nome = readlineSync.question('Digite o seu nome: ')

    console.log(" \n \n HELLO WORLD",`${nome}`,"!!! \n \n \n ")
}
oi()