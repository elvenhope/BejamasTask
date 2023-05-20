'use client'

import React, { useState, useRef } from 'react'
import Product from '@/app/components/ProductSingle'
import style from '@/app/styles/products.module.scss'
import Pagination from './Pagination'
import FeaturedItem from '@/app/components/FeaturedItem'

const dev = process.env.NODE_ENV !== 'production'
const server = dev
    ? 'http://localhost:3000'
    : 'https://your_deployment.server.com'

async function getProducts(page) {
    try {
        let response = await fetch(`${server}/api/products/${page}`)
        let readyResponse = await response.json()
        let products = readyResponse.products
        let curPage = readyResponse.curPage
        let numOfPages = readyResponse.pages
        let minSet = readyResponse.minSet
        let maxSet = readyResponse.maxSet
        let ordered_pages = readyResponse.ordered_pages

        let data = {
            products: products,
            curPage: curPage,
            numOfPages: numOfPages,
            minSet: minSet,
            maxSet: maxSet,
            ordered_Pages: ordered_pages,
        }

        return data
    } catch (e) {
        console.error(e)
    }
}

function addToCart(product) {
    let curCart = localStorage.getItem('Cart')
    if (curCart) {
        let found = false
        let cart = JSON.parse(curCart)
        cart.forEach(item => {
            if(item._id == product._id) {
                found = true
            }
        });
        if(!found) {
            cart.push(product)
            localStorage.setItem('Cart', JSON.stringify(cart))
            window.dispatchEvent(new Event('storage'))
        }
    } else {
        let cart = []
        cart.push(product)
        localStorage.setItem('Cart', JSON.stringify(cart))
        window.dispatchEvent(new Event('storage'))
    }
}

function products(props) {
    const [productsHolder, updateProducts] = useState(props.products)
    const [curPage, updateCurPage] = useState(props.curPage)
    const [numOfPages, updateNumOfPages] = useState(props.numOfPages)
    const [minSet, updateMinSet] = useState(props.minSet)
    const [maxSet, updateMaxSet] = useState(props.maxSet)
    const [ordered_Pages, updateOrdered_Pages] = useState(props.ordered_Pages)
    const scrollPoint = useRef(null)

    async function changePage(page) {
        let data = await getProducts(page)
        updateProducts(data.products)
        updateCurPage(data.curPage)
        updateNumOfPages(data.numOfPages)
        updateMinSet(data.minSet)
        updateMaxSet(data.maxSet)
        updateOrdered_Pages(data.ordered_Pages)
    }

    return (
        <>
            <FeaturedItem
                featuredItem={props.featuredItem}
                addToCart={addToCart}
            />
            <div className={style.pageContainer}>
                <div className={style.grid} ref={scrollPoint}>
                    {productsHolder.map((product, i) => (
                        <Product data={product} key={i} addToCart={addToCart} />
                    ))}
                </div>
                <Pagination
                    current={curPage}
                    total={numOfPages}
                    changePage={changePage}
                    minSet={minSet}
                    maxSet={maxSet}
                    ordered_Pages={ordered_Pages}
                    scrollPoint={scrollPoint}
                />
            </div>
        </>
    )
}

export default products
