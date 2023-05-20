import React, { useState } from 'react'
import style from '@/app/styles/products.module.scss'
import Image from 'next/image'

function Product(props) {
    let data = props.data
    const [showCartBtn, setShowCartBtn] = useState(false)
    
    function getCurrency(currency) {
        if (currency == 'USD') {
            return '$'
        }
    }

    function addToCart() {
        props.addToCart(data)
    }

    return (
        <div className={style.productContainer}>
            <div className={style.ImageContainer}>
                <div
                    className={style.ImageDiv}
                    onMouseEnter={() => setShowCartBtn(true)}
                    onMouseLeave={() => setShowCartBtn(false)}
                >
                    <Image
                        src={data.image.src}
                        alt={data.image.alt}
                        fill
                        style={{
                            objectFit: 'cover',
                        }}
                    />
                    {data.bestseller ? (
                        <div className={style.bestSeller}>
                            <p>Best Seller</p>
                        </div>
                    ) : (
                        ''
                    )}
                    {showCartBtn ? (
                        <div className={style.addToCartBtn} onClick={addToCart}>
                            <span>ADD TO CART</span>
                        </div>
                    ) : (
                        ''
                    )}

                    <div
                        className={style.addToCartBtn + ' ' + style.mobile}
                        onClick={addToCart}
                    >
                        <span>ADD TO CART</span>
                    </div>
                </div>
            </div>
            <div className={style.TextContainer}>
                <p className={style.category}>{data.category}</p>
                <p className={style.title}>{data.name}</p>
                <p className={style.price}>
                    {data.price} {getCurrency(data.currency)}
                </p>
            </div>
        </div>
    )
}

export default Product
