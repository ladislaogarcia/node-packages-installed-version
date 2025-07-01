<!-- @format -->

# Node Packages Installed Version

> Small library developed to get some or list all installed dependencies version in a NodeJS project.

## Features

- [Semantic Release](https://github.com/semantic-release/semantic-release)
- [Issue Templates](https://github.com/ryansonshine/typescript-npm-package-template/tree/main/.github/ISSUE_TEMPLATE)

## Getting started

This package was inspired by the need to know what Prisma ORM version is in currently in use while I was developing the Prisma ORM generator called "@ladislaogarcia/zod-prisma-generator".

That generator is a fork from "prisma-zod-generator" but with the added value of working in Prisma ORM versions 5 and 6. The related forked generator only works fine until Prisma ORM version 4.

## Install

With **npm**:

```bash
npm install node-packages-installed-version
```

## Usage

```ts
// Import the package
import { getNodePackagesInstalledVersion } from 'node-packages-installed-version';

// Get the installed version of all the installed dependencies
getNodePackagesInstalledVersion();
// Get the installed version of an installed dependency in particular
getNodePackagesInstalledVersion(packageName);
```

## API

### getNodePackagesInstalledVersion(packageName?)

#### packageName

Type: `string`

This is the name in [npmjs.com](https://npmjs.com) of the package which version is required. If it is omitted, the package will retrieve all the dependencies of the project.

Only retrieves dependencies directly related with the project. It means the package only get dependencies from nivel zero.

Then, it will returns:

```typescript
null; // If the package is not a dependency or if it is not installed
```

or this structured data with the package name as key of the data value with the version.

```typescript
NPIVDependencyList {
   // Pacakge Name
  [packageName: string]: {
    name: string; // Pacakge Name
    version: {
      major: number; // Major version as number.-> Eg: 4
      minor: number; // Minor version as number.-> Eg: 2
      patch: number; // Patch version as number -> Eg: 5
      full: string; // Complete text version -> Eg: "4.2.5"
    };
  },
  [anotherPackageName: string]: {
    name: string; // Next Pacakge Name
    ...
  };
}
```

So it is easy to retrieve the data of any wanted package. Just use the name of the package as index of the returned data to retrieve it. And use it.

```typescript
// It will retrieve the version of each dependency.
const data = getNodePackagesInstalledVersion();
// 'packageName' is the name of the package for retrieve its data.
const pkgData = data[packageName];

// This is the same as if it is done...
const pkgData = getNodePackagesInstalledVersion(packageName);

// It is depends of the project needs.
```

<!-- <a href="https://github.com/ryansonshine/typescript-npm-package-template/actions/workflows/release.yml">
  <img src="https://github.com/ryansonshine/typescript-npm-package-template/actions/workflows/release.yml/badge.svg">
  </a>
<a href="https://www.npmtrends.com/typescript-npm-package-template">
  <img src="https://img.shields.io/npm/dt/typescript-npm-package-template">
</a>
<a href="https://www.npmjs.com/package/typescript-npm-package-template">
  <img src="https://img.shields.io/npm/v/typescript-npm-package-template">
</a>
<a href="https://github.com/ryansonshine/typescript-npm-package-template/issues">
  <img src="https://img.shields.io/github/issues/ryansonshine/typescript-npm-package-template">
</a>
<a href="https://codecov.io/gh/ryansonshine/typescript-npm-package-template">
  <img src="https://codecov.io/gh/ryansonshine/typescript-npm-package-template/branch/main/graph/badge.svg">
</a>
  <a href="https://github.com/semantic-release/semantic-release">
    <img src="https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg">
  </a>
  <a href="http://commitizen.github.io/cz-cli/">
    <img src="https://img.shields.io/badge/commitizen-friendly-brightgreen.svg">
  </a> -->
