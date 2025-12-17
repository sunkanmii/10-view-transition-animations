// Check if View Transitions API is supported
const supportsViewTransitions = 'startViewTransition' in document;

if (!supportsViewTransitions) {
  document.querySelector('.info').innerHTML = '❌ View Transitions API not supported in this browser. Try Chrome/Edge 126+';
}

// Get or set the current effect from sessionStorage
let currentEffect = sessionStorage.getItem('transition-effect') || 'pixelate-dissolve';

// Update active button based on stored effect
document.querySelectorAll('.transition-btn').forEach(btn => {
  if (btn.dataset.effect === currentEffect) {
    btn.classList.add('active');
  } else {
    btn.classList.remove('active');
  }
});

// Handle transition effect selection
document.querySelectorAll('.transition-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.transition-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    currentEffect = btn.dataset.effect;
    // Store the selected effect
    sessionStorage.setItem('transition-effect', currentEffect);
  });
});

// Use pagereveal event to set the transition type for incoming page
window.addEventListener('pagereveal', (e) => {
  if (e.viewTransition) {
    const effect = sessionStorage.getItem('transition-effect') || 'pixelate-dissolve';
    e.viewTransition.types.add(effect);
  }
});