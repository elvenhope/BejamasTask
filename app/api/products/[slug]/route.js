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
    return payload;
}

export async function GET(request, { params }) {
    const page = params.slug
    try {
        const client = await clientPromise
        const db = client.db(process.env.DB_NAME)
        const products = await db
            .collection(process.env.ProductCollection_NAME)
            .find({})
            .skip((page - 1) * 6)
            .limit(6)
            .toArray()

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
        })
    } catch (e) {
        console.error(e)
        throw new Error(e).message
    }
}
