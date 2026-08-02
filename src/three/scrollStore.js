// Mutable, render-free bridge so DOM overlays (the depth HUD) can read the
// live scroll offset that lives inside the R3F canvas without triggering
// React re-renders every frame.
export const scrollState = { offset: 0 }
