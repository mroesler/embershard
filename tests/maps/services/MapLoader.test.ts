import { describe, it, expect, vi } from 'vitest';

vi.mock('@excaliburjs/plugin-tiled', () => ({
  TiledResource: vi.fn(function (this: unknown, path: string) {
    Object.assign(this as object, { path });
  }),
}));

vi.mock('excalibur', () => ({
  Loader: vi.fn(function (this: unknown, resources: unknown[]) {
    Object.assign(this as object, { resources });
  }),
}));

describe('MapLoader', () => {
  it('creates a TiledResource for the overworld map', async () => {
    const { TiledResource } = await import('@excaliburjs/plugin-tiled');
    await import('@/maps/services/MapLoader');
    expect(TiledResource).toHaveBeenCalledWith('/maps/overworld.tmj');
  });

  it('creates a Loader containing the overworld map resource', async () => {
    const { Loader } = await import('excalibur');
    const { overworldMap } = await import('@/maps/services/MapLoader');
    expect(Loader).toHaveBeenCalledWith([overworldMap]);
  });
});
