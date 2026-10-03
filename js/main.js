import * as THREE from 'three';
import { SEA_LEVEL, WORLD_HEIGHT, AIR, WATER, GRASS, DIRT, STONE, SAND, WOOD, LEAVES, PLANKS,
  BRICK, CRAFTING_TABLE, FURNACE, COBBLESTONE, isTouch, BIOME_NAMES } from './config.js';
import { scene, camera, renderer, state, player, mobs, arrows, particles, HOTBAR, inventory,
  modifiedBlocks, loadedChunks } from './state.js';
import { initAudio } from './audio.js';
import { getChunkData, updateChunks, getBlockWorld, markDirty } from './chunks.js';
import { getBiome } from './worldgen.js';
import { updatePlayer, updateFootsteps, vibrate } from './player.js';
import { updateMobs, trySpawnMobs, Mob, G as MG } from './mobs.js';
import { updateArrows, shootArrow, explodeAt, AG } from './arrows.js';
import { updateParticles } from './particles.js';
import { updateMining, doBreak, doPlace, setOpenFurnace } from './mining.js';
import { ITEMS } from './items.js';
import { addToInventory, removeFromInventory, getInventoryCount, renderHotbar, selectSlot,
  useToolDurability, eatBestFood, eatFood, G as IG } from './inventory.js';
import { renderInventory, openInventory, closeInventory } from './crafting.js';
import { updateFurnace, openFurnace } from './furnace.js';
import { notify, updateHealthBar, damagePlayer, killPlayer, updateSky, updateInfoDisplay,
  updateFps, showMenu, hideMenu, isNightTime } from './ui.js';
import { toggleFly, setupTouchControls, setupSettings, setupOrientation, IG as ING } from './input.js';
import { saveWorld, loadWorld, respawnPlayer, SG } from './save.js';
MG.addToInventory=addToInventory;MG.damagePlayer=damagePlayer;MG.explodeAt=explodeAt;MG.shootArrow=shootArrow;MG.isNightTime=isNightTime;
AG.damagePlayer=damagePlayer;IG.renderInventory=renderInventory;IG.updateEatBtn=updateEatBtn;IG.notify=notify;IG.updateHealthBar=updateHealthBar;
ING.saveWorld=saveWorld;ING.loadWorld=loadWorld;ING.showMenu=showMenu;SG.renderInventory=renderInventory;SG.updateDownBtn=updateDownBtn;SG.updateEatBtn=updateEatBtn;
SG.applyGameMode=applyGameMode;SG.renderHotbar=renderHotbar;SG.updateHealthBar=updateHealthBar;SG.hideMenu=hideMenu;SG.notify=notify;setOpenFurnace(openFurnace);
function updateDownBtn(){const b=document.getElementById('btn-down');if(b)b.style.display=(player.fly&&state.gameMode==='creative')?'flex':'none';}
function updateEatBtn(){const btn=document.getElementById('btn-eat');if(!btn)return;const hasFood=(getInventoryCount(26)>0)||(getInventoryCount(23)>0),hungry=player.health<player.maxHealth;btn.style.display=(isTouch&&hasFood&&hungry&&state.gameMode==='survival')?'flex':'none';}
function applyGameMode(){const flyBtn=document.getElementById('btn-fly');if(state.gameMode==='creative'){flyBtn.style.display='flex';document.getElementById('btn-eat').style.display='none';document.getElementById('health-bar').style.display='none';}else{flyBtn.style.display=isTouch?'flex':'none';document.getElementById('health-bar').style.display='flex';}document.body.classList.toggle('creative-mode',state.gameMode==='creative');}
function startNewWorld(mode){for(const[key,entry]of loadedChunks){for(const m of entry.meshes){scene.remove(m);m.geometry.dispose();}}loadedChunks.clear();modifiedBlocks.clear();Object.keys(inventory).forEach(k=>delete inventory[k]);for(const m of[...mobs])m.die(false);for(const a of arrows){scene.remove(a.mesh);}arrows.length=0;for(const p of particles){scene.remove(p.mesh);}particles.length=0;state.SEED=Math.floor(Math.random()*1000000);state.gameMode=mode;state.worldTime=0;state.yaw=0;state.pitch=0;player.health=20;player.dead=false;player.fly=(mode==='creative');player.pos.set(0.5,SEA_LEVEL+20,0.5);player.vel.set(0,0,0);getChunkData(0,0);let y=WORLD_HEIGHT-1;while(y>0&&getBlockWorld(0,y,0)===AIR)y--;player.pos.y=y+2;if(state.gameMode==='creative'){const defaultItems=[GRASS,DIRT,STONE,SAND,WOOD,PLANKS,CRAFTING_TABLE,FURNACE,COBBLESTONE];for(let i=0;i<9;i++)HOTBAR[i]={id:defaultItems[i],name:ITEMS[defaultItems[i]].name};}else{HOTBAR.length=0;[GRASS,DIRT,STONE,SAND,WOOD,LEAVES,PLANKS,BRICK,CRAFTING_TABLE].forEach(id=>HOTBAR.push({id,name:ITEMS[id].name}));}state.selected=0;applyGameMode();updateChunks(player.pos.x,player.pos.z);renderHotbar();updateHealthBar();updateDownBtn();updateEatBtn();hideMenu();notify('🎮 حالت '+(mode==='creative'?'خلاقیت':'بقا')+' فعال شد');if(!isTouch)setTimeout(()=>renderer.domElement.requestPointerLock(),100);else requestFullscreenOnce();}
function requestFullscreenOnce(){try{const el=document.documentElement;if(el.requestFullscreen)el.requestFullscreen({navigationUI:'hide'}).catch(()=>{});else if(el.webkitRequestFullscreen)el.webkitRequestFullscreen();}catch(e){}}
document.getElementById('menu-survival').addEventListener('click',()=>startNewWorld('survival'));document.getElementById('menu-creative').addEventListener('click',()=>startNewWorld('creative'));
document.getElementById('menu-continue').addEventListener('click',()=>{if(loadWorld()){if(!isTouch)setTimeout(()=>renderer.domElement.requestPointerLock(),100);else requestFullscreenOnce();}});
const overlayEl=document.getElementById('overlay');overlayEl.addEventListener('pointerdown',e=>{e.preventDefault();requestFullscreenOnce();initAudio();if(isTouch)overlayEl.style.display='none';else renderer.domElement.requestPointerLock();});
document.getElementById('overlay-help').innerHTML=isTouch?'<b>جویاستیک چپ:</b> حرکت • <b>کشیدن راست:</b> چرخش<br><b>▲</b> پرش • <b>✈</b> پرواز • <b>⛏</b> حمله/شکستن • <b>▣</b> گذاشتن<br><b>🎒</b> اینونتوری • <b>🍖</b> خوردن':'<kbd>WASD</kbd> • <kbd>Space</kbd> پرش • <kbd>F</kbd> پرواز • <kbd>E</kbd> اینونتوری • <kbd>G</kbd> خوردن<br><kbd>1-9</kbd> • <kbd>Z</kbd> ذخیره • <kbd>X</kbd> بارگذاری';
document.getElementById('respawn-btn').addEventListener('click',respawnPlayer);
addEventListener('resize',()=>{camera.aspect=innerWidth/innerHeight;camera.updateProjectionMatrix();renderer.setSize(innerWidth,innerHeight);});addEventListener('orientationchange',()=>{setTimeout(()=>{camera.aspect=innerWidth/innerHeight;camera.updateProjectionMatrix();renderer.setSize(innerWidth,innerHeight);},150);});
setupTouchControls();setupSettings();setupOrientation();const clock=new THREE.Clock();let lastBiome='',biomeLabelTimer=0;const biomeLabel=document.getElementById('biome-label');
function update(dt){const playing=document.getElementById('menu').style.display==='none';if(!playing)return;state.worldTime+=dt;updateSky();const blocked=document.getElementById('inv-modal').classList.contains('open')||player.dead;updatePlayer(dt,blocked);updateFootsteps(dt);updateMining(dt);updateChunks(player.pos.x,player.pos.z);updateMobs(dt);updateArrows(dt);updateParticles(dt);trySpawnMobs(dt);updateFurnace(dt);const biome=getBiome(Math.floor(player.pos.x),Math.floor(player.pos.z));if(biome!==lastBiome){lastBiome=biome;biomeLabel.textContent=BIOME_NAMES[biome]||biome;biomeLabel.style.opacity='1';biomeLabelTimer=3;}if(biomeLabelTimer>0){biomeLabelTimer-=dt;if(biomeLabelTimer<=0)biomeLabel.style.opacity='0';}updateInfoDisplay();}
function animate(){requestAnimationFrame(animate);const dt=Math.min(clock.getDelta(),0.05);update(dt);updateFps(dt);renderer.render(scene,camera);}
document.getElementById('loading').style.display='none';document.body.classList.remove('playing');showMenu();renderHotbar();updateHealthBar();animate();