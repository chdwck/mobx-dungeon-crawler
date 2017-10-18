import { TweenLite, TimelineLite } from 'gsap';

export const crossTarget = (p1, p2) => {
  TweenLite.to('#chosenKey', 0, {display:'inline'})
  TweenLite.to('#percent', 0, {display:'none'})
  TweenLite.fromTo('.Hitbox1', .01, {scale: 1, opacity:1, top: (p1 * 1.1) + 'vh', left: '50vw'}, {top: (p2 * 1.1) + 'vh'});
  TweenLite.fromTo('.Hitbox2', .01, {opacity:1, left: (p1 * .985) + 'vw', top: '50vh'}, {left: (p2 * .985) + 'vw'});

}
export const hide = () => {
  TweenLite.to('.Hitbox1', 0, {opacity:0});
  TweenLite.to('.Hitbox2', 0, {opacity: 0});
}

export const confirmClick = () => {
  const timeline = new TimelineLite();
      timeline.to('#percent', 0, {display:'inline'})
              .to('#chosenKey', 0, {display: 'none'})
              .to('.Hitbox1', .2, {scale: 1.5})
              .to('.Hitbox1', .4, {opacity: 0.0, top: -100})
              .to('.Hitbox2', .4, {opacity: 0.0, top: -100}, '-=.4');
}
