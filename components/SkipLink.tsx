
/**
 * SkipLink renders an accessible "Skip to main content" anchor that becomes
 * visible when focused. This allows keyboard and screen‑reader users to bypass
 * the controls panel and jump straight to the main content.
 */
function SkipLink() {
  return (
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 bg-primary text-primary-foreground px-4 py-2 rounded-md shadow-lg"
    >
      Skip to main content
    </a>
  );
}

export default SkipLink; 