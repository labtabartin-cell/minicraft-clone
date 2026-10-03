import { AIR, WATER, P_RADIUS, P_HEIGHT } from './config.js';
import { getBlockWorld } from './chunks.js';
export function isOpaqueBlock(b){return b!==AIR && b!==WATER;}
export function collides(px,py,pz){const minX=Math.floor(px-P_RADIUS),maxX=Math.floor(px+P_RADIUS),minY=Math.floor(py),maxY=Math.floor(py+P_HEIGHT),minZ=Math.floor(pz-P_RADIUS),maxZ=Math.floor(pz+P_RADIUS);for(let x=minX;x<=maxX;x++)for(let y=minY;y<=maxY;y++)for(let z=minZ;z<=maxZ;z++)if(isOpaqueBlock(getBlockWorld(x,y,z)))return true;return false;}