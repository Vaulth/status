import styles from "../styles/Button.module.css";

export default function Button({content, icon, target_url, new_tab, shiny, text_color, bg_color}) {
    return (
        <div className={shiny ? styles.buttonShiny : styles.button} style={{"backgroundColor": "rgba(" + bg_color + ", 0.1)"}} onClick={ () => window.open(target_url, new_tab ? '_blank' : '_self')}>
            <div className={styles.buttonContent}>
                {icon ? <div className={shiny ? styles.iconShiny : styles.icon} style={{"color": "rgba(" + bg_color + ", 1)"}}>{icon}</div> : null}
                {content ? <div style={{"color": text_color}} >
                {content}
                </div> : null }
            </div>
        </div>
    );
}