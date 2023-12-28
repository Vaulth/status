import styles from '../styles/Status.module.css';
import iconStyles from "../styles/Icon.module.css";
import colorStyles from "../styles/Colors.module.css";
import * as Icon from "react-feather";
import { StatusIndicator } from './StatusIndicator';
import React, { useState, useEffect } from "react"

const axios = require("axios");

export function useStatistics() {
    const [statistics, setStatistics] = useState({
        stampNumber: 69,
        artworkNumber: 420,
        lastStamp: "LastStamp123",
        lastArtwork: "LastArtwork123"
    });

    useEffect(() => {
        const getStatistics = async () => {
            await axios.get('https://api.vaulth.app/analytics')
                .then((response) => {
                    setStatistics({
                        stampNumber: response.data.stampCount,
                        artworkNumber: response.data.certificateCount,
                        lastStamp: "Vangart",
                        lastArtwork: "Felix"
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
    const statistics = useStatistics();

    return (
        <div className={styles.status}>
            <div className={styles.statusDiv}>
                <div>
                <StatusIndicator url={"https://portal.vaulth.app/"} name={"portal"} />  
                <StatusIndicator url={"https://api.vaulth.app/"} name={"backend"} />
                <StatusIndicator url={"https://dashboard.vaulth.app/"} name={"dashboard"} />
                </div>
                <div>
                <StatusIndicator url={"https://vaulth.app/"} name={"landing-page"} />
                <StatusIndicator url={"https://blog.vaulth.app/"} name={"blog"} />
                <StatusIndicator url={"https://support.vaulth.app/"} name={"support"} />         
                </div>
            </div>
            <div className={styles.statsDiv}>
                    <div className={styles.oneStat}><Icon.Hexagon size={undefined} className={iconStyles.icon} /><b className={styles.accent}>{statistics.stampNumber}</b> Stamps</div>
                    <div className={styles.oneStat}><Icon.Image size={undefined} className={iconStyles.icon} /><b className={styles.accent}>{statistics.artworkNumber}</b> Artworks</div>
                    <div className={styles.oneStat}><Icon.Hexagon size={undefined} className={iconStyles.icon} />Last Stamp <b className={styles.accent}>{statistics.lastStamp}</b></div>
                    <div className={styles.oneStat}><Icon.Image size={undefined} className={iconStyles.icon} />Last Artwork <b className={styles.accent}>{statistics.lastArtwork}</b></div>
            </div>
        </div>
    );
}