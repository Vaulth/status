import styles from "../styles/Logo.module.css";
import Image from "next/image";
import { useSystemTheme } from '../pages';
import * as Icon from "react-feather";
import { useWindowSize } from "../pages/index";

export default function Logo({text}) {
    const theme = useSystemTheme();
    const windowSize = useWindowSize();

    const logoWidth = windowSize.width > 1024 ? 34 : 28;
    const logoHeight = windowSize.width > 1024 ? 34 : 28;

    return (
        <div className={styles.logo}>
            <Image src={theme.dark ? "/logo512_inverted.png" : "/logo512.png"} alt={"vaulth logo"} width={logoWidth} height={logoHeight}/>
            <span className={styles.title}><b>Vaulth</b> {text}</span>
        </div>
    );
}
