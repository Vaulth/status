import styles from "../styles/Logo.module.css";
import Image from "next/image";
// import { useSystemTheme } from '../pages';
import * as Icon from "react-feather";
import { useWindowSize } from "../pages/index";
import { Canvas, useFrame, useLoader, useThree } from '@react-three/fiber';
import * as THREE from 'three'
import React, { useRef, useState, useEffect } from 'react';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader';
import { TextureLoader } from 'three/src/loaders/TextureLoader'


export default function Logo() {
    function Rig() {
        const { camera, mouse } = useThree()
        const vec = new THREE.Vector3()
        const [mouseCoordinates, setMouseCoordinates] = useState({ x: 0, y: 0 });

        const mouseMoveHandler = (event) => {
            setMouseCoordinates({
                x: event.clientX - windowSize.width / 4,
                y: event.clientY - windowSize.height / 4
            });
        }

        useEffect(() => {
            window.addEventListener('mousemove', mouseMoveHandler);
            return (() => {
                window.removeEventListener('mousemove', mouseMoveHandler);
            })
        }, [])

        return useFrame(() => {
            camera.position.lerp(vec.set(-(mouseCoordinates.x / 150), (mouseCoordinates.y / 150), camera.position.z), 0.05)
            camera.lookAt(0, 0, 0)
        })
    }

    function Box(props) {
        const meshRef = useRef()
        const fbx = useLoader(FBXLoader, '/cube.fbx').clone();
        const colorMap = useLoader(TextureLoader, '/cube_texture_dark.png');

        let material = new THREE.MeshStandardMaterial({
            map: colorMap,
            transparent: 100,
            emissive: '#ffe7B3',
            emissiveIntensity: 100,
            color: "#ffe7B3",
        });

        fbx.children.forEach((mesh, i) => {
            mesh.material = material;
        });

        return (
            <mesh
                {...props}
                ref={meshRef}
                rotation={[130.0 * Math.PI / 180, 0.0 * Math.PI / 180, 45.0 * Math.PI / 180]}>
                <primitive object={fbx} scale={0.10} />
            </mesh>
        )
    }

    //const theme = useSystemTheme();
    const windowSize = useWindowSize();

    return (
        <div className={styles.logo}>
            <div className={styles.canvas}>
                <Canvas orthographic camera={{ zoom: 1, position: [0, 0, 20] }}>
                    <Box position={[0, 0, 0]} />
                    <Rig />
                </Canvas>
            </div>
            <span className={styles.title}><b>Vaulth</b></span>
        </div>
    );
}
