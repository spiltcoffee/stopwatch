declare global {
  const FLAGS: Record<"PRODUCTION" | "WEB", boolean>;
}

const flags = FLAGS;

export const PRODUCTION = flags.PRODUCTION;
export const WEB = flags.WEB;
