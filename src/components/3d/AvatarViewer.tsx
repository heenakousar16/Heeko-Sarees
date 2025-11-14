// src/components/3d/AvatarViewer.tsx
import { Canvas, useThree } from "@react-three/fiber";
import { Environment, OrbitControls, useGLTF } from "@react-three/drei";
import * as THREE from "three";
import React, { Suspense, useEffect, useLayoutEffect, useRef } from "react";

type View = "front" | "back" | "side" | "3d";
type Hexish = string | { value?: string } | undefined;

type Props = {
  modelUrl?: string;            // e.g. "/models/lady_V4.glb"
  sareeHex?: Hexish;            // main saree color (string or {value})
  blouseHex?: Hexish;           // blouse color
  borderHex?: Hexish;           // border color
  cameraView?: View;            // "front" | "back" | "side" | "3d"
  rotation?: number;            // degrees
  zoom?: number;                // 1 = default (we multiply on the group)
};

// ---------- helpers ----------
const toHex = (v: Hexish, fb: string) =>
  typeof v === "string" ? v : (v && typeof (v as any).value === "string" ? (v as any).value : fb);

// Stable portrait camera that "feels" good in your panel
function useCamera(view: View = "front", zoom = 1) {
  const { camera } = useThree();
  useEffect(() => {
    camera.position.set(0, 1.15, 2.5 / Math.max(zoom || 1, 0.3));
    camera.fov = 22; camera.near = 0.05; camera.far = 1000;
    camera.lookAt(0, 1.05, 0);
    camera.updateProjectionMatrix();
    (camera as any).userData.viewYaw =
      view === "front" ? 0 :
      view === "back"  ? Math.PI :
      view === "side"  ? Math.PI / 2 :
                         Math.PI / 6;
  }, [view, zoom, camera]);
}
function CameraController({ cameraView, zoom }: { cameraView: View; zoom: number }) {
  useCamera(cameraView, zoom);
  return null;
}

// ---------- model ----------
function AvatarModel({
  modelUrl = "/models/lady_V4.glb",
  sareeHex,
  blouseHex,
  borderHex,
  rotation = 0,
  zoom = 1,
}: {
  modelUrl?: string;
  sareeHex?: Hexish;
  blouseHex?: Hexish;
  borderHex?: Hexish;
  rotation?: number;
  zoom?: number;
}) {
  const gltf: any = useGLTF(modelUrl);
  const group = useRef<THREE.Group>(null);
  const fittedRef = useRef(false);

  const sHex = toHex(sareeHex,  "#ffffff");
  const bHex = toHex(blouseHex, "#222222");
  const bdHex = toHex(borderHex, "#C9A227"); // gold-ish fallback

  // Fit ONCE deterministically: scale to target height, feet on ground, small downward nudge
  useLayoutEffect(() => {
    if (!group.current || !gltf?.scene || fittedRef.current) return;

    group.current.clear();
    group.current.add(gltf.scene);

    // 1) scale to stable target height
    const box = new THREE.Box3().setFromObject(gltf.scene);
    const size = new THREE.Vector3(); box.getSize(size);
    const targetHeight = 3.2; // larger number => bigger on screen (tune 3.0–3.8 for your layout)
    const baseScale = size.y > 0 ? targetHeight / size.y : 1;
    gltf.scene.scale.setScalar(baseScale);

    // 2) place feet at y=0
    const box2 = new THREE.Box3().setFromObject(gltf.scene);
    gltf.scene.position.y -= box2.min.y;

    // 3) small nudge so toolbar doesn't cut the head
    gltf.scene.position.y -= 0.12;

    fittedRef.current = true; // never refit on HMR/re-renders
  }, [gltf?.scene]);

  // Nice lighting compatibility + shadows
  useEffect(() => {
    if (!gltf?.scene) return;
    gltf.scene.traverse((o: any) => {
      if (!o.isMesh) return;
      o.castShadow = o.receiveShadow = true;
      const tex = o.material?.map as any;
      const anyTHREE = THREE as any;
      if (tex) {
        if ("colorSpace" in tex && anyTHREE.SRGBColorSpace) tex.colorSpace = anyTHREE.SRGBColorSpace;
        else if ("encoding" in tex && anyTHREE.sRGBEncoding) tex.encoding = anyTHREE.sRGBEncoding;
      }
    });
  }, [gltf?.scene]);

  // Robust paint helper (handles arrays, any material type)
  const paint = (matLike: any, hex: string, shiny = false) => {
    if (!matLike) return;
    const one = (m: any) => {
      if (!m) return;
      if (m.map) { m.map = null; m.needsUpdate = true; } // clear texture so color shows
      if (m.color) m.color.set(hex);
      if (shiny) { if ("metalness" in m) m.metalness = 0.55; if ("roughness" in m) m.roughness = 0.35; }
    };
    Array.isArray(matLike) ? matLike.forEach(one) : one(matLike);
  };

  // Apply colors (prefer material names; fallback to mesh names)
  useEffect(() => {
    if (!gltf?.scene) return;

    const mats = gltf.materials || {};
    const getMat = (...names: string[]) => {
      for (const n of names) {
        if (mats[n]) return mats[n];
        if (mats[n.toLowerCase()]) return mats[n.toLowerCase()];
        if (mats[n.toUpperCase()]) return mats[n.toUpperCase()];
      }
      return undefined;
    };

    // by material name
    paint(getMat("saree","Saree"), sHex);
    paint(getMat("blouse","Blouse"), bHex);
    paint(getMat("border","Border","SareeBorder"), bdHex, true);

    // fallback by mesh name
    gltf.scene.traverse((o: any) => {
      if (!o.isMesh || !o.material) return;
      const n = (o.name || "").toLowerCase();
      if (n === "saree")  paint(o.material, sHex);
      if (n === "blouse") paint(o.material, bHex);
      if (n === "border" || n === "sareeborder") paint(o.material, bdHex, true);
    });
  }, [gltf?.scene, gltf?.materials, sHex, bHex, bdHex]);

  // Combine UI rotation with the view yaw stored on the camera
  useEffect(() => {
    if (!group.current) return;
    const yaw = (group.current.parent as any)?.__r3f?.root?.getState?.().camera?.userData?.viewYaw || 0;
    group.current.rotation.y = THREE.MathUtils.degToRad(rotation || 0) + yaw;
  }, [rotation]);

  // Multiply in your UI zoom (base scale is baked during fitting)
  useEffect(() => {
    if (group.current) group.current.scale.setScalar(Math.max(zoom || 1, 0.3));
  }, [zoom]);

  return <group ref={group} dispose={null} />;
}
useGLTF.preload("/models/lady_V4.glb");

// ---------- viewer ----------
export function AvatarViewer({
  modelUrl = "/models/lady_V4.glb",
  sareeHex,
  blouseHex,
  borderHex,
  cameraView = "front",
  rotation = 0,
  zoom = 1,
}: Props) {
  return (
    <div className="w-full h-full">
      <Canvas
        camera={{ position: [0, 1.15, 1.8], fov: 22, near: 0.05, far: 1000 }}
        shadows
        onCreated={({ gl }) => {
          gl.toneMapping = THREE.ACESFilmicToneMapping as any;
          const anyGL = gl as any, anyTHREE = THREE as any;
          if ("outputColorSpace" in anyGL && anyTHREE.SRGBColorSpace) anyGL.outputColorSpace = anyTHREE.SRGBColorSpace;
          else if ("outputEncoding" in anyGL && anyTHREE.sRGBEncoding) anyGL.outputEncoding = anyTHREE.sRGBEncoding;
        }}
      >
        <Suspense fallback={null}>
          {/* Lights similar to your “stable” setup */}
          <ambientLight intensity={0.8} />
          <directionalLight position={[5, 10, 5]} intensity={1.2} castShadow />
          <directionalLight position={[-5, 5, -5]} intensity={0.6} color={"#fff5f5"} />
          <pointLight position={[0, 5, 0]} intensity={0.4} color={"#fef3c7"} />

          <Environment preset="studio" />

          <OrbitControls
            enablePan={false}
            enableZoom
            enableRotate
            target={[0, 1.05, 0]}     // aim at torso
            maxPolarAngle={Math.PI / 2}
            minPolarAngle={0}
            maxDistance={4}
            minDistance={0.35}        // allow very close zoom
            zoomSpeed={0.8}
            rotateSpeed={0.8}
          />

          <CameraController cameraView={cameraView as View} zoom={zoom || 1} />

          <AvatarModel
            modelUrl={modelUrl}
            sareeHex={sareeHex}
            blouseHex={blouseHex}
            borderHex={borderHex}
            rotation={rotation}
            zoom={zoom}
          />
        </Suspense>
      </Canvas>
    </div>
  );
}
