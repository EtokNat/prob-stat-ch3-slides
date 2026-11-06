// Reveal boot + MathJax retypeset + per-slide autofit
function retypeset(){
  if (window.MathJax && MathJax.typesetPromise) {
    MathJax.typesetPromise().catch(()=>{});
  }
}
function fitSlide(el){
  if(!el) return;
  const slide = (el.tagName && el.tagName.toLowerCase()==='section') ? el : (el.closest && el.closest('section'));
  if(!slide) return;
  slide.style.transform = '';
  slide.style.transformOrigin = '';
  requestAnimationFrame(()=>{
    const cfg = (window.Reveal && Reveal.getConfig) ? Reveal.getConfig() : {};
    const canvasH = cfg.height || 900;
    const contentH = slide.scrollHeight;
    if(contentH > canvasH + 2){
      const scale = (canvasH / contentH) * 0.98;
      slide.style.transformOrigin = 'top center';
      slide.style.transform = `scale(${scale})`;
    }
  });
}
function fitAll(){
  document.querySelectorAll('.reveal .slides > section').forEach(fitSlide);
}
document.addEventListener('DOMContentLoaded', ()=>{
  Reveal.initialize({
    hash:true, slideNumber:'c/t', controls:true, progress:true,
    center:false, transition:'slide', backgroundTransition:'fade',
    touch:true, keyboard:true,
    width:1440, height:900, margin:0.06,
    minScale:0.3, maxScale:2.0,
    plugins:[ RevealHighlight, RevealNotes ]
  });
  Reveal.on('ready', e => { retypeset(); setTimeout(()=>fitSlide(e.currentSlide),120); });
  Reveal.on('slidechanged', e => { retypeset(); setTimeout(()=>fitSlide(e.currentSlide),80); });
  Reveal.on('fragmentshown', e => fitSlide(e.fragment));
  Reveal.on('fragmenthidden', e => fitSlide(e.fragment));
  let t; window.addEventListener('resize', ()=>{ clearTimeout(t); t=setTimeout(fitAll,150); });
});
