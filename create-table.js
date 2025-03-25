import { sql } from './db.js'

sql`
    CREATE TABLE videos (
        id TEXT PRIMARY KEY,
        title   TEXT,
        description TEXT,
        duration INTEGER
    );
`.then(() => {
    console.log('Tabela criada!')
})

//.then serve para esperar o comando ser executado, para depois prosseguir