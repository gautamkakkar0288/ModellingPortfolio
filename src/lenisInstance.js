// Shared mutable reference so any component can call lenisRef.current?.scrollTo(...)
// without needing React context or prop drilling.
export const lenisRef = { current: null };
