import type { FastifyRequest, FastifyReply  } from 'fastify'
import JWT from 'jsonwebtoken'

type JWTPayload = {
    sub: string
    role: 'student' | 'manager'    
}

export async function checkRequestJWT(request: FastifyRequest, reply: FastifyReply) {
    const token = request.headers.authorization
    
    if(!token) {
        return reply.status(401).send()
    }

    if(!process.env.JWT_SECRET) {
        throw new Error('JWT_SECRET must be set')
    }

    try {
        const payload = JWT.verify(token, process.env.JWT_SECRET) as JWTPayload
        request.user = payload
    } catch {
        return reply.status(401).send()
    }
    
}