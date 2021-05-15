// script.js

import { router } from './router.js'; // Router imported so you can use it to manipulate your SPA app here
const setState = router.setState;
const settingState = router.settingState;
const entryState = router.entryState;
const homeState = router.homeState;

// Make sure you register your service worker here too

document.addEventListener('DOMContentLoaded', () => {
  var i=1;
  fetch('https://cse110lab6.herokuapp.com/entries')
    .then(response => response.json())
    .then(entries => {
      entries.forEach(entry => {
        let newPost = document.createElement('journal-entry');
        newPost.entry = entry;
        newPost.entryNum=i;
        newPost.addEventListener('mouseup', () => {
          setState("entry",newPost.entryNum);
        },false);
        document.querySelector('main').appendChild(newPost);
        i++;
      });
    });
});
document.querySelector('img').addEventListener('mouseup', () => {
  setState("settings");
},false);
document.querySelector('h1').addEventListener('mouseup', () => {
  setState('journal');
},false);

window.addEventListener('popstate', (event) => {
  if(event.state===null)homeState();
  console.log(JSON.stringify(event.state));
  if(event.state.name=='settings'){
    settingState();
  }else if(event.state.name=='entry'){
    entryState(event.state.num);
  }else{
    homeState();
  }
});

//Part 2

if ('serviceWorker' in navigator) {
  window.addEventListener('load', function() {
    navigator.serviceWorker.register('/sw.js').then(function(registration) {
      console.log('ServiceWorker registration successful with scope: ', registration.scope);
    }, function(err) {
      console.log('ServiceWorker registration failed: ', err);
    });
  });
}