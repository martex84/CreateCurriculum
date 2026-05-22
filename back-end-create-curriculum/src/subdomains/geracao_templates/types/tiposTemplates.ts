export const valoresTiposTemplates = ["padrao"] as const;

export type TiposTemplates = (typeof valoresTiposTemplates)[number];
