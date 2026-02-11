import perseveranceDiagram from "@/assets/cameras/perseverance-cameras.jpg"
import curiosityDiagram from "@/assets/cameras/curiosity-cameras.jpg"

export type CameraCategory = "science" | "engineering" | "edl"

export interface CameraInfo {
  description: string
  category: CameraCategory
  location: string
}

export const roverDiagrams: Record<string, string> = {
  curiosity: curiosityDiagram,
  perseverance: perseveranceDiagram,
}

export const categoryLabels: Record<CameraCategory, string> = {
  science: "Science",
  engineering: "Engineering",
  edl: "Entry, Descent & Landing",
}

export const categoryColors: Record<CameraCategory, string> = {
  science: "purple",
  engineering: "blue",
  edl: "orange",
}

const cameraInfo: Record<string, CameraInfo> = {
  // --- Perseverance cameras ---
  "Navigation Camera - Left": {
    description:
      "One of two stereo navigation cameras mounted on the mast. Used to plan driving routes and create 3D maps of the terrain ahead.",
    category: "engineering",
    location: "Mast (top)",
  },
  "Navigation Camera - Right": {
    description:
      "One of two stereo navigation cameras mounted on the mast. Works with the left NavCam to produce stereo images for path planning.",
    category: "engineering",
    location: "Mast (top)",
  },
  "Mast Camera Zoom - Right": {
    description:
      "One of two zoomable science cameras (Mastcam-Z). Can take high-definition video, panoramic, and 3D images of the Martian surface. Zoom range: 26mm to 110mm.",
    category: "science",
    location: "Mast (top)",
  },
  "Mast Camera Zoom - Left": {
    description:
      "One of two zoomable science cameras (Mastcam-Z). Paired with the right camera for stereo imaging. Studies minerals, textures, and atmospheric phenomena.",
    category: "science",
    location: "Mast (top)",
  },
  "Front Hazard Avoidance Camera - Left": {
    description:
      "Forward-facing hazard detection camera. Helps the rover autonomously avoid rocks, trenches, and other obstacles while driving.",
    category: "engineering",
    location: "Front chassis (lower)",
  },
  "Front Hazard Avoidance Camera - Right": {
    description:
      "Forward-facing hazard detection camera. Works with the left front Hazcam for stereo hazard detection during drives.",
    category: "engineering",
    location: "Front chassis (lower)",
  },
  "Rear Hazard Avoidance Camera - Left": {
    description:
      "Rear-facing hazard detection camera. Provides safety imaging when the rover drives backward or operates its robotic arm.",
    category: "engineering",
    location: "Rear chassis (lower)",
  },
  "Rear Hazard Avoidance Camera - Right": {
    description:
      "Rear-facing hazard detection camera. Paired with the left rear Hazcam for stereo imaging behind the rover.",
    category: "engineering",
    location: "Rear chassis (lower)",
  },
  "SHERLOC WATSON Camera": {
    description:
      "Wide Angle Topographic Sensor for Operations and eNgineering. A close-up camera on the robotic arm that takes detailed images of rock textures to help search for signs of past microbial life.",
    category: "science",
    location: "Robotic arm (turret)",
  },
  "MEDA Skycam": {
    description:
      "Part of the Mars Environmental Dynamics Analyzer weather station. Points upward to photograph clouds and dust in the Martian atmosphere.",
    category: "science",
    location: "Rover deck",
  },
  "Rover Up-Look Camera": {
    description:
      "Entry, descent, and landing camera that looked upward during landing. Captured the iconic footage of the parachute deploying above the rover.",
    category: "edl",
    location: "Rover top (used during landing)",
  },
  "Rover Down-Look Camera": {
    description:
      "Entry, descent, and landing camera that looked downward during the final landing sequence, recording the surface approaching as the rover descended.",
    category: "edl",
    location: "Rover bottom (used during landing)",
  },
  "Descent Stage Down-Look Camera": {
    description:
      "Mounted on the sky crane descent stage. Filmed the rover being lowered to the Martian surface on cables during the final moments of landing.",
    category: "edl",
    location: "Sky crane (used during landing)",
  },
  "Parachute Up-Look Camera A": {
    description:
      "One of two cameras that looked upward to film the supersonic parachute during atmospheric entry. Captured the parachute inflation sequence.",
    category: "edl",
    location: "Backshell (used during landing)",
  },
  "Parachute Up-Look Camera B": {
    description:
      "Second upward-looking parachute camera. Provided a different angle of the parachute deployment during the entry and descent phase.",
    category: "edl",
    location: "Backshell (used during landing)",
  },

  // --- Curiosity cameras ---
  "Front Hazard Avoidance Camera": {
    description:
      "Forward-facing fisheye camera pair for autonomous hazard detection. Helps Curiosity navigate safely around rocks and steep terrain.",
    category: "engineering",
    location: "Front chassis (lower)",
  },
  "Rear Hazard Avoidance Camera": {
    description:
      "Rear-facing fisheye camera pair. Provides safety imaging behind the rover during backward driving and arm operations.",
    category: "engineering",
    location: "Rear chassis (lower)",
  },
  "Mast Camera": {
    description:
      "Primary science camera mounted on the mast. Takes true-color images and video of the terrain, rocks, and sky. Can resolve features as small as a grain of sand nearby.",
    category: "science",
    location: "Mast (top)",
  },
  "Chemistry and Camera Complex": {
    description:
      "Fires a laser at rocks up to 7 meters away and analyzes the vaporized material. Its telescope camera captures detailed images of the laser targets.",
    category: "science",
    location: "Mast (top)",
  },
  "Mars Hand Lens Imager": {
    description:
      "A macro camera on the robotic arm that takes extreme close-up photos of rocks and soil, similar to a geologist's hand lens. Can see details smaller than the width of a human hair.",
    category: "science",
    location: "Robotic arm (turret)",
  },
  "Mars Descent Imager": {
    description:
      "Captured color video of the landing sequence as Curiosity descended to the surface. Now occasionally used to image the ground beneath the rover.",
    category: "edl",
    location: "Rover underside",
  },
  "Navigation Camera": {
    description:
      "Stereo pair of black-and-white cameras on the mast. Used to plan drive routes and create 3D terrain models of the surrounding landscape.",
    category: "engineering",
    location: "Mast (top)",
  },
}

export default cameraInfo
