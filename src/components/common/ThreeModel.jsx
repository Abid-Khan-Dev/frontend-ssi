import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

const ThreeModel = React.memo(({ modelPath, scale = 1.5, autoRotate = true, minHeight = 500 }) => {
    const mountRef = useRef(null);

    useEffect(() => {
        if (!mountRef.current) return;

        // Scene & Camera
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(
            50,
            mountRef.current.clientWidth / mountRef.current.clientHeight,
            0.1,
            1000
        );
        camera.position.set(0, 1.5, 8);

        // Renderer
        const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
        renderer.setPixelRatio(window.devicePixelRatio);
        mountRef.current.appendChild(renderer.domElement);

        // Lights
        scene.add(new THREE.AmbientLight(0xffffff, 1.5));
        const dirLight = new THREE.DirectionalLight(0xffffff, 1);
        dirLight.position.set(5, 5, 5);
        scene.add(dirLight);

        // Load Model
        const loader = new GLTFLoader();
        let model = null;
        let mixer = null;

        loader.load(
            modelPath,
            (gltf) => {
                model = gltf.scene;
                model.scale.set(scale, scale, scale);
                scene.add(model);

                if (gltf.animations?.length) {
                    mixer = new THREE.AnimationMixer(model);
                    gltf.animations.forEach((clip) => mixer.clipAction(clip).play());
                }
            },
            undefined,
            (err) => console.error("Failed to load model:", err)
        );

        const clock = new THREE.Clock();

        // Animation loop
        const animate = () => {
            if (document.hidden) return;
            if (model && autoRotate) model.rotation.y += 0.003;
            if (mixer) mixer.update(clock.getDelta());
            renderer.render(scene, camera);
        };
        renderer.setAnimationLoop(animate);

        // Handle resize
        const handleResize = () => {
            if (!mountRef.current) return;
            camera.aspect = mountRef.current.clientWidth / mountRef.current.clientHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
        };
        window.addEventListener("resize", handleResize);

        // Cleanup
        return () => {
            window.removeEventListener("resize", handleResize);
            renderer.dispose();
            scene.clear();
            if (mountRef.current?.contains(renderer.domElement)) {
                mountRef.current.removeChild(renderer.domElement);
            }
        };
    }, [modelPath, scale, autoRotate]);

    return <div ref={mountRef} style={{ width: "100%", height: "100%", minHeight }} />;
});

export default ThreeModel;
