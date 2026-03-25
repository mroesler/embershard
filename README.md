# Embershard

> *The world shattered. The ember still glows.*

A top-down 2D adventure game of dungeons, relics, and a hero who carries the last fragment of an ancient power.

---

## Status

Early development. Private repository.

---

## Tech Stack

- [Excalibur.js](https://excaliburjs.com/) — TypeScript-native 2D game engine
- TypeScript
- Browser-based (PC executable via Electron planned)

---

## Development

**Requirements:** Node.js 24+ (see `.nvmrc`), npm 10+

```bash
npm install        # install dependencies
npm start          # dev server at http://localhost:9999
npm test           # run tests
npm run test:coverage   # tests + coverage report
npm run lint       # lint
npm run format     # format with Prettier
npm run build      # type-check + production build → dist/
npm run analyze    # build + open bundle size visualizer
```

Commits must follow [Conventional Commits](https://www.conventionalcommits.org/) — enforced by commitlint.

---

## License

### Code
The source code in this repository is licensed under the **MIT License** — see [`LICENSE`](LICENSE) for details.

### Assets
All game assets including but not limited to sprites, tilesets, maps, music, and sound effects are **not** covered by the MIT License and remain **All Rights Reserved**. You may not reproduce, distribute, or use them without explicit written permission.
