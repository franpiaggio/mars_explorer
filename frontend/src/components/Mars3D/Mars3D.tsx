import { useRef } from "react"
import { Canvas, useFrame, useLoader } from "@react-three/fiber"
import { OrbitControls } from "@react-three/drei"
import { TextureLoader } from "three"
import type { Mesh } from "three"
import { Box } from "@chakra-ui/react"

function RotatingMars() {
  const meshRef = useRef<Mesh>(null)
  const texture = useLoader(TextureLoader, "/mars_texture.jpg")

  useFrame((_, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.15
    }
  })

  return (
    <mesh ref={meshRef} rotation={[0.25, 0, 0]}>
      <sphereGeometry args={[1, 64, 64]} />
      <meshStandardMaterial map={texture} />
    </mesh>
  )
}

export function Mars3D() {
  return (
    <Box
      w={{ base: "200px", md: "280px" }}
      h={{ base: "200px", md: "280px" }}
      mx="auto"
      mb={3}
    >
      <Canvas camera={{ position: [0, 0, 2.6], fov: 45 }}>
        <ambientLight intensity={0.3} />
        <directionalLight position={[5, 3, 5]} intensity={1.5} />
        <RotatingMars />
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          rotateSpeed={0.5}
        />
      </Canvas>
    </Box>
  )
}
