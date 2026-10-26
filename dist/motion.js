// Subtle motion; one controller per route, with accessible playback controls.
window.initMotion = (() => {
 let cleanup=()=>{};
 return () => {
  cleanup();
  const reduced=matchMedia('(prefers-reduced-motion: reduce)');
  const targets=[...document.querySelectorAll('#app .section-head, #app .card, #app .collection a, #app .story-copy, #app .story > img, #app .cta > *, #app .detail-layout > *, #app .contact-layout > *')];
  const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{
   if(entry.isIntersecting){entry.target.classList.add('revealed');observer.unobserve(entry.target)}
  }),{threshold:0.08,rootMargin:'0px 0px -24px 0px'});
  if(!reduced.matches)targets.forEach((el,i)=>{el.classList.add('reveal');el.style.setProperty('--reveal-delay',`${el.classList.contains('card')?(i%3)*65:0}ms`);observer.observe(el)});
  const hero=document.querySelector('.hero');let timer=null;
  let stop=()=>{clearInterval(timer);timer=null};
  let onVisibility=()=>{},onPreference=()=>{};
  if(hero){
   const sources=['assets/hero.jpg','assets/property-0.jpg','assets/property-3.jpg','assets/property-4.jpg'];
   const slides=document.createElement('div');slides.className='hero-slides';slides.setAttribute('aria-hidden','true');
   slides.innerHTML=sources.map((src,i)=>`<div class="hero-slide ${i===0?'is-active':''}" style="background-image:url('${src}')"></div>`).join('');hero.prepend(slides);
   const old=hero.querySelector('.hero-index');if(old)old.remove();
   const controls=document.createElement('div');controls.className='hero-controls';controls.setAttribute('aria-label','Hero slideshow');
   controls.innerHTML=`<span class="slide-number" aria-hidden="true">01 / 04</span><div class="slide-dots">${sources.map((_,i)=>`<button type="button" class="slide-dot ${i===0?'is-current':''}" aria-label="Show property image ${i+1}" aria-pressed="${i===0}"></button>`).join('')}</div><button type="button" class="slide-play" aria-label="Pause slideshow">Ⅱ</button>`;hero.append(controls);
   const layers=[...slides.children],dots=[...controls.querySelectorAll('.slide-dot')],play=controls.querySelector('.slide-play');let current=0,paused=reduced.matches;
   const show=i=>{layers[current].classList.remove('is-active');dots[current].classList.remove('is-current');dots[current].setAttribute('aria-pressed','false');current=i;layers[i].classList.add('is-active');dots[i].classList.add('is-current');dots[i].setAttribute('aria-pressed','true');controls.querySelector('.slide-number').textContent=`0${i+1} / 04`};
   const sync=()=>{stop();play.textContent=paused?'▶':'Ⅱ';play.setAttribute('aria-label',paused?'Play slideshow':'Pause slideshow');hero.classList.toggle('motion-paused',paused||document.hidden);if(!paused&&!document.hidden)timer=setInterval(()=>show((current+1)%layers.length),5000)};
   play.onclick=()=>{paused=!paused;sync()};dots.forEach((dot,i)=>dot.onclick=()=>{show(i);sync()});
   onVisibility=sync;onPreference=()=>{paused=reduced.matches;if(paused)targets.forEach(el=>el.classList.add('revealed'));sync()};
   document.addEventListener('visibilitychange',onVisibility);reduced.addEventListener('change',onPreference);sync();
  }
  cleanup=()=>{observer.disconnect();stop();document.removeEventListener('visibilitychange',onVisibility);reduced.removeEventListener('change',onPreference)};
 };
})();
