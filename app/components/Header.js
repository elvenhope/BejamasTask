import React from 'react'
import Image from 'next/image'
import style from '@/app/styles/header.module.scss'

function Header() {
    return (
        <div className={style.Header}>
            <a href='/' className={style.title}>
                <Image src="/Logo.svg" alt="Logo" fill />
            </a>
            <div className={style.cartDiv}>
                <div className={style.cartIcon}>
                    <Image src="/shopping-cart.svg" alt="shopping cart" fill />
                </div>
            </div>
        </div>
    )
}

export default Header
