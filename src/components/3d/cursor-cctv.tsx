"use client";
import React, { useLayoutEffect } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three-stdlib";

export default function Cctv3d() {
    const canvasRef = React.useRef<HTMLCanvasElement>(null);

    useLayoutEffect(() => {
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(
            75,
            window.innerWidth / window.innerHeight,
            1,
            1000
        );

        let object: THREE.Group;
        let headBone: THREE.Object3D | null = null;
        const mouse = new THREE.Vector2(0, 0);

        const renderer = new THREE.WebGLRenderer({
            canvas: canvasRef.current!,
            alpha: true,
        });
        renderer.setSize(window.innerWidth, window.innerHeight);
        document.body.appendChild(renderer.domElement);

        const toplight = new THREE.DirectionalLight(0xffffff, 1);
        toplight.position.set(500, 500, 500);
        toplight.castShadow = true;
        scene.add(toplight);

        const ambientLight = new THREE.AmbientLight(0xffffff, 1);
        scene.add(ambientLight);

        // Position camera to view top right area
        camera.position.set(0, 0, 15);
        camera.lookAt(0, 0, 0);

        // Load GLTF model
        const loader = new GLTFLoader();
        loader.load(
            "/3d/cctv/scene.gltf",
            (gltf) => {
                object = gltf.scene;
                object.position.set(22, 11, 0);
                scene.add(object);
                
                object.traverse((child) => {
                    if (child.name === "CCTVfbx") {
                        headBone = child;
                        // Set initial rotation to look left (negative X direction)
                        headBone.rotation.y = Math.PI / 2; // 90 degrees to the left
                    }
                });
            },
            (xhr) => console.log((xhr.loaded / xhr.total) * 100 + "% loaded"),
            (error) => console.error("Error loading model:", error)
        );

        // Track mouse movement
        document.addEventListener("mousemove", (event) => {
            mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
            mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
        });

        function animate() {
            requestAnimationFrame(animate);

            if (headBone) {
                // Create raycaster to get 3D position from mouse
                const raycaster = new THREE.Raycaster();
                raycaster.setFromCamera(mouse, camera);
                
                // Project mouse to a plane in front of camera
                const distance = 15;
                const targetPosition = new THREE.Vector3();
                raycaster.ray.at(distance, targetPosition);
                
                // Make CCTV look at the target position
                const cctvWorldPos = new THREE.Vector3();
                headBone.getWorldPosition(cctvWorldPos);
                
                // Calculate direction and create look-at matrix
                const direction = targetPosition.sub(cctvWorldPos).normalize();
                const matrix = new THREE.Matrix4();
                matrix.lookAt(cctvWorldPos, cctvWorldPos.clone().add(direction), new THREE.Vector3(0, 1, 0));
                
                const targetQuaternion = new THREE.Quaternion();
                targetQuaternion.setFromRotationMatrix(matrix);
                
                // Smooth interpolation for natural movement
                headBone.quaternion.slerp(targetQuaternion, 0.15);
            }

            renderer.render(scene, camera);
        }

        animate();

        function onWindowResize() {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        }
        window.addEventListener("resize", onWindowResize);
    });

    return (
        <div className="pointer-events-none ">
            <canvas className="fixed h-screen  z-[100] w-screen inset-0" ref={canvasRef} />
        </div>
    );
}
