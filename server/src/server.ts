import Fastify from 'fastify'
import cors from '@fastify/cors'
import { appRoutes } from './routes'
/**
 * Método HTTP: Get, Post, Put, Patch, Delete
*/

const app = Fastify()

app.register(cors)
app.register(appRoutes)


app.listen({
    port:3333,
})
.then(() => {
    console.log('HTTP Server running on port 3333')
})