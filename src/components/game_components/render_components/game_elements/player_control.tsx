import type { Player } from "../Objects/Player";
import Phaser from "phaser";
import { KeymapsManager } from "./KeymapsManager";
import keymaps_json from "../../../../components/settings/keymaps.json";


export const player_control = (player: Player) => {
  if (!player || !player.body) return;

  var isMoving = false;
  var isAttacking = false;
  var isNormalAttack = false;
  var isStrongAttack = false;
  var isBowAttack = false;

  player.setVelocity(0)

  /*if (KeyA.isDown) {
    player.setVelocityX((-1) * (movement_speed))
    isMoving = true;
    isFlipped = true;
    
  } else if (KeyD.isDown) {
    player.setVelocityX(movement_speed)
    isMoving = true;
    isFlipped = false;
    
  } else if (KeyW.isDown) {
    player.setVelocityY((-1) * (movement_speed))
    isMoving = true;
    
  } else if (KeyS.isDown) {
    player.setVelocityY(movement_speed)
    isMoving = true;
    
  
  if (KeyHAttack.isDown) {
    isAttacking = true;
    isNormalAttack = true;
    isMoving = false;
    player.setVelocity(0);
    
  
  if (KeyJStrongAttack.isDown) {
    isAttacking = true;
    isStrongAttack = true;
    isMoving = false;
    player.setVelocity(0);
    
  
  if (KeyKBowAttack.isDown) {
    isAttacking = true;
    isBowAttack = true;
    isMoving = false;
    player.setVelocity(0);
    
  
  player.setFlipX(isFlipped);
  
  if (isMoving) {
    if (player.anims.currentAnim?.key !== 'walking') {
      player.play('walking');
      
    else if (isAttacking) {
    if (isNormalAttack) {
      if (player.anims.currentAnim?.key !== 'attack') {
        player.play('attack');
        
      else if (isStrongAttack) {
      if (player.anims.currentAnim?.key !== 'strong_attack') {
        player.play('strong_attack')
        
      else if (isBowAttack) {
      if (player.anims.currentAnim?.key !== 'bow_attack') {
        player.play('bow_attack')
        
      
    else {
    if (player.anims.currentAnim?.key !== 'idle') {
      player.play("idle");
      
    
  }*/
  

}

