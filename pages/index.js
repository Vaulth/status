import { NavBar } from "../components/NavBar";
import { Notification } from "../components/Notification";
import { Status } from "../components/Status";
import styles from "../styles/Home.module.css";
import Head from 'next/head';
import * as Icon from "react-feather";
import { useEffect, useState } from "react";

function setDarkTheme() {
    document.documentElement.style.setProperty('--color', '255, 255, 255');
    document.documentElement.style.setProperty('--colorOnColor', '0, 0, 0');
}

function setLightTheme() {
    document.documentElement.style.setProperty('--colorOnColor', '255, 255, 255');
    document.documentElement.style.setProperty('--color', '0, 0, 0');
}

export function useSystemTheme() {
    const [systemTheme, setSystemTheme] = useState({
      dark: false
    });
  
    useEffect(() => {
        function handleThemeChange() {
            const theme = window.matchMedia('(prefers-color-scheme: dark)').matches;

            theme ? setDarkTheme() : setLightTheme();

            setSystemTheme({
              dark: theme
            });
          }
          
          window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', handleThemeChange);
           
          handleThemeChange();
          
          return () => window.matchMedia('(prefers-color-scheme: dark)').removeEventListener('change', handleThemeChange);
    }, []);
    return systemTheme;
}

export function useWindowSize() {
    const [windowSize, setWindowSize] = useState({
        width: undefined,
        height: undefined,
    });

    useEffect(() => {
        function handleResize() {
            setWindowSize({
                width: window.innerWidth,
                height: window.innerHeight,
            });
        }

        window.addEventListener("resize", handleResize);

        handleResize();

        return () => window.removeEventListener("resize", handleResize);
    }, []);
    return windowSize;
}

export default function Home() {
    const theme = useSystemTheme();

    return (
        <div className={styles.defaultPageWidth}>
            <Head>
                <title>Vaulth # Status</title>
            </Head>
            <Notification />
            <NavBar />
            <Status />
        </div>
    );
}
