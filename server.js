//request: obter dados pro servidor http. traz informações da requisição feita para a api
//response(reply no fastify): devolve dados ao usuário conforme a requisição request feita pelo mesmo

//GET: buscar dados
//POST: criar dados
//PUT: alterar todos os dados
//DELETE: deletar dados
//PATCH: alterar apenas uma informação específica de um recurso, e não todos os dados

import { fastify } from 'fastify'
// import { DatabaseMemory } from './database-memory.js'
import { DatabasePostgres } from './database-postgres.js' 

const server = fastify()
// const database = new DatabaseMemory()
const database = new DatabasePostgres()

server.post('/videos', async (request, reply) => {
    const { title, description, duration } = request.body

    await database.create({
        title, // = title: title,
        description,
        duration,
    })

    return reply.status(201).send() //o status 201 indica que algo foi criado
})

server.get('/videos', async (request) => {
    const search = request.query.search
    console.log(search)

    const videos = await database.list(search)

    return videos
})

server.put('/videos/:id', async (request, reply) => {
    const videoId = request.params.id
    const { title, description, duration } = request.body

    await database.update(videoId, {
        title,
        description,
        duration,
    })

    return reply.status(204).send() //o status 204 indica uma resposta que teve sucesso, porém não apresenta conteúdo
}) 

server.delete('/videos/:id', async (request, reply) => {
    const videoId = request.params.id

    await database.delete(videoId)

    return reply.status(204).send()
})

server.listen({
    host: '0.0.0.0',
    port: process.env.PORT ?? 3333,
})

