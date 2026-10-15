Build a premium, cinematic BMW M4 GT3 showcase webpage using Next.js, TypeScript, and Tailwind CSS.

### Main Feature: Scroll-Driven Image Sequence

I have converted the cinematic car reveal video into a sequence of individual images. Use these images to create a smooth, frame-by-frame scroll animation.

**Animation behavior:**
- Start with the empty, dark studio image.
- As the user scrolls down, progressively display the image sequence to reveal the BMW M4 GT3.
- Scrolling upward must reverse the animation smoothly.
- When scrolling stops, the animation must freeze at the corresponding frame.
- The final frame must display the fully revealed BMW M4 GT3.
- Pin the hero section during the animation and release it naturally when the sequence finishes.

### Image Sequence Requirements
- Use my existing image sequence; do not generate replacement images or use a video player.
- Automatically load images from a dedicated assets folder.
- Preserve the correct chronological order of frames.
- Preload the first few frames and progressively load the remaining frames.
- Use `requestAnimationFrame` to synchronize rendering with scroll progress.
- Render frames using an HTML canvas for smooth playback and efficient updates.
- Maintain the original image aspect ratio without stretching or distortion.
- Display the first frame immediately and provide a fallback if images fail to load.
- Avoid flickering, blank frames, image popping, and layout shifts.
- Optimize memory usage and performance, especially on mobile devices.

### Website Sections
1. **Cinematic Hero:** Scroll-controlled image sequence with minimal “BMW M4 GT3” typography.
2. **Car Overview:** Introduction and key specifications.
3. **Engine:** Explain the 3.0-litre twin-turbo inline-six and major engine components.
4. **Aerodynamics:** Explain the front splitter, rear wing, diffuser, and racing tires.
5. **Cockpit:** Showcase the steering wheel, digital display, and driver controls.
6. **Technical Specifications:** A compact, accurate specification section.
7. **Closing Hero:** A premium full-width image of the BMW M4 GT3.

### Design Direction
Use a dark graphite background, premium white typography, subtle BMW M-inspired blue and red accents, dramatic imagery, generous spacing, and refined transitions. The website must feel like an exclusive automotive campaign.

Keep the interface minimal. Avoid unnecessary cards, excessive text, distracting animations, and decorative elements that do not improve the experience.

### Technical Requirements
- Use Next.js, TypeScript, and Tailwind CSS.
- Use GSAP ScrollTrigger for pinning and scroll progress, or an equivalent reliable implementation.
- Keep the image sequence separate from the rest of the page components.
- Support mouse, trackpad, and touch scrolling.
- Respect reduced-motion preferences and provide a static-image fallback.
- Optimize images and avoid loading the entire sequence into memory unnecessarily.
- Ensure the animation works smoothly on desktop and mobile.
- Do not add audio or autoplay video.

### Before Implementation
Inspect the existing project structure and locate the image sequence. Determine the filename pattern, image count, dimensions, and format. If the files are not in the project, ask me for their folder location instead of inventing a path.

Implement the complete working animation, connect it to the actual image files, and test scrolling in both directions. Do not deliver a static mockup or placeholder animation.

**Priority:** Smooth scroll synchronization, correct image ordering, realistic visual continuity, fast loading, and a premium BMW M4 GT3 presentation.