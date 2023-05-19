import React from 'react'
import style from '@/app/styles/featured.module.scss'
import Image from 'next/image'
import SimilarItems from './SimilarItems'

function FeaturedItem(props) {
    let item = props.featuredItem

    return (
        <>
            <div className={style.container}>
                <div className={style.header}>
                    <div className={style.title}>
                        <p>{item.name}</p>
                    </div>
                    <button className={style.desktop + ' ' + style.button}>
                        ADD TO CART
                    </button>
                </div>
                <div className={style.PictureContainer}>
                    <div className={style.picture}>
                        <Image
                            src={item.image.src}
                            alt={item.image.alt}
                            fill
                            style={{
                                objectFit: 'cover',
                            }}
                        />
                        <div className={style.pictureOverlay}>
                            <p>Photo of the day</p>
                        </div>
                    </div>
                </div>
                <button className={style.mobile + ' ' + style.button}>
                    ADD TO CART
                </button>
                <div className={style.footer}>
                    <div className={style.left}>
                        <div className={style.descHeader}>
                            <p>About {item.name}</p>
                        </div>
                        <div className={style.description}>
                            <p>{item.details.description}</p>
                        </div>
                    </div>
                    <div className={style.right}>
                        <SimilarItems
                            recommendations={item.details.recommendations}
                        />
                        <div className={style.details}>
                            <div className={style.descHeader}>
                                <p>Details</p>
                            </div>
                            <div className={style.descriptionBig}>
                                <p>
                                    Size: {item.details.dimmentions.width} x 
                                    {item.details.dimmentions.height}
                                </p>
								<p>Size: {item.details.size / 1024} MB </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default FeaturedItem
