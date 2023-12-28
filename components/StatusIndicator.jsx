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
    let websiteStatus = {
        status: STATUS.Offline,
        latency: "?"
    }
    let end = undefined;
    let start = new Date().getTime();

    await axios.get(url)
        .then((response) => {
            end = new Date().getTime();
            websiteStatus.status = STATUS.Running;
        })
        .catch((error) => {
            console.log(error);
            end = new Date().getTime();
            websiteStatus.status = STATUS.Offline;
        })

    websiteStatus.latency = end - start;

    return websiteStatus
}

export function useStatus(url) {
    const [status, setStatus] = useState({
        status: STATUS.Fetching,
        latency: "?"
    });

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
    let text = undefined;
    let latency = undefined;

    if (status.status == STATUS.Fetching) {
        dot = <div className={styles.dot + " " + colorStyles.runningBg} />;
        text = <span className={colorStyles.running}>Fetching {name.toLowerCase()}...</span>;
        latency = <i>{status.latency} ms</i>;
    } else if (status.status == STATUS.Offline) {
        dot = <div className={styles.dot + " " + colorStyles.errorBg} />;
        text = <span>{name.charAt(0).toUpperCase() + name.slice(1).toLowerCase()} is <span className={colorStyles.error}>offline</span></span>;
        latency = <i>{status.latency} ms</i>;
    } else {
        dot = <div className={styles.dot + " " + colorStyles.successBg} />;
        text = <span>{name.charAt(0).toUpperCase() + name.slice(1).toLowerCase()} is <span className={colorStyles.success}>up and running</span></span>;
        latency = <i>{status.latency} ms</i>;
    }

    return (
        <div className={styles.oneStat}>
            {dot}
            <span className={styles.space_between}>
                {text}
            </span>
            {latency}
        </div>
    );
}