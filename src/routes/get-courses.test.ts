import { test, expect } from 'vitest'
import request from 'supertest'
import { randomUUID } from 'node:crypto'
import { server } from '../app.ts'
import { faker } from '@faker-js/faker'
import { makeCouse } from '../tests/factories/make-course.ts'
import { makeAuthenticatedUser } from '../tests/factories/make-user.ts'


test('get courses', async () => {

    await server.ready()
    const { token }  = await makeAuthenticatedUser('manager')

    const titleId = randomUUID()

    const course = await makeCouse(titleId)
    
    const response = await request(server.server)
        .get(`/courses?search=${titleId}`)
        .set('Authorization', token)

    expect(response.status).toEqual(200)
    expect(response.body).toEqual({
        total: 1,
        courses: [
            {
                id: expect.any(String),
                title: titleId,
                enrollments: 0
            }
    ],
    })
    
})