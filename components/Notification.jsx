import styles from '../styles/Notification.module.css';
import iconStyles from "../styles/Icon.module.css";
import Button from "../components/Button";
import * as Icon from "react-feather";

const removeNotification = () => document.getElementById("notification").remove();

export const Notification = () => {
    return (
        <div className={styles.notification} id={"notification"}>
            <div className={styles.content}>
                <div className={styles.title}>Coming <b>soon</b>!</div>
                <div>Vaulth is currently in <b>development</b>. Follow us on <b>social media</b> to be the first to recieve <b>news</b> about the launch date.</div>
                <div className={styles.buttons}>
                    <Button shiny icon={<Icon.Twitter size={undefined} className={iconStyles.icon} />} content={"Twitter"} target_url={"https://twitter.com/vaulthfr"} text_color={"rgba(var(--colorOnColor), 1)"}/>
                    <Button shiny icon={<Icon.Linkedin size={undefined} className={iconStyles.icon} />} content={"LinkedIn"} target_url={"https://www.linkedin.com/company/vaulthfr"} text_color={"rgba(var(--colorOnColor), 1)"}/>
                    <Button shiny icon={<Icon.GitHub size={undefined} className={iconStyles.icon} />} content={"GitHub"} target_url={"https://github.com/Vaulth"} text_color={"rgba(var(--colorOnColor), 1)"}/>
                    <Button shiny icon={<Icon.MessageCircle size={undefined} className={iconStyles.icon} />} content={"Discord"} target_url={"https://discord.gg/c6KFMhzyPk"} text_color={"rgba(var(--colorOnColor), 1)"}/>
                </div>
            </div>
            <div className={styles.closeButton} onClick={() => removeNotification()}>
                <Icon.X size={undefined} className={iconStyles.icon}/>
            </div>
        </div>
    );
}