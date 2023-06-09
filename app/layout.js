import './globals.scss'
import { Archivo } from 'next/font/google'

const archivo = Archivo({ subsets: ['latin'] })

export const metadata = {
    title: 'Samurai King Resting',
    description: 'Generated by create next app',
}

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body className={archivo.className}>
                {children}
            </body>
        </html>
    )
}
