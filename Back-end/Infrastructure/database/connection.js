import mysql from 'mysql2/promise'

// const bd_usuario = 'us_tecdes_223_g1'; 
// const bd_usuario = 'root';
// // const bd_senha = 'ab1506';
// const bd_senha = 'root';
// // const bd_servidor = '10.67.22.216';
// const bd_servidor = 'localhost';
// const bd_porta = '3306';
// // const bd_banco = 'bd2_tcc_tecdes_223_g1';
// const bd_banco = 'Trecap_Controle';

// const bd_usuario = 'us_tecdes_223_g1'; 
const bd_usuario = 'root';
// const bd_senha = 'ab1506';
const bd_senha = 'root';
// const bd_servidor = '10.67.22.216';
const bd_servidor = 'localhost';
const bd_porta = '3306';
// const bd_banco = 'bd2_tcc_tecdes_223_g1';
const bd_banco = 'trecap_controle';
let connection;
    
const config = {
    host: bd_servidor, 
    port: bd_porta,
    user: bd_usuario, 
    password: bd_senha, 
    database: bd_banco, 
    waitForConnections : true, 
    connectionLimit : 10,
    queueLimit : 0, 
}
    /* 
        -queueLimit-
        O número máximo de solicitações de conexão que o pool enfileirará 
        antes de retornar um erro do getConnection. Se definido como 0, não 
        há limite para o número de solicitações de conexão enfileiradas. (Padrão: 0)
    */
try {
    connection = mysql.createPool(config);

    console.log('Chamou conexão MySql!'); 
    
} catch (error) { 
    console.log(error); 
} 

export default connection;
