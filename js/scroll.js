
function scroll(event) {

  distance = event.deltaY > 0 ? window.innerHeight : -1 * window.innerHeight;

  window.scrollBy({
    top: distance,
    left: 0,
    behavior: 'smooth'
  });

}

let time = Date.now();

function scrollEventThrottle(event) {

  event.preventDefault();

  if ((time + 500 - Date.now()) < 0) {

    time = Date.now();
    scroll(event);

  }

}

document.addEventListener('wheel', scrollEventThrottle, {passive: false});
