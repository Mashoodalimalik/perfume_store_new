import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, PerspectiveCamera, ContactShadows, Environment, MeshTransmissionMaterial } from '@react-three/drei';

const Bottle = (props) => {
    const group = useRef();

    // Rotate the bottle slowly
    useFrame((state) => {
        const t = state.clock.getElapsedTime();
        group.current.rotation.y = Math.sin(t / 4) / 4;
        group.current.rotation.z = Math.sin(t / 4) / 10;
        group.current.position.y = Math.sin(t / 1.5) / 10;
    });

    return (
        <group ref={group} {...props} dispose={null}>
            {/* Bottle Body */}
            <mesh position={[0, 0, 0]}>
                <cylinderGeometry args={[1, 1, 2.5, 32]} />
                <MeshTransmissionMaterial
                    backside
                    backsideThickness={5}
                    thickness={2}
                    roughness={0}
                    transmission={1}
                    ior={1.5}
                    chromaticAberration={1} // Adds prism effect
                    color="#d4af37" // Gold tint
                />
            </mesh>

            {/* Liquid inside */}
            <mesh position={[0, -0.2, 0]}>
                <cylinderGeometry args={[0.92, 0.92, 2.0, 32]} />
                <meshStandardMaterial color="#ffc107" transparent opacity={0.6} roughness={0.2} metalness={0.1} />
            </mesh>

            {/* Neck */}
            <mesh position={[0, 1.4, 0]}>
                <cylinderGeometry args={[0.3, 0.3, 0.5, 32]} />
                <meshStandardMaterial color="#1a1a1a" metalness={1} roughness={0.2} />
            </mesh>

            {/* Cap */}
            <mesh position={[0, 1.8, 0]}>
                <boxGeometry args={[0.8, 0.6, 0.8]} />
                <meshStandardMaterial color="#1a1a1a" metalness={0.8} roughness={0.1} />
            </mesh>
        </group>
    );
};

const Hero3D = () => {
    return (
        <div className="hero-3d-container">
            <Canvas camera={{ position: [0, 0, 8], fov: 45 }}>
                <pointLight position={[10, 10, 10]} intensity={1.5} />
                <ambientLight intensity={0.5} />

                {/* Main Bottle */}
                <Float speed={1.5} rotationIntensity={0.5} floatIntensity={0.5}>
                    <Bottle scale={1.2} position={[2, 0, 0]} rotation={[0, -0.5, 0]} />
                </Float>

                {/* Floating Particles for Ambiance */}
                <Float speed={1} rotationIntensity={2} floatIntensity={2}>
                    <mesh position={[-3, 2, -2]}>
                        <sphereGeometry args={[0.2, 16, 16]} />
                        <meshStandardMaterial color="#d4af37" transparent opacity={0.4} />
                    </mesh>
                    <mesh position={[-2, -2, -1]}>
                        <sphereGeometry args={[0.15, 16, 16]} />
                        <meshStandardMaterial color="#ffffff" transparent opacity={0.3} />
                    </mesh>
                    <mesh position={[3, 3, -3]}>
                        <sphereGeometry args={[0.3, 16, 16]} />
                        <meshStandardMaterial color="#d4af37" transparent opacity={0.2} />
                    </mesh>
                </Float>

                <Environment preset="studio" />
                <ContactShadows opacity={0.4} scale={20} blur={2.5} far={4} color="#000000" />
            </Canvas>
        </div>
    );
};

export default Hero3D;
