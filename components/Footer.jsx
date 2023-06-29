import styles from "../styles/Footer.module.css";
import Logo from "./Logo";

export default function Footer() {
    return (
        <div className={styles.footer}>
            <div className={styles.logo}>
                <Logo/>
            </div>
        </div>
    );
}
