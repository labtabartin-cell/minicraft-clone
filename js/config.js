export const CHUNK=16, SEA_LEVEL=64, WORLD_HEIGHT=128, RENDER_DIST=4;
export const CAVE_MAX_Y=45, CAVE_SURFACE_BUFFER=4, DAY_LENGTH=480;
export const AIR=0,GRASS=1,DIRT=2,STONE=3,SAND=4,WOOD=5,LEAVES=6,WATER=7,PLANKS=8,BRICK=9,
  CRAFTING_TABLE=10,STICK=11,TORCH=13,CACTUS=14,SNOW=15,BEDROCK=16,
  GRAVEL=17,COBBLESTONE=18,COAL_ORE=19,IRON_ORE=20,GOLD_ORE=21,DIAMOND_ORE=22,
  ROTTEN_FLESH=23,BONE=24,LEATHER=25,BEEF=26,WOOL=27,FURNACE=28;
export const COAL=100, IRON_INGOT=101, GOLD_INGOT=102, DIAMOND=103;
export const TOOL_WOOD=200, TOOL_STONE=210, TOOL_IRON=220, TOOL_GOLD=230, TOOL_DIAMOND=240;
export const TOOL_PICKAXE=0, TOOL_SWORD=1, TOOL_AXE=2, TOOL_SHOVEL=3, TOOL_HOE=4;
export const P_RADIUS=0.3, P_HEIGHT=1.8, EYE=1.62;
export const isTouch = matchMedia('(pointer: coarse)').matches || 'ontouchstart' in window || navigator.maxTouchPoints > 0;
export const DEFAULT_SETTINGS = { sensitivity:5, buttonSize:5, vibration:true, sound:true };
export const settings = { ...DEFAULT_SETTINGS };
try { const s = localStorage.getItem('mc_clone_settings'); if(s) Object.assign(settings, JSON.parse(s)); } catch(e){}
export function saveSettings(){ try{ localStorage.setItem('mc_clone_settings', JSON.stringify(settings)); }catch(e){} }
export const BLOCK_HARDNESS = {
  [GRASS]:0.6,[DIRT]:0.6,[SAND]:0.5,[GRAVEL]:0.6,[SNOW]:0.3,[LEAVES]:0.3,
  [WOOD]:1.5,[PLANKS]:1.2,[CRAFTING_TABLE]:1.5,[CACTUS]:0.5,[FURNACE]:3.5,[TORCH]:0.1,
  [STONE]:2.5,[COBBLESTONE]:2.5,[BRICK]:2.5,
  [COAL_ORE]:4,[IRON_ORE]:5,[GOLD_ORE]:5,[DIAMOND_ORE]:6,[BEDROCK]:Infinity,
};
export const BLOCK_TIER = { [COAL_ORE]:0, [IRON_ORE]:1, [GOLD_ORE]:2, [DIAMOND_ORE]:2, [BEDROCK]:99 };
export const FOODS = { [BEEF]:{heal:4,priority:2}, [ROTTEN_FLESH]:{heal:2,priority:1} };
export const MAX_MOBS = 15;
export const BIOME_NAMES = { ocean:'اقیانوس', desert:'بیابان', snowy:'کوهستان برفی', forest:'جنگل', plains:'دشت' };