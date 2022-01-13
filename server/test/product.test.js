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
                'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZnVsbG5hbWUiOiJTaWdpdCIsImVtYWlsIjoic2lnaXR0dDUzQGdtYWlsLmNvbSIsImNyZWF0ZWRfYXQiOiIyMDIyLTAxLTEzVDAxOjE2OjE0LjgzNVoiLCJ1cGRhdGVkX2F0IjpudWxsLCJpYXQiOjE2NDIwMzY5Mjd9.sP__EuuNVB_nSoN1RhhlY11aIbMaEE69eULlCVy1eI8',

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
            url: '/api/v1/products/1',
            headers: {
                'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZnVsbG5hbWUiOiJTaWdpdCIsImVtYWlsIjoic2lnaXR0dDUzQGdtYWlsLmNvbSIsImNyZWF0ZWRfYXQiOiIyMDIyLTAxLTEzVDAxOjE2OjE0LjgzNVoiLCJ1cGRhdGVkX2F0IjpudWxsLCJpYXQiOjE2NDIwMzY5Mjd9.sP__EuuNVB_nSoN1RhhlY11aIbMaEE69eULlCVy1eI8',

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
            url: '/api/v1/products/1',
            headers: {
                'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZnVsbG5hbWUiOiJTaWdpdCIsImVtYWlsIjoic2lnaXR0dDUzQGdtYWlsLmNvbSIsImNyZWF0ZWRfYXQiOiIyMDIyLTAxLTEzVDAxOjE2OjE0LjgzNVoiLCJ1cGRhdGVkX2F0IjpudWxsLCJpYXQiOjE2NDIwMzY5Mjd9.sP__EuuNVB_nSoN1RhhlY11aIbMaEE69eULlCVy1eI8',

            }
        })
        expect(res.statusCode).to.equal(200)
        expect(res.result.status).to.be.a.boolean()
        expect(res.result.product).to.be.a.number()
    })
})