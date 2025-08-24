// Leonardo_Batista66@hotmail.com

import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { db } from '../database/client.ts'
import { courses, users } from '../database/schema.ts'
import z from 'zod'
import JWT from 'jsonwebtoken'
import { eq } from 'drizzle-orm'
import { verify } from 'argon2'

export const loginRoute: FastifyPluginAsyncZod = async server => {
    server.post(
        '/sessions',
        {
            schema: {
                tags: ['auth'],
                summary: 'Login',
                description:
                    'Essa rota recebe um título e cria um novo curso no banco de dados.',
                body: z.object({
                    email: z.string(),
                    password: z.string()
                }),
                response: {
                    200: z.object({ token: z.string() }),
                    400: z.object({ message: z.string() }),
                }
            }
        },
        async (request, reply) => {
            const { email, password } = request.body

            const result = await db
                .select()
                .from(users)
                .where(eq(users.email, email))

            if (result.length === 0) {
                return reply
                    .status(400)
                    .send({ message: 'Credenciais inválidas' })
            }

            const user = result[0]

            const doesPasswordMatch = await verify(
                user.password as string,
                password
            )

            if (!doesPasswordMatch) {
                return reply
                    .status(400)
                    .send({ message: 'Credenciais inválidas' })
            }

            if (!process.env.JWT_SECRET) {
                throw new Error('JWT_SECRET must be set')
            }

            const token = JWT.sign(
                { sub: user.id, role: user.role },
                process.env.JWT_SECRET, {
                    expiresIn: '1h'
                }
            )

            return reply.status(200).send({ token })
        }
    )
}
