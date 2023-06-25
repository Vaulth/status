import styles from "../styles/NavBar.module.css";
import icon_styles from "../styles/Icon.module.css";
import Button from "../components/Button";
import * as Icon from "react-feather";
import { useEffect, useState } from "react";
import { useWindowSize } from "../pages/index";
import Logo from "./Logo";

function Separator() {
    return <div className={styles.separator} />;
}

const Desktop = () => {
    return (
        <div className={styles.navbar}>
            <Logo text={"Status"} />
            <div className={styles.content}>
                <Button
                    shiny
                    icon={<Icon.ExternalLink size={undefined} className={icon_styles.icon} />}
                    content={"Open App"}
                    target_url={"https://dashboard.vaulth.app/"}
                />
            </div>
        </div>
    );
};

const Mobile = (menu, setMenu) => {
    return (menu
        ? (
            <div>
                <div className={styles.mobileMenu}>
                    <Button
                        shiny
                        icon={<Icon.ExternalLink size={undefined} className={icon_styles.icon} />}
                        content={"Open App"}
                        target_url={"https://dashboard.vaulth.app/"}
                    />
                </div>
                <div className={styles.navbar}>
                    <Logo text={"Status"} />
                    <div onClick={() => setMenu(false)}>
                        <Button
                            icon={<Icon.X size={undefined} className={icon_styles.icon} />}
                            content={"Menu"}
                            target_url={"#"}
                        />
                    </div>
                </div>
            </div>
        )
        : (
            <div className={styles.navbar}>
                <Logo text={"Status"} />
                <div onClick={() => setMenu(true)}>
                    <Button
                        icon={<Icon.Menu size={undefined} className={icon_styles.icon} />}
                        content={"Menu"}
                        target_url={"#"}
                    />
                </div>
            </div>
        ));
};

export const NavBar = () => {
    const size = useWindowSize();
    const [menu, setMenu] = useState(false);

    return size.width < 1024 ? Mobile(menu, setMenu) : Desktop();
};
