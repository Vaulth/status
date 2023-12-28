import styles from "../styles/NavBar.module.css";
import icon_styles from "../styles/Icon.module.css";
import Button from "../components/Button";
import * as Icon from "react-feather";
import { useEffect, useState } from "react";
import { signUpForm, setSignUpForm } from "./SignUpForm";
import { useWindowSize } from "../pages/index";
import Logo from "./Logo";

function Separator() {
    return <div className={styles.separator} />;
}

const Desktop = (signUpForm, setSignUpForm) => {
    return (
        <div className={styles.navbar}>
            <Logo />
            <div className={styles.content}>
                <Button
                    icon={<Icon.Home con size={undefined} className={icon_styles.icon} />}
                    content={"Home"}
                    target_url={"https://vaulth.app/"}
                />
                <div className={styles.separatorContainer}>
                <Separator />
                </div>
                <Button
                    shiny
                    icon={<Icon.ExternalLink con size={undefined} className={icon_styles.icon} />}
                    content={"Open App"}
                    target_url={"https://dashboard.vaulth.app/"}
                />
            </div>
        </div>
    );
};

const Mobile = (menu, setMenu, signUpForm, setSignUpForm) => {
    return (menu
        ? (
            <div>
                <div className={styles.mobileMenu}>
                    <Button
                        icon={<Icon.Home con size={undefined} className={icon_styles.icon} />}
                        content={"Home"}
                        target_url={"https://vaulth.app/"}
                    />
                    <Button
                        shiny
                        icon={<Icon.ExternalLink con size={undefined} className={icon_styles.icon} />}
                        content={"Open App"}
                        target_url={"https://dashboard.vaulth.app/"}
                    />
                </div>
                <div className={styles.navbar}>
                    <Logo />
                    <div onClick={() => setMenu(false)}>
                        <Button
                            icon={<Icon.X con size={undefined} className={icon_styles.icon} />}
                            content={"Menu"}
                            target_url={"#"}
                        />
                    </div>
                </div>
            </div>
        )
        : (
            <div className={styles.navbar}>
                <Logo />
                <div onClick={() => setMenu(true)}>
                    <Button
                        icon={<Icon.Menu con size={undefined} className={icon_styles.icon} />}
                        content={"Menu"}
                        target_url={"#"}
                    />
                </div>
            </div>
        ));
};

export const NavBar = ({ signUpForm, setSignUpForm }) => {
    const size = useWindowSize();
    const [menu, setMenu] = useState(false);

    return size.width < 1024 ? Mobile(menu, setMenu, signUpForm, setSignUpForm) : Desktop(signUpForm, setSignUpForm);
};
