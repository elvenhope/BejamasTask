'use client'

import React, { useState, useRef } from 'react'
import Product from '@/app/components/ProductSingle'
import style from '@/app/styles/products.module.scss'
import Pagination from './Pagination'
import FeaturedItem from '@/app/components/FeaturedItem'
import Image from 'next/image'
import Header from '@/app/components/Header'
import useSWR from 'swr'

const fetcher = (...args) => fetch(...args).then((res) => res.json())

async function getProducts(page, sorting) {
    try {
        const { response, error } = useSWR(
            `${process.env.SERVER}/api/products/${page}`,
            fetcher
        )
        await fetcher(address, {
            method: 'POST',
            body: JSON.stringify(sorting),
            headers: {
                'content-type': 'application/json',
            },
        })
        let readyResponse = response
        let products = readyResponse.products
        let curPage = readyResponse.curPage
        let numOfPages = readyResponse.pages
        let minSet = readyResponse.minSet
        let maxSet = readyResponse.maxSet
        let ordered_pages = readyResponse.ordered_pages
        let orderChoice = readyResponse.orderChoice
        let orderDirection = readyResponse.orderDirection

        let data = {
            products: products,
            curPage: curPage,
            numOfPages: numOfPages,
            minSet: minSet,
            maxSet: maxSet,
            ordered_Pages: ordered_pages,
            orderChoice: orderChoice,
            orderDirection: orderDirection,
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
        cart.forEach((item) => {
            if (item._id == product._id) {
                found = true
            }
        })
        if (!found) {
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
    const [orderChoice, updateOrderChoice] = useState(props.orderChoice)
    const [orderDirection, updateOrderDirection] = useState(
        props.orderDirection
    )
    const scrollPoint = useRef(null)

    async function changePage(page, sorting) {
        let sortingParam = sorting
        if (sortingParam == null) {
            sortingParam = {
                orderChoice: orderChoice,
                orderDirection: orderDirection,
            }
        }
        let data = await getProducts(page, sortingParam)
        updateProducts(data.products)
        updateCurPage(data.curPage)
        updateNumOfPages(data.numOfPages)
        updateMinSet(data.minSet)
        updateMaxSet(data.maxSet)
        updateOrdered_Pages(data.ordered_Pages)
        updateOrderChoice(data.orderChoice)
        updateOrderDirection(data.orderDirection)
    }

    function handleChange(event) {
        let newChoice = event.target.value
        // CALL FUNC
        let sortingParam = {
            orderChoice: newChoice,
            orderDirection: orderDirection,
        }

        changePage(curPage, sortingParam)
    }

    function changeDirection() {
        let NewDirection

        if (orderDirection == 'Decreasing') {
            NewDirection = 'Increasing'
        } else {
            NewDirection = 'Decreasing'
        }

        let sortingParam = {
            orderChoice: orderChoice,
            orderDirection: NewDirection,
        }

        changePage(curPage, sortingParam)
    }

    return (
        <>
            <Header />
            <FeaturedItem
                featuredItem={props.featuredItem}
                addToCart={addToCart}
            />
            <div className={style.pageContainer}>
                <div className={style.sort}>
                    <Image
                        src="/SortArrows.svg"
                        width={15}
                        height={15}
                        alt="sorting arrow"
                        style={{
                            cursor: 'pointer',
                        }}
                        onClick={changeDirection}
                    />
                    <span className={style.sortText}>Sort By</span>
                    <div className={style.select}>
                        <select value={orderChoice} onChange={handleChange}>
                            <option value="Alphabetic">Alphabetic</option>
                            <option value="Price">Price</option>
                        </select>
                        <span className={style.focus}></span>
                    </div>
                </div>
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
