import { NavBar } from "../components/NavBar";
import { Notification } from "../components/Notification";
import { Status } from "../components/Status";
import styles from "../styles/Home.module.css";
import Head from 'next/head';
import * as Icon from "react-feather";
import { useEffect, useState } from "react";

function setDarkTheme() {
    document.documentElement.style.setProperty("--amber-1", "22, 18, 12");
    document.documentElement.style.setProperty("--amber-2", "29, 24, 15");
    document.documentElement.style.setProperty("--amber-3", "48, 32, 8");
    document.documentElement.style.setProperty("--amber-4", "63, 39, 0");
    document.documentElement.style.setProperty("--amber-5", "77, 48, 0");
    document.documentElement.style.setProperty("--amber-6", "92, 61, 5");
    document.documentElement.style.setProperty("--amber-7", "113, 79, 25");
    document.documentElement.style.setProperty("--amber-8", "143, 100, 36");
    document.documentElement.style.setProperty("--amber-9", "255, 197, 61");
    document.documentElement.style.setProperty("--amber-10", "255, 214, 10");
    document.documentElement.style.setProperty("--amber-11", "255, 202, 22");
    document.documentElement.style.setProperty("--amber-12", "255, 231, 179");
    document.documentElement.style.setProperty("--gray-12", "238, 238, 238");
  }
  
  function setLightTheme() {
    document.documentElement.style.setProperty("--amber-1", "22, 18, 12");
    document.documentElement.style.setProperty("--amber-2", "29, 24, 15");
    document.documentElement.style.setProperty("--amber-3", "48, 32, 8");
    document.documentElement.style.setProperty("--amber-4", "63, 39, 0");
    document.documentElement.style.setProperty("--amber-5", "77, 48, 0");
    document.documentElement.style.setProperty("--amber-6", "92, 61, 5");
    document.documentElement.style.setProperty("--amber-7", "113, 79, 25");
    document.documentElement.style.setProperty("--amber-8", "143, 100, 36");
    document.documentElement.style.setProperty("--amber-9", "255, 197, 61");
    document.documentElement.style.setProperty("--amber-10", "255, 214, 10");
    document.documentElement.style.setProperty("--amber-11", "255, 202, 22");
    document.documentElement.style.setProperty("--amber-12", "255, 231, 179");
    document.documentElement.style.setProperty("--gray-12", "238, 238, 238");
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
                <title>Vaulth - Status</title>
            </Head>
            <Notification />
            <NavBar />
            <Status />
        </div>
    );
}
