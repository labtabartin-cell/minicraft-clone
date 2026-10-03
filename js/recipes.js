import { WOOD,PLANKS,STICK,DIRT,GRASS,STONE,COBBLESTONE,CRAFTING_TABLE,TORCH,FURNACE,IRON_INGOT,GOLD_INGOT,DIAMOND,IRON_ORE,GOLD_ORE,AIR,COAL,TOOL_WOOD,TOOL_STONE,TOOL_IRON,TOOL_GOLD,TOOL_DIAMOND,TOOL_PICKAXE,TOOL_SWORD,TOOL_AXE,TOOL_SHOVEL,TOOL_HOE } from './config.js';
import { BASE_BY_TIER } from './items.js';
export const RECIPES=[
{type:'shapeless',ingredients:[WOOD],result:{id:PLANKS,count:4}},{type:'shapeless',ingredients:[PLANKS,PLANKS],result:{id:STICK,count:4}},
{type:'shapeless',ingredients:[DIRT,DIRT,DIRT,DIRT],result:{id:GRASS,count:1}},{type:'shapeless',ingredients:[STONE,STONE,STONE,STONE],result:{id:COBBLESTONE,count:4}},
{type:'shaped',pattern:['##','##'],key:{'#':PLANKS},result:{id:CRAFTING_TABLE,count:1}},{type:'shaped',pattern:['#','#'],key:{'#':PLANKS},result:{id:STICK,count:2}},
{type:'shaped',pattern:['# ',' #'],key:{'#':STICK},result:{id:TORCH,count:2}},{type:'shaped',pattern:['###','# #','###'],key:{'#':COBBLESTONE},result:{id:FURNACE,count:1}}];
for(const[tierName,mat] of [['wood',PLANKS],['stone',COBBLESTONE],['iron',IRON_INGOT],['gold',GOLD_INGOT],['diamond',DIAMOND]]){const base=BASE_BY_TIER[tierName];
RECIPES.push({type:'shaped',pattern:['###',' S ',' S '],key:{'#':mat,'S':STICK},result:{id:base+TOOL_PICKAXE,count:1}});
RECIPES.push({type:'shaped',pattern:['#','#','S'],key:{'#':mat,'S':STICK},result:{id:base+TOOL_SWORD,count:1}});
RECIPES.push({type:'shaped',pattern:['##','#S',' S'],key:{'#':mat,'S':STICK},result:{id:base+TOOL_AXE,count:1}});
RECIPES.push({type:'shaped',pattern:['#','S','S'],key:{'#':mat,'S':STICK},result:{id:base+TOOL_SHOVEL,count:1}});
RECIPES.push({type:'shaped',pattern:['##',' S',' S'],key:{'#':mat,'S':STICK},result:{id:base+TOOL_HOE,count:1}});}
function normalizeGrid(g,s){const grid=[];for(let y=0;y<s;y++){const r=[];for(let x=0;x<s;x++)r.push(g[y*s+x]);grid.push(r);}while(grid.length>0&&grid[0].every(v=>v===AIR))grid.shift();while(grid.length>0&&grid[grid.length-1].every(v=>v===AIR))grid.pop();if(grid.length===0)return[];let L=0,R=grid[0].length-1;while(L<=R&&grid.every(r=>r[L]===AIR))L++;while(R>=L&&grid.every(r=>r[R]===AIR))R--;if(L>R)return[];return grid.map(r=>r.slice(L,R+1));}
export function matchRecipe(g,s){for(const r of RECIPES){if(r.type==='shaped'){const n=normalizeGrid(g,s),p=r.pattern;if(n.length!==p.length||n[0].length!==p[0].length)continue;let ok=true;for(let y=0;y<p.length&&ok;y++)for(let x=0;x<p[y].length&&ok;x++){const e=p[y][x]===' '?AIR:r.key[p[y][x]];if(n[y][x]!==e)ok=false;}if(ok)return r;}else{const present=g.filter(v=>v!==AIR);if(present.length!==r.ingredients.length)continue;const a=[...present].sort(),b=[...r.ingredients].sort();if(a.every((v,i)=>v===b[i]))return r;}}return null;}
export const SMELTING={[IRON_ORE]:{id:IRON_INGOT,time:10},[GOLD_ORE]:{id:GOLD_INGOT,time:10},[COBBLESTONE]:{id:STONE,time:10},[WOOD]:{id:COAL,time:10},[PLANKS]:{id:COAL,time:10}};
export const FUEL_VALUES={[COAL]:8,[WOOD]:1.5,[PLANKS]:1.5,[STICK]:0.5};