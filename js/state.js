import * as THREE from 'three';
import { SEA_LEVEL, isTouch, RENDER_DIST, CHUNK, GRASS, DIRT, STONE, SAND, WOOD, LEAVES, PLANKS, BRICK, CRAFTING_TABLE } from './config.js';
export const scene = new THREE.Scene();
scene.background = new THREE.Color(0x87CEEB);
scene.fog = new THREE.Fog(0x87CEEB, RENDER_DIST*CHUNK*0.6, RENDER_DIST*CHUNK);
export const camera = new THREE.PerspectiveCamera(72, innerWidth/innerHeight, 0.1, 500);
camera.rotation.order = 'YXZ';
export const renderer = new THREE.WebGLRenderer({ antialias: !isTouch });
renderer.setPixelRatio(Math.min(devicePixelRatio, isTouch ? 1.5 : 2));
renderer.setSize(innerWidth, innerHeight);
document.body.appendChild(renderer.domElement);
scene.add(new THREE.AmbientLight(0xffffff, 0.8));
export const sun = new THREE.DirectionalLight(0xffffff, 0.85);
sun.position.set(50, 100, 30);
scene.add(sun);
const fill = new THREE.DirectionalLight(0x88aaff, 0.25);
fill.position.set(-100, 40, -60);
scene.add(fill);
export const state = { SEED:12345, gameMode:'survival', yaw:0, pitch:0, worldTime:0, selected:0 };
export const modifiedBlocks = new Map();
export const loadedChunks = new Map();
export const player = {
  pos: new THREE.Vector3(0.5, SEA_LEVEL + 15, 0.5),
  vel: new THREE.Vector3(),
  onGround: false, fly: false,
  health: 20, maxHealth: 20, hurtCooldown: 0, dead: false,
};
export const mobs = [];
export const arrows = [];
export const particles = [];
export const inventory = {};
export const HOTBAR = [
  {id:GRASS,name:'چمن'},{id:DIRT,name:'خاک'},{id:STONE,name:'سنگ'},
  {id:SAND,name:'شن'},{id:WOOD,name:'چوب'},{id:LEAVES,name:'برگ'},
  {id:PLANKS,name:'تخته'},{id:BRICK,name:'آجر'},{id:CRAFTING_TABLE,name:'میز کار'},
];
export const keys = {};
export const input = { fw:0, st:0, jump:false, sprint:false };
export const mobileState = { joyX:0, joyY:0, jump:false, down:false };