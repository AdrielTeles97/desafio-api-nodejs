import { test, expect } from 'vitest'
import request from 'supertest'
import { server } from '../app.ts'
import { faker } from '@faker-js/faker'
import { makeCouse } from '../tests/factories/make-course.ts'
import { makeAuthenticatedUser } from '../tests/factories/make-user.ts'


test('get course by id', async () => {
    await server.ready()

    const { token }  = await makeAuthenticatedUser('student')

    const course = await makeCouse()
    
    const response = await request(server.server)
        .get(`/courses/${course.id}`)
        .set('Authorization', token)

    expect(response.status).toEqual(200)
    expect(response.body).toEqual({
        course: {
            id: expect.any(String),
            title: expect.any(String),
            description: null,
        },
    })
})


test('return 404 for for non existing courses', async () => {

    await server.ready()

    const { token }  = await makeAuthenticatedUser('student')

    
    const response = await request(server.server)
        .get(`/courses/879e906b-b771-440f-80da-2b87405c0c48`)
        .set('Authorization', token)

    expect(response.status).toEqual(404)
})