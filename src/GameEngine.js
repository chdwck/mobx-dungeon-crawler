import { TweenLite } from 'gsap';
import UniverseStore from './UniverseStore';
const { xPos, yPos, moveCharacter } = UniverseStore;

export const movement = () => {
  window.addEventListener('keydown', (e) => {
    let dir;
     switch (e.keyCode) {
       case 37:
         dir = 'left';
         break;
       case 38:
         dir = 'up';
         break;
       case 39:
         dir = 'right'
         break;
       case 40:
         dir = 'down';
         break;
       default:
        console.log('Default');
     }
   moveCharacter(dir);
  })
}
