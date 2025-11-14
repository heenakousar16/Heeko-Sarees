import { useLoader } from "@react-three/fiber";
import * as THREE from "three";
import { useMemo } from "react";

type Props = {
  colorHex?: string;           // e.g. "#dc2626"
  patternUrl?: string;         // only if it's an image path under /public
  metalness?: number;
  roughness?: number;
};

function looksLikeImage(u?: string) {
  if (!u) return false;
  const s = u.toLowerCase();
  return s.startsWith("http") || s.endsWith(".png") || s.endsWith(".jpg") || s.endsWith(".jpeg") || s.endsWith(".webp");
}

export function PatternMaterial({
  colorHex = "#ffffff",
  patternUrl,
  metalness = 0.05,
  roughness = 0.85,
}: Props) {
  const hasTex = looksLikeImage(patternUrl);
  const texture = hasTex ? useLoader(THREE.TextureLoader, `/${patternUrl}`) : null;

  const material = useMemo(() => {
    const mat = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color(colorHex),
      metalness,
      roughness,
      sheen: 1,
      sheenRoughness: 0.6,
    });
    if (texture) {
      texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
      texture.repeat.set(3, 3);
      // compat new/old Three:
      if ("colorSpace" in texture && (THREE as any).SRGBColorSpace) (texture as any).colorSpace = (THREE as any).SRGBColorSpace;
      else (texture as any).encoding = (THREE as any).sRGBEncoding;
      mat.map = texture;
    }
    return mat;
  }, [colorHex, texture, metalness, roughness]);

  // @ts-ignore R3F primitive
  return <primitive object={material} attach="material" />;
}
