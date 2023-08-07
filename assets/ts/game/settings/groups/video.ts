import {updateCanvasSize} from "../../../ui";
import {gameState} from "../../../window";
import {SettingGroup, ToggleSettingComponent} from "../main";

const fullScreenToggle = new ToggleSettingComponent({
  id: "fullscreen",
  name: "Use Fullscreen",
  defaultValue: gameState.useFullScreen
})
fullScreenToggle.addEventListener("enable", () => {
  gameState.useFullScreen = true;
})
fullScreenToggle.addEventListener("disable", () => {
  gameState.useFullScreen = false;
})

const bodyPaddingToggle = new ToggleSettingComponent({
  id: "body-padding",
  name: "Body Padding",
  defaultValue: false
})
bodyPaddingToggle.addEventListener("enable", () => {
  gameState.canvas.paddingWidth = 10;
  gameState.canvas.paddingHeight = 50;
  updateCanvasSize();
})
bodyPaddingToggle.addEventListener("disable", () => {
  gameState.canvas.paddingWidth = 0;
  gameState.canvas.paddingHeight = 0;
  updateCanvasSize();
})

const group = new SettingGroup({id: "video", name: "Video"})
  .addComponent(fullScreenToggle)
  .addComponent(bodyPaddingToggle)

export {group as video}