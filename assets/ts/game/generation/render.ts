import {gameState} from "../../window";
import {stopLoop, floorMultiple} from "../../lib/util";
import {CameraOctreeMap} from "../../lib/camera";
import {cam} from "../camera";
import {Scene} from "three";
import {VoxelWorld} from "./chunk";

var world: VoxelWorld;
export function setRenderChunkData(w: VoxelWorld) {
  world = w;
  chunkRenderLoop.start();
}

const counterOg: number = 50;
var counter: number = counterOg;

function deleteIfOutRadius(r: number) {
  r += 1;
  const x = 
  floorMultiple(cam.camera.position.x, world.CHUNK_SIZE) / 
  world.CHUNK_SIZE;
  const y = 
  floorMultiple(cam.camera.position.z, world.CHUNK_SIZE) / 
  world.CHUNK_SIZE;
  
  cam.octrees!.forEach((cx: number, cy: number): void => {
    if(x + r < cx
    || x - r > cx
    || y + r < cy
    || y - r > cy) {
      for(const blocks of cam.octrees!.get(cx, cy).blocks)
        world.scene.remove(blocks);
      
      cam.octrees!.remove(cx, cy);
    }
  });
}

function addInRadius(r: number) {
  const x = 
  floorMultiple(cam.camera.position.x, world.CHUNK_SIZE) / 
  world.CHUNK_SIZE;
  const y = 
  floorMultiple(cam.camera.position.z, world.CHUNK_SIZE) / 
  world.CHUNK_SIZE;
  
  for(let yy = y-r; yy < y+r; yy++) {
    for(let xx = x-r; xx < x+r; xx++) {
      if(cam.octrees!.get(xx, yy) == undefined) {
        cam.octrees!.set(xx, yy, world.loadChunk(xx, yy));
      }
    }
  }
}

export const chunkRenderLoop = stopLoop(() => {
  if(counter-- <= 0) {
    counter = counterOg;
    const {renderDistance} = gameState;
    deleteIfOutRadius(renderDistance);
    addInRadius(renderDistance);
  }
}, false);