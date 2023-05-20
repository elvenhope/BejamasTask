import Header from '@/app/components/Header'
import style from '@/app/styles/homepage.module.scss'
import Products from '@/app/components/Products'

const dev = process.env.NODE_ENV !== 'production'
const server = dev
    ? 'http://localhost:3000'
    : 'https://your_deployment.server.com'

async function getProducts() {
    try {
        let response = await fetch(`${server}/api/products/1`)
        let readyResponse = await response.json()
        let products = readyResponse.products
        let curPage = readyResponse.curPage
        let numOfPages = readyResponse.pages
        let minSet = readyResponse.minSet
        let maxSet = readyResponse.maxSet
        let ordered_pages = readyResponse.ordered_pages

        let data = {
            products: products,
            curPage: curPage,
            numOfPages: numOfPages,
            minSet: minSet,
            maxSet: maxSet,
            ordered_Pages: ordered_pages,
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
    let featuredItem = products.filter(
        (product) => product.featured == true
    )[0]
    
    return (
        <>
            <div className={style.container}>
                <Header />
                <Products
                    products={products}
                    curPage={curPage}
                    numOfPages={numOfPages}
                    minSet={minSet}
                    maxSet={maxSet}
                    ordered_Pages={ordered_Pages}
                    featuredItem={featuredItem}
                />
            </div>
        </>
    )
}
