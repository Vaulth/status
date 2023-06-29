import styles from '../styles/Status.module.css';
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
            console.log("SUCCESS: checkWebsite ({" + url + "}): " + response.status);
            websiteStatus = STATUS.Running;
        })
        .catch((error) => {
            console.log("ERROR: checkWebsite ({" + url + "}): " + error.code);
            websiteStatus = STATUS.Offline;
        })

    return websiteStatus
}

export function useBackendStatus() {
    const [backendStatus, setBackendStatus] = useState(STATUS.Fetching);

    useEffect(() => {
        const checkStatus = async () => {
            setBackendStatus(await checkWebsite("https://backend.vaulth.app/"));
        }

        checkStatus();
    }, []);

    return backendStatus;
}

export function useDashboardStatus() {
    const [dashboardStatus, setDashboardStatus] = useState(STATUS.Fetching);

    useEffect(() => {
        const checkStatus = async () => {
            setDashboardStatus(await checkWebsite("https://dashboard.vaulth.app/"));
        }

        checkStatus();
    }, []);

    return dashboardStatus;
}

export function useLandingpageStatus() {
    const [landingpageStatus, setLandingpageStatus] = useState(STATUS.Fetching);

    useEffect(() => {
        const checkStatus = async () => {
            setLandingpageStatus(await checkWebsite("https://vaulth.app/"));
        }

        checkStatus();
    }, []);

    return landingpageStatus;
}

export function useSupportStatus() {
    const [supportStatus, setSupportStatus] = useState(STATUS.Fetching);

    useEffect(() => {
        const checkStatus = async () => {
            setSupportStatus(await checkWebsite("https://support.vaulth.app/"));
        }

        checkStatus();
    }, []);

    return supportStatus;
}

export function useBlogStatus() {
    const [blogStatus, setBlogStatus] = useState(STATUS.Fetching);

    useEffect(() => {
        const checkStatus = async () => {
            setBlogStatus(await checkWebsite("https://blog.vaulth.app/"));
        }

        checkStatus();
    }, []);

    return blogStatus;
}

export function usePortalStatus() {
    const [portalStatus, setPortalStatus] = useState(STATUS.Fetching);

    useEffect(() => {
        const checkStatus = async () => {
            setPortalStatus(await checkWebsite("https://portal.vaulth.app/"));
        }

        checkStatus();
    }, []);

    return portalStatus;
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
    const backendStatus = useBackendStatus();
    const dashboardStatus = useDashboardStatus();
    const landingpageStatus = useLandingpageStatus();
    const supportStatus = useSupportStatus();
    const blogStatus = useBlogStatus();
    const portalStatus = usePortalStatus();
    const statistics = useStatistics();

    return (
        <div className={styles.status}>
            <div className={styles.title}>Official <b>Vaulth</b> services status</div>
            <div className={styles.statusDiv}>
                <div className={styles.desc}>Services</div>
                <div className={styles.oneStat}><div className={styles.dot + " " + (backendStatus ? colorStyles.successBg : colorStyles.errorBg)} />Backend is {backendStatus ? <span className={colorStyles.success}>up and running</span> : <span className={colorStyles.error}>offline</span>}</div>
                <div className={styles.oneStat}><div className={styles.dot + " " + (dashboardStatus ? colorStyles.successBg : colorStyles.errorBg)} />Dashboard is {dashboardStatus ? <span className={colorStyles.success}>up and running</span> : <span className={colorStyles.error}>offline</span>}</div>
                <div className={styles.oneStat}><div className={styles.dot + " " + (landingpageStatus ? colorStyles.successBg : colorStyles.errorBg)} />Landing-Page is {landingpageStatus ? <span className={colorStyles.success}>up and running</span> : <span className={colorStyles.error}>offline</span>}</div>
                <div className={styles.oneStat}><div className={styles.dot + " " + (supportStatus ? colorStyles.successBg : colorStyles.errorBg)} />Support is {supportStatus ? <span className={colorStyles.success}>up and running</span> : <span className={colorStyles.error}>offline</span>}</div>
                <div className={styles.oneStat}><div className={styles.dot + " " + (blogStatus ? colorStyles.successBg : colorStyles.errorBg)} />Blog is {blogStatus ? <span className={colorStyles.success}>up and running</span> : <span className={colorStyles.error}>offline</span>}</div>
                <div className={styles.oneStat}><div className={styles.dot + " " + (portalStatus ? colorStyles.successBg : colorStyles.errorBg)} />Portal is {portalStatus ? <span className={colorStyles.success}>up and running</span> : <span className={colorStyles.error}>offline</span>}</div>
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