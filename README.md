# Node Packages Installed Version

> Small library developed to get the current exact version of some or all installed dependencies in a NodeJS project.

## Features

- [Semantic Release](https://github.com/semantic-release/semantic-release)
- [Issue Templates](https://github.com/ryansonshine/typescript-npm-package-template/tree/main/.github/ISSUE_TEMPLATE)

## Getting started

This package was inspired by the need to know what Prisma ORM version is in currently in use while I was developing the Prisma ORM generator called ["@ladislaogarcia/zod-prisma-generator".  ](https://www.npmjs.com/package/@ladislaogarcia/prisma-zod-generator)

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

// That is the same as if it is done...
const pkgData = getNodePackagesInstalledVersion(packageName);

// It is depends of the project needs.
```

You can run a demostration that tries to retrieve the installed version of three use cases:

1. 'Prettier': Installed dependency.
2. 'Storybook': Not a dependency of this project.

It can run to check for non-installed dependencies. It is only required to install any package and **remove it manually from inside 'node_modules'. Do not use 'npm uninstall'** because it also will erase the dependency from 'package.json'.

Then, add it to 'items' array as this:

```javascript
{
    packageName: '<npm-package-name-added>',
    text: 'Not Installed Dependency',
},
```

You can run it just typing in a terminal

```bash
npm run demo
```

You will receive a response like this:

```bash
Getting data from "PRETTIER" as INSTALLED DEPENDENCY
DEPS:
 {
  prettier: {
    name: 'prettier',
    version: { major: 3, minor: 5, patch: 3, full: '3.5.3' }
  }
}
Getting data from "STORYBOOK" as NOT A DEPENDENCY
DEPS:
 null
