export const platforms = ["spotify", "youtube"] as const;

export type Platform = (typeof platforms)[number];
