// ── Root Layout (Server) ────────────────────────────────
// Empty load — exists only so child routes can inherit from a server layout
// if they need server-side data in future. Prerendering is set in +layout.ts.

import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = () => ({});
