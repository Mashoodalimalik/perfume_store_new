"use client";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Image, ScrollControls, Scroll, useScroll } from "@react-three/drei";
import { useRef, useState } from "react";
import * as THREE from "three";
import { products } from "@/data/products";
import { useRouter } from "next/navigation";

function ProjectItem({ url, scale, position, onHover, onClick }) {
  const ref = useRef();
  const [hovered, setHover] = useState(false);
  
  useFrame((state, delta) => {
    // Simple hover scale effect
    // Hover scale effect + Z uplift
    ref.current.material.zoom = THREE.MathUtils.damp(ref.current.material.zoom, hovered ? 1.0 : 1, 4, delta); // Reset zoom, use scale instead? Or stick to zoom. 
    // Actually zoom property on Image material is for texture zoom. 
    // Let's scale the mesh itself for "pop up".
    const targetScale = hovered ? 1.1 : 1; 
    ref.current.scale.x = THREE.MathUtils.damp(ref.current.scale.x, scale[0] * targetScale, 4, delta);
    ref.current.scale.y = THREE.MathUtils.damp(ref.current.scale.y, scale[1] * targetScale, 4, delta);
    
    // Move Z towards camera to "pop up"
    ref.current.position.z = THREE.MathUtils.damp(ref.current.position.z, position[2] + (hovered ? 1 : 0), 4, delta);

    ref.current.material.grayscale = THREE.MathUtils.damp(ref.current.material.grayscale, hovered ? 0 : 1.0, 4, delta); 
  });

  return (
    <Image
      ref={ref}
      url={url}
      scale={scale}
      position={position}
      onPointerOver={(e) => { 
        e.stopPropagation(); 
        setHover(true); 
        onHover(true); 
        document.body.style.cursor = 'pointer'; 
      }}
      onPointerDown={(e) => {
        e.stopPropagation();
        setHover(true);
        onHover(true);
      }}
      onPointerUp={() => {
        setHover(false);
        onHover(false);
      }}
      onPointerOut={() => { 
        setHover(false); 
        onHover(false); 
        document.body.style.cursor = 'auto';
      }}
      onClick={onClick}
      transparent
    />
  );
}

function GridContent() {
  const { width: w } = useThree((state) => state.viewport);
  const router = useRouter();
  const scroll = useScroll(); // Need this if we want to use scroll offset

  const handleProductClick = (id) => {
    router.push(`/product/${id}`);
  };
  
  // Dynamic horizontal layout
  const isMobile = w < 5; // Rough check for mobile portrait width (usually < 5 units in R3F default camera)
  // Better check might be aspect ratio, but width is direct here.
  // Actually, let's use a simple width check. on mobile w is small.
  
  const itemWidth = isMobile ? w * 0.7 : w / 3.5;
  const gap = isMobile ? 0.5 : w / 10;
  const totalWidth = products.length * (itemWidth + gap);

  return (
    <Scroll>
       <group position={[0, 0, 0]}> 
        {/* We center the group or just list them. Let's list completely horizontally. 
            However, Scroll component maps vertical scroll to horizontal 
            if we set horizontal={true} in ScrollControls. 
            Let's recalculate logic for Horizontal Scroll.
        */}
        {products.map((product, index) => {
           // x position: starts from left (negative) to right
           // Let's center the first one or just start linear sequence
           const x = (index * (itemWidth + gap)) - (isMobile ? 0 : w/3); 
           // On mobile start from 0 to align left better with scroll, or center it differently.
           // Actually subtract a bit to start from left edge roughly.
 
           
           return (
            <ProjectItem 
                key={product.id}
                url={product.image}
                scale={[itemWidth, isMobile ? w * 1.2 : w / 2.5, 1]}
                position={[x, 0, 0]}
                onHover={() => {}}
                onClick={() => handleProductClick(product.id)}
            />
           );
        })}
       </group>
    </Scroll>
  );
}

export default function ProjectGrid() {
  // We need enough pages to scroll through all items.
  // Rough estimate: Number of screens required.
  const numItems = 9; // Approx
  const pages = Math.max(2, numItems / 3); 

  return (
    <div className="h-screen w-full relative z-[1]"> 
      <Canvas gl={{ antialias: true }} dpr={[1, 1.5]}>
        {/* Enable horizontal scrolling */}
        <ScrollControls pages={pages} damping={0.2} horizontal={true}>
             <GridContent />
        </ScrollControls>
      </Canvas>

      <div className="absolute bottom-10 left-0 w-full flex justify-center pointer-events-none z-50 md:hidden">
        <span className="bg-black/50 backdrop-blur-md text-white text-xs uppercase tracking-[0.2em] px-4 py-2 rounded-full border border-white/20">
            Hold to Preview
        </span>
      </div>
    </div>
  );
}
