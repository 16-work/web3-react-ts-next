export const contracts = {
  demo: {
    dev: '0x',
    prod: '0x',
  },
} as const satisfies Record<string, Record<Exclude<typeof process.env.NEXT_PUBLIC_ENV, 'mock' | 'test'>, `0x${string}`>>;
