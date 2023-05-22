import { NextResponse } from 'next/server'
import clientPromise from '@/app/lib/mongodb'

function chunkArray(myArray, chunk_size) {
    let index = 0
    let arrayLength = myArray.length
    let tempArray = []

    for (index = 0; index < arrayLength; index += chunk_size) {
        let myChunk = myArray.slice(index, index + chunk_size)

        tempArray.push(myChunk)
    }

    return tempArray
}

function generateNumbers(numOfPages) {
    let payload = []
    for (let i = 1; i < numOfPages + 1; i++) {
        payload.push(i)
    }
    payload = chunkArray(payload, 4)
    return payload
}

function compareByName(a, b) {
    if (a.name < b.name) {
        return -1
    }
    if (a.name > b.name) {
        return 1
    }
    return 0
}

function compareByPrice(a, b) {
    if (a.price < b.price) {
        return -1
    }
    if (a.price > b.price) {
        return 1
    }
    return 0
}

export async function GET(request, { params }) {
    const page = params.slug
    const orderChoice = 'Alphabetic'
    const orderDirection = 'Increasing'
    try {
        const client = await clientPromise
        const db = client.db(process.env.DB_NAME)
        let products = await db
            .collection(process.env.ProductCollection_NAME)
            .find({})
            .skip((page - 1) * 6)
            .limit(6)
            .toArray()


        if (orderChoice == 'Alphabetic') products.sort(compareByName)
        if (orderChoice == 'Price') products.sort(compareByPrice)

        
        const numberOfPages = Math.ceil(
            (await db.collection(process.env.ProductCollection_NAME).count()) /
                6
        )

        return NextResponse.json({
            products: products,
            pages: numberOfPages,
            curPage: page,
            minSet: 0,
            maxSet: Math.ceil(numberOfPages / 4) - 1,
            ordered_pages: generateNumbers(numberOfPages),
            orderChoice: orderChoice,
            orderDirection: orderDirection,
        })
    } catch (e) {
        console.error(e)
        throw new Error(e).message
    }
}

export async function POST(request, { params }) {
    const page = params.slug
    const reqData = await request.json()
    const orderChoice = reqData.orderChoice || 'Alphabetic'
    const orderDirection = reqData.orderDirection || 'Decreasing'
    try {
        const client = await clientPromise
        const db = client.db(process.env.DB_NAME)
        let products = await db
            .collection(process.env.ProductCollection_NAME)
            .find({})
            .skip((page - 1) * 6)
            .limit(6)
            .toArray()

        if (orderChoice == 'Alphabetic') products.sort(compareByName)
        if (orderChoice == 'Price') products.sort(compareByPrice)

        if (orderDirection == 'Decreasing') {
            products = products.reverse()
        }

        const numberOfPages = Math.ceil(
            (await db.collection(process.env.ProductCollection_NAME).count()) /
                6
        )

        return NextResponse.json({
            products: products,
            pages: numberOfPages,
            curPage: page,
            minSet: 0,
            maxSet: Math.ceil(numberOfPages / 4) - 1,
            ordered_pages: generateNumbers(numberOfPages),
            orderChoice: orderChoice,
            orderDirection: orderDirection,
        })
    } catch (e) {
        console.error(e)
        throw new Error(e).message
    }
}
