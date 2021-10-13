
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

  // If the user is trying to resize their screen, ignore the event.
  if(event.ctrlKey)
    return;

  // Smooth scrolling doesn't work on firefox.
  if (navigator.userAgent.toLowerCase().indexOf('firefox') > -1)
    return;

  // Mobile looks better with manual scrolling.
  if (window.innerWidth <= 800)
    return;

  event.preventDefault();

  if ((time + 500 - Date.now()) < 0) {

    time = Date.now();
    scroll(event);

  }

}

document.addEventListener('wheel', scrollEventThrottle, {passive: false});
