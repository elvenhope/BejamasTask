import React from 'react'
import style from '@/app/styles/products.module.scss'
import Image from 'next/image'

function Product(props) {
    let data = props.data

    function getCurrency(currency) {
        if (currency == 'USD') {
            return '$'
        }
    }

    return (
        <div className={style.productContainer}>
            <div className={style.ImageContainer}>
                <div className={style.ImageDiv}>
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
