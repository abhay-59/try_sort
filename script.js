const n = 40;
const array = [];
let audioctx=null;
init();
function init() {
  for (let i = 0; i < n; i++) {
    array[i] = Math.random();
  }
  show();
}
function play() {
  const copy = [...array]; // this is call by refernce dynamic c++ '&'
  const swaps = bubblesort(copy);
    animate(swaps);
  //show();
}
function animate(swaps) {
//   if (swaps.length == 0) {
//     show();
//     return;
//   }
// for green line check at end
  if (swaps.length == 0) {
    show();
    const bars = document.querySelectorAll(".bar");
    for (let i = bars.length - 1; i >= 0; i--) {
      const bar = bars[i];
      const previousBar = bars[i + 1];
      setTimeout(function() {
          bar.style.backgroundColor = "green";
          playnote(200 + array[i] * 500);
          if (previousBar) {
          previousBar.style.backgroundColor = "black";
          playnote(200 + array[i+1] * 500)
          if (i == 0){
            bars[0].style.backgroundColor = "black";
          }
          ;}
      }, 30 * (bars.length - i)); 
    }
    return;
  }
  // for green line check at end
  const [i, j] = swaps.shift();
  [array[i], array[j]] = [array[j], array[i]];
  show([j]);
  playnote(200+array[i]*500);
  //playnote(200+array[j]*500);
  setTimeout(function () {
    animate(swaps);
  }, 30);
}
function bubblesort(array) {
  const swaps = [];
  do {
    var swapped = false;
    for (let i = 1; i < n; i++) {
      if (array[i - 1] > array[i]) {
        swapped = true;
        swaps.push([i - 1, i]);
        [array[i - 1], array[i]] = [array[i], array[i - 1]];
      }
    }
  } while (swapped);
  return swaps;
}
function show(indices) {
  container.innerHTML = "";
  for (let i = 0; i < n; i++) {
    const bar = document.createElement("div");
    bar.style.height = array[i] * 100 + "%";
    bar.classList.add("bar");
    if(indices && indices.includes(i))
    {
        bar.style.background="red";
    }
    container.appendChild(bar);
  }
}
function playnote(freq)
{
    if(audioctx==null)
    {
        audioctx=new(
            AudioContext
            ||webkitAudioContext||window.webkitAudioContext
        )();
    }
    const dur=0.1;
    const osc=audioctx.createOscillator();
    osc.frequency.value=freq;
    osc.start();
    osc.stop(audioctx.currentTime+dur);
    const node=audioctx.createGain();
    node.gain.value=0.05;
    osc.connect(node);
    node.connect(audioctx.destination);
}