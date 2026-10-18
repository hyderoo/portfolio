import a from "./a";
import b from "./b";
import c from "./c";
import d from "./d";

// Japanese strings, keyed by the exact English source text. Loaded on demand.
const ja: Record<string, string> = { ...a, ...b, ...c, ...d };
export default ja;
