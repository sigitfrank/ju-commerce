'use strict'

const Lab = require('@hapi/lab')
const { expect } = require('@hapi/code')
const { afterEach, beforeEach, describe, it } = exports.lab = Lab.script()
const { init } = require('../serverTest.js')

describe('GET ALL PRODUCTS: /api/v1/products', () => {
    let server
    beforeEach(async () => {
        server = await init()
    })
    afterEach(async () => {
        await server.stop()
    })
    it('responds with 200', async () => {
        const res = await server.inject({
            method: 'GET',
            url: '/api/v1/products?offset=0&limit=5',
            headers: {
                'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NiwiZnVsbG5hbWUiOiJTaWdpdCBUdW5nZ3VsIFdhc2tpdG8iLCJlbWFpbCI6ImxhbWFyZ3Q3MTlAZ21haWwuY29tIiwiY3JlYXRlZF9hdCI6IjIwMjItMDEtMTBUMTk6MjQ6MjIuNzE2WiIsInVwZGF0ZWRfYXQiOm51bGwsImlhdCI6MTY0MjAxMTExNH0.enSpJN4lGS_924oljYHzjxKZtuCxNRBhllfOdFlqXVg',

            }
        })
        expect(res.statusCode).to.equal(200)
        expect(res.result.status).to.be.a.boolean()
        expect(res.result.products).to.be.an.array()
    })
})

describe('GET PRODUCT DETAIL: /api/v1/products/{id}', () => {
    let server
    beforeEach(async () => {
        server = await init()
    })
    afterEach(async () => {
        await server.stop()
    })
    it('responds with 200', async () => {
        const res = await server.inject({
            method: 'GET',
            url: '/api/v1/products/592',
            headers: {
                'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NiwiZnVsbG5hbWUiOiJTaWdpdCBUdW5nZ3VsIFdhc2tpdG8iLCJlbWFpbCI6ImxhbWFyZ3Q3MTlAZ21haWwuY29tIiwiY3JlYXRlZF9hdCI6IjIwMjItMDEtMTBUMTk6MjQ6MjIuNzE2WiIsInVwZGF0ZWRfYXQiOm51bGwsImlhdCI6MTY0MjAxMTExNH0.enSpJN4lGS_924oljYHzjxKZtuCxNRBhllfOdFlqXVg',

            }
        })
        expect(res.statusCode).to.equal(200)
        expect(res.result.status).to.be.a.boolean()
        expect(res.result.product).to.be.an.object()
    })
})

describe('DELETE PRODUCT DETAIL: /api/v1/products/{id}', () => {
    let server
    beforeEach(async () => {
        server = await init()
    })
    afterEach(async () => {
        await server.stop()
    })
    it('responds with 200', async () => {
        const res = await server.inject({
            method: 'DELETE',
            url: '/api/v1/products/208',
            headers: {
                'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NiwiZnVsbG5hbWUiOiJTaWdpdCBUdW5nZ3VsIFdhc2tpdG8iLCJlbWFpbCI6ImxhbWFyZ3Q3MTlAZ21haWwuY29tIiwiY3JlYXRlZF9hdCI6IjIwMjItMDEtMTBUMTk6MjQ6MjIuNzE2WiIsInVwZGF0ZWRfYXQiOm51bGwsImlhdCI6MTY0MjAxMTExNH0.enSpJN4lGS_924oljYHzjxKZtuCxNRBhllfOdFlqXVg',

            }
        })
        expect(res.statusCode).to.equal(200)
        expect(res.result.status).to.be.a.boolean()
        expect(res.result.product).to.be.a.number()
    })
})