'use client'

import React, { useEffect, useState, useRef } from 'react'
import Image from 'next/image'
import style from '@/app/styles/header.module.scss'

function Header() {
    const [cart, updateCart] = useState()
    const [showCart, updateShowCart] = useState(false)
    const wrapperRef = useRef(null)
    useOutsideAlerter(wrapperRef)

    window.addEventListener('storage', () => {
        updateShowCart(true)
        updateCart(JSON.parse(localStorage.getItem('Cart')))
        // ...
    })

    useEffect(() => {
        updateCart(JSON.parse(localStorage.getItem('Cart')))
    }, [])

    function validCart() {
        if (cart) {
            if (cart.length > 0) {
                return cart
            }
        }
        return []
    }

    function deleteFromCart(itemID) {
        let indexToRemove
        for (let i = 0; i < cart.length; i++) {
            if (itemID == cart[i]._id) {
                indexToRemove = i
                break
            }
        }
        if (indexToRemove == 0 && cart.length == 1) {
            updateCart([])
            localStorage.setItem('Cart', JSON.stringify([]))
        } else {
            localStorage.setItem(
                'Cart',
                JSON.stringify(cart.splice(indexToRemove, 1))
            )
            updateCart(cart.splice(indexToRemove, 1))
        }
    }

    function deleteEverything() {
        updateCart([])
        localStorage.setItem('Cart', JSON.stringify([]))
    }

    function printItems() {
        let items = validCart()
        let output = []

        for (let i = 0; i < items.length; i++) {
            let item = items[i]
            output.push(
                <div className={style.cartItem} key={i}>
                    <div className={style.clearBtnDiv}>
                        <Image
                            src="/x.svg"
                            alt="Delete button"
                            width={18}
                            height={18}
                            style={{
                                marginLeft: 'auto',
                                cursor: 'pointer',
                            }}
                            onClick={(e) => deleteFromCart(item._id)}
                        />
                    </div>
                    <div className={style.cartItemContent}>
                        <div className={style.cartItemText}>
                            <span className={style.cartItemTitle}>
                                {item.name}
                            </span>
                            <span className={style.cartItemPrice}>
                                {getCurrency(item.currency)} {item.price}
                            </span>
                        </div>
                        <div className={style.cartItemPicture}>
                            <Image
                                src={item.image.src}
                                alt={item.image.alt}
                                width={150}
                                height={90}
                                style={{
                                    objectFit: 'contain',
                                }}
                            />
                        </div>
                    </div>
                </div>
            )
        }

        return output
    }

    function getCurrency(currency) {
        if (currency == 'USD') {
            return '$'
        }
    }

    function useOutsideAlerter(ref) {
        useEffect(() => {
            function handleClickOutside(event) {
                if (ref.current && !ref.current.contains(event.target)) {
                    updateShowCart(false)
                }
            }
            document.addEventListener('mousedown', handleClickOutside)
            return () => {
                document.removeEventListener('mousedown', handleClickOutside)
            }
        }, [ref])
    }

    return (
        <div className={style.Header}>
            <a href="/" className={style.title}>
                <Image src="/Logo.svg" alt="Logo" fill />
            </a>
            <div
                className={style.cartDiv}
                onClick={(e) => updateShowCart(true)}
            >
                <div className={style.cartIcon}>
                    <Image src="/shopping-cart.svg" alt="shopping cart" fill />
                </div>
                {validCart().length > 0 ? (
                    <div className={style.cartCount}>
                        <span>{cart.length}</span>
                    </div>
                ) : (
                    ''
                )}
            </div>
            {}
            {showCart ? (
                <div className={style.cartPopup} ref={wrapperRef}>
                    <div className={style.productList}>{printItems()}</div>
                    {cart.length > 0 ? (
                        <div
                            className={style.clearAll}
                            onClick={deleteEverything}
                        >
                            CLEAR
                        </div>
                    ) : (
                        <div className={style.emptyCart}>
                            <span>CART IS EMPTY</span>
                        </div>
                    )}
                </div>
            ) : (
                ''
            )}
        </div>
    )
}

{
    /*  */
}

export default Header
