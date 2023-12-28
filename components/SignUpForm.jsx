import styles from "../styles/SignUpForm.module.css";
import iconStyles from "../styles/Icon.module.css";
import Button from "../components/Button";
import { useState, useEffect } from "react";
import TextareaAutosize from "react-textarea-autosize";
import * as Icon from "react-feather";

export default function SignUpForm({ signUpForm, setSignUpForm }) {
    const [submitted, setSubmitted] = useState(false);
    const [toSend, setToSend] = useState({
        name: "",
        discordTag: "",
        email: "",
        country: "",
        entityType: "",
        message: "",
    });

    const handleChange = (e) => {
        setToSend({ ...toSend, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const response = await fetch("https://api.vaulth.app/sendmail", {
            method: "POST",
            headers: {
                Accept: 'application/json',
                "Content-Type": "application/json",
                "Backend-Secret": process.env.BACKEND_SECRET,
            },
            body: JSON.stringify({
                origin: "Application",
                sender: "vaulth.contact@gmail.com",
                object: "Application: " + toSend.fullName,
                message: JSON.stringify({
                    name: toSend.name,
                    discordTag: toSend.discordTag,
                    entityType: toSend.entityType,
                    email: toSend.email,
                    country: toSend.country,
                    message: toSend.message,

                }, null, 4)
            }),
        }).then(() => setSubmitted(true));
    };

    return (
        <div
            className={styles.signUpForm + " " + (signUpForm ? styles.visible : "")}
        >
            <div className={styles.signUpFormModal}>
                <div className={styles.titleBar}>
                    <div className={styles.title}>
                        <b>Application</b> Form
                    </div>
                    <div
                        className={styles.closeButton}
                        onClick={() => setSignUpForm(false)}
                    >
                        <Icon.X size={undefined} className={iconStyles.icon} />
                    </div>
                </div>
                <div className={styles.content}>
                    <div className={styles.contentTitle}>
                        Apply for <b>Vaulth</b>
                    </div>
                    <div className={styles.contentDesc}>
                        Try your luck to be one of the first artists to get accepted to <b>Vaulth Beta</b>. With us, you will be able to test out the platform during the development and be closely related to the developers. In the meantime, you can <a href="https://discord.gg/c6KFMhzyPk">join our discord server</a> to talk with us! <i>Fields marked with an asterisk (*) are required.</i>
                    </div>
                    <form className={styles.form} onSubmit={handleSubmit}>
                        <div className={styles.row}>
                            <div className={styles.field}>
                                <div className={styles.fieldTitle}>
                                    <Icon.User size={undefined} className={iconStyles.icon} style={{ "color": "rgba(var(--amber-10), 1)" }} />
                                    Name / Nickname *
                                </div>
                                <input
                                    className={styles.input}
                                    required={true}
                                    type="text"
                                    name="name"
                                    placeholder="John Doe"
                                    value={toSend.name}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className={styles.field}>
                                <div className={styles.fieldTitle}>
                                    <Icon.MessageCircle size={undefined} className={iconStyles.icon} style={{ "color": "rgba(var(--amber-10), 1)" }} />
                                    Discord Tag
                                </div>
                                <input
                                    className={styles.input}
                                    type="text"
                                    name="discordTag"
                                    placeholder="@johndoe"
                                    value={toSend.discordTag}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                        <div className={styles.row}>
                            <div className={styles.field}>
                                <div className={styles.fieldTitle}>
                                    <Icon.AtSign size={undefined} className={iconStyles.icon} style={{ "color": "rgba(var(--amber-10), 1)" }} />
                                    Email *
                                </div>
                                <input
                                    className={styles.input}
                                    required={true}
                                    type="email"
                                    name="email"
                                    placeholder="john.doe@domain.com"
                                    value={toSend.email}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className={styles.field}>
                                <div className={styles.fieldTitle}>
                                    <Icon.Map size={undefined} className={iconStyles.icon} style={{ "color": "rgba(var(--amber-10), 1)" }} />
                                    Country *
                                </div>
                                <input
                                    className={styles.input}
                                    required={true}
                                    type="text"
                                    name="country"
                                    placeholder="France"
                                    value={toSend.country}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                        <div className={styles.field}>
                                <div className={styles.fieldTitle}>
                                    <Icon.Box size={undefined} className={iconStyles.icon} style={{ "color": "rgba(var(--amber-10), 1)" }} />
                                    Entity you represent *
                                </div>
                                <input
                                    className={styles.input}
                                    required={true}
                                    type="text"
                                    name="entityType"
                                    placeholder="Collector / Art gallery / Artist"
                                    value={toSend.entityType}
                                    onChange={handleChange}
                                />
                            </div>
                        <div className={styles.field}>
                            <div className={styles.fieldTitle}>
                                <Icon.FileText size={undefined} className={iconStyles.icon} style={{ "color": "rgba(var(--amber-10), 1)" }} />
                                Why are you applying to vaulth? *
                            </div>
                            <TextareaAutosize
                                className={styles.input + " " + styles.textArea}
                                minRows="5"
                                required={true}
                                type="text"
                                name="message"
                                placeholder="I would like to apply..."
                                value={toSend.message}
                                onChange={handleChange}
                            />
                        </div>
                        <div className={styles.bottomRow}>
                            <button type="submit" className={styles.inputButton} >
                                <Button icon={<Icon.Send con size={undefined} className={iconStyles.icon} />} content={"Apply"} target_url={"/#"} />
                            </button>
                            {submitted && (
                                <div>
                                    <b>Application sent!</b> Check your emails, we will come back to you shortly.
                                </div>
                            )}
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
