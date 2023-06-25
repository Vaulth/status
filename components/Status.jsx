import styles from '../styles/Status.module.css';
import iconStyles from "../styles/Icon.module.css";
import colorStyles from "../styles/Colors.module.css";
import Button from "../components/Button";
import * as Icon from "react-feather";
import React, { useState, useEffect } from "react"

var http = require('http');
var https = require('https');

function checkWebsite(url) {
    https
        .get(url, function (res) {
            console.log(url, res.statusCode);
            return true;
        })
        .on("error", function (e) {
            console.log(url, "unreachable");
            return false;
        });
}

export function useStatus() {
    const [status, setStatus] = useState({
        backend: false,
        dashboard: false,
        landingPage: false,
        support: false
    });

    useEffect(() => {
        function checkStatus() {
            setStatus({
                backend: checkWebsite("https://backend.vaulth.app/"),
                dashboard: checkWebsite("https://dashboard.vaulth.app/"),
                landingPage: checkWebsite("https://vaulth.app/"),
                support: checkWebsite("https://support.vaulth.app/"),
            });
        }

        checkStatus();
    }, []);
    return status;
}

export const Status = () => {
    const status = useStatus();

    const itemNumber = 1337;
    const stampNumber = 69;
    const artworkNumber = 420;

    const lastStamp = "SomeStamp123";
    const lastArtwork = "SomeArtwork123";

    return (
        <div className={styles.status}>
            <div className={styles.title}>Official <b>Vaulth</b> services status</div>
            <div className={styles.statusDiv}>
                <div className={styles.desc}>Services</div>
                <div className={styles.oneStat}><div className={styles.dot + " " + (status.backend ? colorStyles.successBg : colorStyles.errorBg)} />Backend is {status.backend ? <span className={colorStyles.success}>up and running</span> : <span className={colorStyles.error}>offline</span>}</div>
                <div className={styles.oneStat}><div className={styles.dot + " " + (status.dashboard ? colorStyles.successBg : colorStyles.errorBg)} />Dashboard is {status.dashboard ? <span className={colorStyles.success}>up and running</span> : <span className={colorStyles.error}>offline</span>}</div>
                <div className={styles.oneStat}><div className={styles.dot + " " + (status.landingPage ? colorStyles.successBg : colorStyles.errorBg)} />Landing-Page is {status.landingPage ? <span className={colorStyles.success}>up and running</span> : <span className={colorStyles.error}>offline</span>}</div>
                <div className={styles.oneStat}><div className={styles.dot + " " + (status.support ? colorStyles.successBg : colorStyles.errorBg)} />Support is {status.support ? <span className={colorStyles.success}>up and running</span> : <span className={colorStyles.error}>offline</span>}</div>
            </div>
            <div className={styles.statusDiv}>
                <div className={styles.desc}>Statistics</div>
                <div >
                    <div className={styles.oneStat}><Icon.File size={undefined} className={iconStyles.icon} /><b>{itemNumber}</b> Items</div>
                    <div className={styles.oneStat}><Icon.Hexagon size={undefined} className={iconStyles.icon} /><b>{stampNumber}</b> Stamps</div>
                    <div className={styles.oneStat}><Icon.Image size={undefined} className={iconStyles.icon} /><b>{artworkNumber}</b> Artworks</div>
                </div>
                <div>
                    <div className={styles.oneStat}><Icon.Hexagon size={undefined} className={iconStyles.icon} />Last Stamp <b>{lastStamp}</b></div>
                    <div className={styles.oneStat}><Icon.Image size={undefined} className={iconStyles.icon} />Last Artwork <b>{lastArtwork}</b></div>
                </div>
            </div>
        </div>
    );
}