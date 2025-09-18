import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

export default function AnimatedRobot({ modelPath, scale = 1.5, autoRotate = true }) {
    const mountRef = useRef(null);

    useEffect(() => {
        if (!mountRef.current) return;

        // Scene & Camera
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(50, mountRef.current.clientWidth / mountRef.current.clientHeight, 0.1, 1000);
        camera.position.set(0, 2, 8);

        // Renderer
        const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
        renderer.setPixelRatio(window.devicePixelRatio);
        if (!mountRef.current.contains(renderer.domElement)) {
            mountRef.current.appendChild(renderer.domElement);
        }

        // Lights
        scene.add(new THREE.AmbientLight(0xffffff, 1.5));
        const dirLight = new THREE.DirectionalLight(0xffffff, 1);
        dirLight.position.set(5, 5, 5);
        scene.add(dirLight);

        // Load Model
        const loader = new GLTFLoader();
        let model, mixer;
        loader.load(modelPath, (gltf) => {
            model = gltf.scene;
            model.scale.set(scale, scale, scale);
            scene.add(model);

            // Animations
            if (gltf.animations && gltf.animations.length) {
                mixer = new THREE.AnimationMixer(model);
                gltf.animations.forEach((clip) => {
                    mixer.clipAction(clip).play();
                });
            }
        });

        const clock = new THREE.Clock();

        // Mouse tracking for rotation
        // const mouse = { x: 0, y: 0 };
        // const onMouseMove = (e) => {
        //     mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
        //     mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
        // };
        // window.addEventListener("mousemove", onMouseMove);

        // Animate loop with optimization
        renderer.setAnimationLoop(() => {
            if (document.hidden) return; // skip if tab hidden
            // if (model) {
            //     if (autoRotate) model.rotation.y += 0.003;
            //     // optional: rotate model slightly based on mouse
            //     model.rotation.x = mouse.y * 0.2;
            //     model.rotation.y = mouse.x * Math.PI * 0.2;
            // }
            if (mixer) mixer.update(clock.getDelta());
            renderer.render(scene, camera);
        });

        // Resize
        const handleResize = () => {
            if (!mountRef.current) return;
            camera.aspect = mountRef.current.clientWidth / mountRef.current.clientHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
        };
        window.addEventListener("resize", handleResize);

        // Cleanup
        return () => {
            // window.removeEventListener("mousemove", onMouseMove);
            window.removeEventListener("resize", handleResize);
            renderer.dispose();
            if (mountRef.current?.contains(renderer.domElement)) {
                mountRef.current.removeChild(renderer.domElement);
            }
        };
    }, [modelPath, scale, autoRotate]);

    return <div ref={mountRef} style={{ width: "100%", height: "100%", minHeight: "500px" }} />;
}
