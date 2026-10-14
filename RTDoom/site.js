'use strict';
const dialog=document.querySelector('#image-dialog');
const dialogImage=document.querySelector('#dialog-image');
let lastTrigger;
for(const button of document.querySelectorAll('[data-enlarge]')){
  button.addEventListener('click',()=>{
    lastTrigger=button;
    dialogImage.src=button.dataset.enlarge;
    dialogImage.alt=button.dataset.caption;
    document.querySelector('#dialog-caption').textContent=button.dataset.caption;
    dialog.showModal();
  });
}
document.querySelector('#close-dialog')?.addEventListener('click',()=>dialog.close());
dialog?.addEventListener('click',event=>{if(event.target===dialog)dialog.close();});
dialog?.addEventListener('close',()=>lastTrigger?.focus());
const tabs=[...document.querySelectorAll('[role=tab]')];
function selectTab(tab){
  for(const button of tabs){button.setAttribute('aria-selected',String(button===tab));button.tabIndex=button===tab?0:-1;}
  const path=`assets/${tab.dataset.image}`;
  const image=document.querySelector('#settings-image');image.src=path;image.alt=tab.dataset.caption;
  const preview=document.querySelector('#settings-preview');preview.dataset.enlarge=path;preview.dataset.caption=tab.dataset.caption;
  document.querySelector('#settings-caption').textContent=tab.dataset.caption.toUpperCase();
  document.querySelector('#settings-panel').setAttribute('aria-labelledby',tab.id);
}
for(const tab of tabs){
  tab.addEventListener('click',()=>selectTab(tab));
  tab.addEventListener('keydown',event=>{
    let index=tabs.indexOf(tab);
    if(event.key==='ArrowRight')index=(index+1)%tabs.length;
    else if(event.key==='ArrowLeft')index=(index+tabs.length-1)%tabs.length;
    else if(event.key==='Home')index=0;
    else if(event.key==='End')index=tabs.length-1;
    else return;
    event.preventDefault();tabs[index].focus();selectTab(tabs[index]);
  });
}

const motionPreference=matchMedia('(prefers-reduced-motion: reduce)');
function updateVideoMotion(){for(const video of document.querySelectorAll('video')){video.autoplay=!motionPreference.matches;if(motionPreference.matches)video.pause();}}
updateVideoMotion();motionPreference.addEventListener('change',updateVideoMotion);
