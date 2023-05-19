'use client'
import React, { useEffect, useState } from 'react'
import style from '@/app/styles/products.module.scss'
import Image from 'next/image'

function Pagination(props) {
    const [pages, setPages] = useState([])
    let numOfPages = props.total
    let curPage = parseInt(props.current)
    let curSet = Math.ceil(curPage / 4) - 1

    function changeNumbers(arg) {
        curPage = arg
        props.changePage(curPage)
        displayNumbers()
    }

    function moveBackward() {
        let TargetPage = props.ordered_Pages[curSet - 1][0]
        changeNumbers(TargetPage)
    }

    function moveForward() {
        let TargetPage = props.ordered_Pages[curSet + 1][0]
        changeNumbers(TargetPage)
    }

    function displayNumbers() {
        let pages = props.ordered_Pages[curSet]
        let output = []

        for (let i = 0; i < pages.length; i++) {
            let number = pages[i]
            if (curPage == number) {
                output.push(
                    <div className={style.number + ' ' + style.curNum} key={i}>
                        {number}
                    </div>
                )
            } else {
                output.push(
                    <div
                        className={style.number}
                        key={i}
                        onClick={(e) => changeNumbers(number)}
                    >
                        {number}
                    </div>
                )
            }
        }
        setPages(output)
    }

    useEffect(() => {
        displayNumbers()
    }, [curSet])

    return (
        <div className={style.paginationContainer}>
            {curSet != props.minSet ? (
                <div className={style.moveArr} onClick={moveBackward}>
                    <Image
                        src="/backwardArr.svg"
                        alt="backwards Arrow"
                        fill
                        style={{
                            objectFit: 'contain',
                        }}
                    />
                </div>
            ) : (
                ''
            )}
            <div className={style.numContainer}>{pages}</div>
            {curSet != props.maxSet ? (
                <div className={style.moveArr} onClick={moveForward}>
                    <Image
                        src="/forwardArr.svg"
                        alt="forwards Arrow"
                        fill
                        style={{
                            objectFit: 'contain',
                        }}
                    />
                </div>
            ) : (
                ''
            )}
        </div>
    )
}

export default Pagination
