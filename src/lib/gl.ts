// Shared client-side capability checks for the animated scenes. Both the hero
// fallback and the scroll-driven particle field need the same answer.

/** True for software rasterizers (SwiftShader, llvmpipe) or no WebGL at all. */
export function isSoftwareGL(): boolean {
  try {
    const c = document.createElement("canvas");
    const gl = c.getContext("webgl");
    if (!gl) return true;
    const ext = gl.getExtension("WEBGL_debug_renderer_info");
    const renderer = ext ? String(gl.getParameter(ext.UNMASKED_RENDERER_WEBGL)) : "";
    gl.getExtension("WEBGL_lose_context")?.loseContext();
    return !renderer || /swiftshader|llvmpipe|softpipe|software/i.test(renderer);
  } catch {
    return true;
  }
}

export function prefersReducedMotion(): boolean {
  return (
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}
