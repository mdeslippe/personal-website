
// Check if the browser is safari or firefox. This be used to determine if the
// browser the user is viewing the site with supports smooth scrolling.
let browserIsSafariOrFirefox = /^((?!chrome|android).)*safari/i.test(navigator.userAgent.toLowerCase()) ||
  (navigator.userAgent.toLowerCase().indexOf('firefox') > -1);

// Get the current time in milliseconds. The time will be set whenever the scroll
// function is invoked through the scrollEventThrottle function.
let time = Date.now();

/**
 * Modify the default browser scrolling to smoothly scroll up or down by one page.
 * @param {Object} event The "wheel" event that was triggered by the user scrolling
 * @return {Void} This function does not return anything.
 */
function scroll(event) {

  distance = event.deltaY > 0 ? window.innerHeight : -1 * window.innerHeight;

  window.scrollBy({
    top: distance,
    left: 0,
    behavior: "smooth"
  });

}

/**
 * Throttle the smooth page scroll handler, so it is not overly triggered.
 * @param {Object} event The "wheel" event that was triggered by the user scrolling
 * @return {Void} This function does not return anything.
 */
function scrollEventThrottle(event) {

  // If the user is trying to resize their screen, ignore the event.
  if (event.ctrlKey)
    return;

  // Mobile looks better with manual scrolling.
  if (window.innerWidth <= 800)
    return;

  // Prevent the default scroll behavior.
  event.preventDefault();

  if ((time + 500 - Date.now()) < 0) {

    time = Date.now();
    scroll(event);

  }

}

// Add the scroll event listener.
// Smooth scrolling is not supported by Safari or Firefox.
if (!browserIsSafariOrFirefox)
  document.addEventListener("wheel", scrollEventThrottle, {passive: false});
