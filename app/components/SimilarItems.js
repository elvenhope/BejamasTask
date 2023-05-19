import React from 'react'
import style from '@/app/styles/featured.module.scss'
import Image from 'next/image'

function SimilarItems(props) {
    let items = props.recommendations

    return (
        <>
            <div className={style.panel}>
                <div className={style.descHeader}>
                    <p>People also buy</p>
                </div>
                <div className={style.ImageRow}>
                    {items.map((item, i) => (
                        <div className={style.ImageContainer}>
                            <Image
                                src={item.src}
                                alt={item.alt}
                                fill
                                style={{
                                    objectFit: 'contain',
									objectPosition:'0% 0%'
                                }}
                            />
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}

export default SimilarItems
