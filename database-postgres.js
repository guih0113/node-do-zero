import { randomUUID } from "node:crypto"
import { sql } from './db.js'

export class DatabasePostgres {

    async list(search) {
        let videos 

        if(search) {
            videos = await sql`select * from videos where title ilike ${'%' + search + '%'}`
        } else {
            videos = await sql`select * from videos`
        }
        //ilike descarta diferenças entre letras maiúsculas e minúsculas
        //%% busca a palavra no contexto inteiro, independente se está no final, meio ou começo
        //são operações assíncronas, ou seja, demoram um tempo para executar (await serve para aguardar as ações finalizarem para prosseguir executando o código)

        return videos
    }

    async create(video) {
        const videoId = randomUUID()
        const { title, description, duration } = video

        await sql`insert into videos (id, title, description, duration) VALUES (${videoId}, ${title}, ${description}, ${duration})`
    }

    async update(id, video) {
        const { title, description, duration } = video

        await sql`update videos set title = ${title}, description = ${description}, duration = ${duration} WHERE id = ${id}`
    }

    async delete(id) {
        await sql`delete from videos where id = ${id}`
    }
}