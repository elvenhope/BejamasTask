import style from '@/app/styles/homepage.module.scss'
import Products from '@/app/components/Products'

async function getProducts() {
    try {
        console.log(process.env.SERVER)
        let response = await fetch(`${process.env.SERVER}/api/products/1`)
        let readyResponse = await response.json()
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
            orderDirection: orderDirection
        }

        return data
    } catch (e) {
        console.error(e)
    }
}

export default async function Home() {
    let data = await getProducts()
    let products = data.products
    let curPage = data.curPage
    let numOfPages = data.numOfPages
    let minSet = data.minSet
    let maxSet = data.maxSet
    let ordered_Pages = data.ordered_Pages
    let orderChoice = data.orderChoice
    let orderDirection = data.orderDirection
    let featuredItem = products.filter(
        (product) => product.featured == true
    )[0]
    
    return (
        <>
            <div className={style.container}>
                <Products
                    products={products}
                    curPage={curPage}
                    numOfPages={numOfPages}
                    minSet={minSet}
                    maxSet={maxSet}
                    ordered_Pages={ordered_Pages}
                    featuredItem={featuredItem}
                    orderChoice={orderChoice}
                    orderDirection={orderDirection}
                />
            </div>
        </>
    )
}
