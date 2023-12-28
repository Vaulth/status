import styles from "../styles/Footer.module.css";
import ContactForm from "../components/ContactForm";
import Logo from "./Logo";

function FooterLinkList({title, entries}) {
    return (
        <div className={styles.relative}>
            <div className={styles.title}>
                {title}
            </div>
            {entries.map(elem => {
                return (
                    <div className={styles.entry}>
                        <a href={elem.link} className={styles.link}>{elem.text}</a>
                    </div>
                );
            })}
        </div>
    );
}

export default function Footer() {
    return (
        <div className={styles.footer}>
            <div className={styles.logo}>
                <Logo/>
            </div>
        </div>
    );
}
