import { GRASS,DIRT,STONE,SAND,WOOD,LEAVES,WATER,PLANKS,BRICK,CRAFTING_TABLE,TORCH,
  CACTUS,SNOW,BEDROCK,GRAVEL,COBBLESTONE,COAL_ORE,IRON_ORE,GOLD_ORE,DIAMOND_ORE,FURNACE,
  STICK,COAL,IRON_INGOT,GOLD_INGOT,DIAMOND,ROTTEN_FLESH,BONE,LEATHER,BEEF,WOOL,
  TOOL_WOOD,TOOL_STONE,TOOL_IRON,TOOL_GOLD,TOOL_DIAMOND,TOOL_HOE } from './config.js';
export const ITEMS={
  [GRASS]:{name:'چمن',block:true},[DIRT]:{name:'خاک',block:true},[STONE]:{name:'سنگ',block:true},
  [SAND]:{name:'شن',block:true},[WOOD]:{name:'چوب',block:true},[LEAVES]:{name:'برگ',block:true},
  [WATER]:{name:'آب',block:true},[PLANKS]:{name:'تخته',block:true},[BRICK]:{name:'آجر',block:true},
  [CRAFTING_TABLE]:{name:'میز کار',block:true},[TORCH]:{name:'مشعل',block:true},
  [CACTUS]:{name:'کاکتوس',block:true},[SNOW]:{name:'برف',block:true},[BEDROCK]:{name:'سنگ بستر',block:true},
  [GRAVEL]:{name:'شن ریز',block:true},[COBBLESTONE]:{name:'سنگفرش',block:true},
  [COAL_ORE]:{name:'سنگ زغال',block:true},[IRON_ORE]:{name:'سنگ آهن',block:true},
  [GOLD_ORE]:{name:'سنگ طلا',block:true},[DIAMOND_ORE]:{name:'سنگ الماس',block:true},
  [FURNACE]:{name:'کوره',block:true},
  [STICK]:{name:'چوبدستی'},[COAL]:{name:'زغال'},[IRON_INGOT]:{name:'شمش آهن'},[GOLD_INGOT]:{name:'شمش طلا'},[DIAMOND]:{name:'الماس'},
  [ROTTEN_FLESH]:{name:'گوشت گندیده'},[BONE]:{name:'استخوان'},[LEATHER]:{name:'چرم'},[BEEF]:{name:'گوشت'},[WOOL]:{name:'پشم'},
};
export const TIERS_DATA={wood:{durability:59,speed:2,tier:0},stone:{durability:131,speed:4,tier:1},iron:{durability:250,speed:6,tier:2},gold:{durability:32,speed:12,tier:0},diamond:{durability:1561,speed:8,tier:3}};
export const TIER_NAMES={wood:'چوبی',stone:'سنگی',iron:'آهنی',gold:'طلایی',diamond:'الماسی'};
export const TOOL_NAMES={pick:'کلنگ',sword:'شمشیر',axe:'تیشه',shovel:'بیل',hoe:'کج‌بیل'};
export const TOOL_DAMAGE={pick:{wood:2,stone:3,iron:4,gold:2,diamond:5},sword:{wood:4,stone:5,iron:6,gold:4,diamond:7},axe:{wood:7,stone:9,iron:9,gold:7,diamond:9},shovel:{wood:2,stone:3,iron:4,gold:2,diamond:5},hoe:{wood:2,stone:2,iron:2,gold:2,diamond:2}};
export const TOOL_TYPE_NAMES=['pick','sword','axe','shovel','hoe'];
export const BASE_BY_TIER={wood:TOOL_WOOD,stone:TOOL_STONE,iron:TOOL_IRON,gold:TOOL_GOLD,diamond:TOOL_DIAMOND};
for(const[tierName,data] of Object.entries(TIERS_DATA)){const base=BASE_BY_TIER[tierName];for(let i=0;i<TOOL_TYPE_NAMES.length;i++){const type=TOOL_TYPE_NAMES[i],id=base+i;ITEMS[id]={name:TIER_NAMES[tierName]+' '+TOOL_NAMES[type],tool:type,tier:data.tier,maxDurability:data.durability,speed:data.speed,damage:TOOL_DAMAGE[type][tierName]};}}