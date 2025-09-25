import "./App.css";
import { useEffect, useState } from "react";
import { useThree } from "@react-three/fiber";
import Scene from "./Scene";
import { OrbitControls, Environment } from "@react-three/drei";
import { useControls, button } from "leva";
import * as THREE from "three";

function Three() {
  const { scene, camera } = useThree();

  // Load camera position from localStorage
  useEffect(() => {
    const savedPosition = localStorage.getItem("cameraPosition");
    const savedTarget = localStorage.getItem("cameraTarget");

    if (savedPosition) {
      const position = JSON.parse(savedPosition);
      camera.position.set(position.x, position.y, position.z);
    } else {
      camera.position.y = 4;
    }

    if (savedTarget) {
      const target = JSON.parse(savedTarget);
      camera.lookAt(target.x, target.y, target.z);
    }
  }, [camera]);

  // Save camera position to localStorage
  useEffect(() => {
    const saveCameraState = () => {
      localStorage.setItem(
        "cameraPosition",
        JSON.stringify({
          x: camera.position.x,
          y: camera.position.y,
          z: camera.position.z,
        })
      );

      const target = new THREE.Vector3();
      camera.getWorldDirection(target);
      target.multiplyScalar(10).add(camera.position);

      localStorage.setItem(
        "cameraTarget",
        JSON.stringify({
          x: target.x,
          y: target.y,
          z: target.z,
        })
      );
    };

    const interval = setInterval(saveCameraState, 1000); // Save every second

    return () => clearInterval(interval);
  }, [camera]);

  let localColor;
  if (localStorage.getItem("bgColor")) {
    localColor = localStorage.getItem("bgColor");
  } else {
    localColor = "#272727";
  }
  const bgColor = useControls({ bgColor: localColor });

  let localGrid;
  if (localStorage.getItem("grid")) {
    localGrid = localStorage.getItem("grid") === "true";
  } else {
    localGrid = true;
  }
  const grid = useControls({ floor: localGrid });

  let initAutoRotate;
  if (localStorage.getItem("autorotate")) {
    initAutoRotate = localStorage.getItem("autorotate") === "true";
  } else {
    initAutoRotate = false;
  }
  const autoRotate = useControls({ autoRotate: initAutoRotate });

  let localAxes;
  if (localStorage.getItem("axes")) {
    localAxes = localStorage.getItem("axes") === "true";
  } else {
    localAxes = true;
  }
  const axes = useControls({ axesHelper: localAxes });

  useControls({
    resetCamera: button(() => {
      camera.position.set(0, 4, 10);
      camera.lookAt(0, 0, 0);
      localStorage.removeItem("cameraPosition");
      localStorage.removeItem("cameraTarget");
    }),
  });

  const bg = useControls({
    bg: {
      options: [
        "color",
        "dawn",
        "night",
        "sunset",
        "warehouse",
        "forest",
        "apartment",
        "studio",
        "city",
        "park",
        "lobby",
      ],
    },
  });

  // cache values
  useEffect(() => {
    localStorage.setItem("bgColor", bgColor.bgColor);
    localStorage.setItem("grid", grid.floor);
    localStorage.setItem("axes", axes.axesHelper);
    localStorage.setItem("autorotate", autoRotate.autoRotate);
  }, [bgColor, grid, axes, autoRotate]);

  // adjust light intensity
  useEffect(() => {
    scene.children.map((child) => {
      if (child.type === "Group") {
        child.children.map((subchild) => {
          if (subchild.type === "Group")
            subchild.children.map((subsubchild) => {
              if (
                subsubchild.type === "PointLight" ||
                subsubchild.type === "SpotLight"
              )
                subsubchild.intensity = subsubchild.intensity / 1200;
              return null;
            });
          return null;
        });
      }
      return null;
    });
  }, [scene.children]);

  return (
    <>
      <ambientLight intensity={0.1} />
      {bg.bg !== "color" ? (
        <Environment preset={bg.bg} background />
      ) : (
        <color attach="background" args={[bgColor.bgColor]} />
      )}

      <Scene />

      {axes.axesHelper && <primitive object={new THREE.AxesHelper(100)} />}

      <mesh rotation={[Math.PI / 2, Math.PI, Math.PI]} position={[0, 0, 0]}>
        <planeGeometry args={[350, 350, 100, 100]} />
        <meshBasicMaterial
          color="#f3f3f3"
          wireframe
          opacity={grid.floor ? 0.07 : 0}
          transparent
        />
      </mesh>

      <OrbitControls
        minDistance={10}
        makeDefault
        autoRotate={autoRotate.autoRotate}
        autoRotateSpeed={1.2}
      />
    </>
  );
}

export default Three;
