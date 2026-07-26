document.addEventListener('DOMContentLoaded', () => {
    
    // Auto-navigate from splash to search after 1.5s delay
    // This gives a premium app launch feel.
    setTimeout(() => {
        navigateTo('screen-search');
    }, 1500);

});

let isAnimating = false;
const ANIMATION_DURATION = 800; // 750ms transition + 50ms buffer

/**
 * Navigate Forward (e.g., Search -> Weather Details)
 * Target comes from the right side, current goes back and left.
 */
function navigateTo(targetId) {
    if (isAnimating) return;
    
    const current = document.querySelector('.screen.active');
    const target = document.getElementById(targetId);
    
    if (!target || current === target) return;
    isAnimating = true;

    // Current pushes back to the LEFT
    if (current) {
        current.className = 'screen outgoing-left';
    }
    
    // Target starts hidden on the RIGHT
    target.className = 'screen hidden';
    
    // Force DOM reflow so the browser registers the starting position
    void target.offsetWidth;
    
    // Animate target to center
    target.className = 'screen active';

    // Unlock animation after it completes
    setTimeout(() => {
        isAnimating = false;
    }, ANIMATION_DURATION);
}

/**
 * Navigate Backward (e.g., Weather Details -> Search)
 * Target comes from the left side, current goes back and right.
 */
function navigateBack(targetId) {
    if (isAnimating) return;
    
    const current = document.querySelector('.screen.active');
    const target = document.getElementById(targetId);
    
    if (!target || current === target) return;
    isAnimating = true;

    // Current pushes back to the RIGHT
    if (current) {
        current.className = 'screen outgoing-right';
    }
    
    // Target starts hidden on the LEFT
    target.className = 'screen hidden-left';
    
    // Force DOM reflow
    void target.offsetWidth;
    
    // Animate target to center
    target.className = 'screen active';

    // Unlock animation after it completes
    setTimeout(() => {
        isAnimating = false;
    }, ANIMATION_DURATION);
}

// Expose to window for onclick handlers in HTML
window.navigateTo = navigateTo;
window.navigateBack = navigateBack;
