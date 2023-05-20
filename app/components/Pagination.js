'use client'
import React, { useEffect, useState } from 'react'
import style from '@/app/styles/products.module.scss'
import Image from 'next/image'

function Pagination(props) {
    const [pages, setPages] = useState([])
    let numOfPages = props.total
    let curPage = parseInt(props.current)
    let curSet = Math.ceil(curPage / 4) - 1

    const executeScroll = () =>
        props.scrollPoint.current.scrollIntoView({
            behavior: 'smooth',
            block: 'start',
        })
    function changeNumbers(arg) {
        curPage = arg
        props.changePage(curPage)
        displayNumbers()
        executeScroll()
    }

    function moveBackward() {
        if(curPage == props.ordered_Pages[curSet][0]) {
            let TargetPage = props.ordered_Pages[curSet - 1][0]
            changeNumbers(TargetPage)
        } else {
            changeNumbers(curPage - 1)
        }
    }

    function moveForward() {
        if (
            curPage == props.ordered_Pages[curSet][props.ordered_Pages[curSet].length - 1]
        ) {
            let TargetPage = props.ordered_Pages[curSet + 1][0]
            changeNumbers(TargetPage)
        } else {
            changeNumbers(curPage + 1)
        }
    }

    function isTheFirstPage() {
        if(curPage == 1) {
            return true
        } else {
            return false
        }
    }

    function isTheLastPage() {
        if(curPage == props.ordered_Pages[props.maxSet][props.ordered_Pages[props.maxSet].length - 1]) {
            return true
        } else {
            return false
        }
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
            {!isTheFirstPage() ? (
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
            {!isTheLastPage() ? (
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
