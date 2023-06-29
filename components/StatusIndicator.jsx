import styles from '../styles/StatusIndicator.module.css';
import iconStyles from "../styles/Icon.module.css";
import colorStyles from "../styles/Colors.module.css";
import * as Icon from "react-feather";
import React, { useState, useEffect } from "react"

const axios = require("axios");

const STATUS = {
    Fetching: 0,
    Offline: 1,
    Running: 2,
};

const checkWebsite = async (url) => {
    let websiteStatus = STATUS.Offline;

    await axios.get(url)
        .then((response) => {
            console.log(response.latency);
            websiteStatus = STATUS.Running;
        })
        .catch((error) => {
            console.log("ERROR: checkWebsite ({" + url + "}): " + error.code);
            websiteStatus = STATUS.Offline;
        })

    return websiteStatus
}

export function useStatus(url) {
    const [status, setStatus] = useState(STATUS.Fetching);

    useEffect(() => {
        const checkStatus = async () => {
            setStatus(await checkWebsite(url));
        }

        checkStatus();
    }, [url]);

    return status;
}

export const StatusIndicator = ({ url, name }) => {
    const status = useStatus(url);
    let dot = undefined;

    const statusText = (status == STATUS.Running) ?
        <span className={colorStyles.success}>up and running</span> :
        <span className={colorStyles.error}>offline</span>;

    const text = (status == STATUS.Fetching) ?
        <span className={colorStyles.running}>Fetching {name.toLowerCase()}...</span> :
        <span>{name.charAt(0).toUpperCase() + name.slice(1).toLowerCase()} is {statusText}</span>;

    if (status == STATUS.Fetching) {
        dot = <div className={styles.dot + " " + colorStyles.runningBg} />
    } else if (status == STATUS.Offline) {
        dot = <div className={styles.dot + " " + colorStyles.errorBg} />
    } else {
        dot = <div className={styles.dot + " " + colorStyles.successBg} />
    }

    return (
        <div className={styles.oneStat}>
            {dot} {text}
        </div>
    );
}