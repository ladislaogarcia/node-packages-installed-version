/** @format */

import {
  ExecSyncOptionsWithStringEncoding,
  SpawnSyncReturns,
  execSync,
} from 'child_process';

const ERROR_CODE = {
  MISSING_PACKAGE: 'ELSPROBLEMS',
};

const getSplitVersionFromString = (version: string): NPIVDependencyVersion => {
  const [majorVersion, minorVersion, patchVersion] = version.split('.');
  return {
    major: parseInt(majorVersion),
    minor: parseInt(minorVersion),
    patch: parseInt(patchVersion),
    full: version,
  };
};

const getInstalledDependenciesFromMap = (
  dependencies: Object,
): { [k: string]: NPIVInstalledDependency } => {
  if (!dependencies) return {};
  const entries: Map<string, NPIVInstalledDependency> = Object.entries(
    dependencies,
  ).reduce(
    (
      deps: Map<string, NPIVInstalledDependency>,
      [name, data]: [name: string, data: NPIVInstalledDependency],
    ) => {
      const { version } = data;
      if (version) {
        deps.set(name, {
          name,
          version: getSplitVersionFromString(version as string),
        });
      }
      return deps;
    },
    new Map(),
  );
  return Object.fromEntries(entries);
};

const getNodePackagesInstalledVersion = (
  packageName?: string,
): { [k: string]: unknown } | null => {
  let response = new Map();
  try {
    const command = `npm ls${!!packageName ? ` ${packageName} ` : ' '}--depth=0 --long --json`;
    const options: ExecSyncOptionsWithStringEncoding = { encoding: 'utf8' };
    response = JSON.parse(execSync(command, options)).dependencies;
  } catch (e) {
    const json = JSON.parse((e as SpawnSyncReturns<string>).stdout);
    if (json.error.code && json.error.code !== ERROR_CODE.MISSING_PACKAGE) {
      throw e;
    }
    response = json.dependencies.filter(
      (item: NPMDependency) => (item as NPMNotInstalledDependency).missing,
    );
  } finally {
    return Object.keys(response).length >= 1 ?
        getInstalledDependenciesFromMap(response)
      : null;
  }
};

export { getNodePackagesInstalledVersion };
