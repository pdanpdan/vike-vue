# Contributing

## Building

Build `vike-vue`:

```bash
git clone git@github.com:vikejs/vike-vue
cd vike-vue/
pnpm install
pnpm build
```

> Note that you'll need [pnpm](https://pnpm.io/) for development, which you can install with `$ npm install -g pnpm`.
>
> However pnpm isn't needed for simply making use of the npm package `vike-vue`: any package manager will do.

## Validating

### Running the examples

You can then test your modifications against an example, e.g. `examples/full/`:

```bash
cd examples/full/
pnpm dev
cd ../../
```

## Releasing

In order to release the next patch version (`MAJOR.MINOR.PATCH`, see [Semantic Versioning](https://semver.org/)), run:

```bash
cd packages/vike-vue/
pnpm release
cd ../../
```

This will:

- update the version number and dependencies in `package.json`,
- extend [`CHANGELOG.md`](CHANGELOG.md),
- update the `pnpm-lock.yaml` file,
- create a `release: vike-vue@1.2.3` git commit and push it,
- create a `vike-vue@1.2.3` git tag and push it,
- build the package and publish it to npm.

Extend [`CHANGELOG.md`](CHANGELOG.md) if anything is missing, as the release script:

- only picks up commits
  [that match the pattern of "Feature", "Fix", "Performance Improvement" or "Breaking Changes"](https://github.com/conventional-changelog/conventional-changelog/tree/master/packages/conventional-changelog-cli),
- mistakenly picks up commits touching all packages in this monorepo, not only `vike-vue`.
