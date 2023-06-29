import '../styles/globals.css'
import { Sora } from "next/font/google";

const font = Sora({ subsets: ['latin'] });

function MyApp({ Component, pageProps }) {
    return (
        <main className={font.className}>
            <Component {...pageProps} />
            <div className={"circle1"} />
            <div className={"circle2"} />
            <div className={"circle1blur"} />
            <div className={"circle2blur"} />
            <div className={"circle3blur"} />
        </main>
    )
}

export default MyApp
