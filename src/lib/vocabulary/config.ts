// Single switch point per the mock-first spec: flip to "false" (and later add
// a real service implementation) when the backend integration pass happens.
// No component should ever import this directly — only src/lib/vocabulary/service.ts.
export const USE_MOCK_VOCABULARY = process.env.NEXT_PUBLIC_USE_MOCK_VOCABULARY !== "false";
