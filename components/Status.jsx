import styles from '../styles/Status.module.css';
import iconStyles from "../styles/Icon.module.css";
import colorStyles from "../styles/Colors.module.css";
import * as Icon from "react-feather";
import React, { useState, useEffect } from "react"

const axios = require("axios");

const checkWebsite = async (url) => {
    await axios.get(url)
        .then((response) => {
            console.log(response.status);
            return true;
        })
        .catch((error) => {
            console.log("checkWebsite ({" + url + "}): " + error.code);
            return false;
        })
}

export function useStatus() {
    const [status, setStatus] = useState({
        backend: false,
        dashboard: false,
        landingPage: false,
        support: false,
        blog: false,
        portal: false
    });

    useEffect(() => {
        const checkStatus = async () => {
            setStatus({
                backend: await checkWebsite("https://backend.vaulth.app/"),
                dashboard: await checkWebsite("https://dashboard.vaulth.app/"),
                landingPage: await checkWebsite("https://vaulth.app/"),
                support: await checkWebsite("https://support.vaulth.app/"),
                blog: await checkWebsite("https://blog.vaulth.app/"),
                portal: await checkWebsite("https://portal.vaulth.app/"),
            });
        }

        checkStatus();
    }, []);

    return status;
}

export function useStatistics() {
    const [statistics, setStatistics] = useState({
        itemNumber: 1337,
        stampNumber: 69,
        artworkNumber: 420,
        lastStamp: "LestStamp123",
        lastArtwork: "LastArtwork123"
    });

    useEffect(() => {
        const getStatistics = async () => {
            await axios.get('http://backend.vaulth.app/analytics')
                .then((response) => {
                    setStatistics({
                        itemNumber: response.data.itemNumber,
                        stampNumber: response.data.stampNumber,
                        artworkNumber: response.data.artworkNumber,
                        lastStamp: response.data.lastStamp,
                        lastArtwork: response.data.lastArtwork
                    });
                })
                .catch((error) => {
                    console.log(error.code);
                })
        }

        getStatistics();
    }, []);

    return statistics;
}

export const Status = () => {
    const status = useStatus();
    const statistics = useStatistics();

    return (
        <div className={styles.status}>
            <div className={styles.title}>Official <b>Vaulth</b> services status</div>
            <div className={styles.statusDiv}>
                <div className={styles.desc}>Services</div>
                <div className={styles.oneStat}><div className={styles.dot + " " + (status.backend ? colorStyles.successBg : colorStyles.errorBg)} />Backend is {status.backend ? <span className={colorStyles.success}>up and running</span> : <span className={colorStyles.error}>offline</span>}</div>
                <div className={styles.oneStat}><div className={styles.dot + " " + (status.dashboard ? colorStyles.successBg : colorStyles.errorBg)} />Dashboard is {status.dashboard ? <span className={colorStyles.success}>up and running</span> : <span className={colorStyles.error}>offline</span>}</div>
                <div className={styles.oneStat}><div className={styles.dot + " " + (status.landingPage ? colorStyles.successBg : colorStyles.errorBg)} />Landing-Page is {status.landingPage ? <span className={colorStyles.success}>up and running</span> : <span className={colorStyles.error}>offline</span>}</div>
                <div className={styles.oneStat}><div className={styles.dot + " " + (status.support ? colorStyles.successBg : colorStyles.errorBg)} />Support is {status.support ? <span className={colorStyles.success}>up and running</span> : <span className={colorStyles.error}>offline</span>}</div>
                <div className={styles.oneStat}><div className={styles.dot + " " + (status.blog ? colorStyles.successBg : colorStyles.errorBg)} />Blog is {status.blog ? <span className={colorStyles.success}>up and running</span> : <span className={colorStyles.error}>offline</span>}</div>
                <div className={styles.oneStat}><div className={styles.dot + " " + (status.portal ? colorStyles.successBg : colorStyles.errorBg)} />Portal is {status.portal ? <span className={colorStyles.success}>up and running</span> : <span className={colorStyles.error}>offline</span>}</div>
            </div>
            <div className={styles.statusDiv}>
                <div className={styles.desc}>Statistics</div>
                <div >
                    <div className={styles.oneStat}><Icon.File size={undefined} className={iconStyles.icon} /><b>{statistics.itemNumber}</b> Items</div>
                    <div className={styles.oneStat}><Icon.Hexagon size={undefined} className={iconStyles.icon} /><b>{statistics.stampNumber}</b> Stamps</div>
                    <div className={styles.oneStat}><Icon.Image size={undefined} className={iconStyles.icon} /><b>{statistics.artworkNumber}</b> Artworks</div>
                </div>
                <div>
                    <div className={styles.oneStat}><Icon.Hexagon size={undefined} className={iconStyles.icon} />Last Stamp <b>{statistics.lastStamp}</b></div>
                    <div className={styles.oneStat}><Icon.Image size={undefined} className={iconStyles.icon} />Last Artwork <b>{statistics.lastArtwork}</b></div>
                </div>
            </div>
        </div>
    );
}