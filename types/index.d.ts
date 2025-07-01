/** @format */
type NPMDependency = NPMInstalledDependency | NPMNotInstalledDependency;

interface NPMInstalledDependency {
  name: string;
  version: string;
}

interface NPMNotInstalledDependency {
  name: string;
  required: string;
  missing: boolean;
}

interface NPIVInstalledDependency {
  name: string;
  version: NPIVDependencyVersion | string;
}

interface NPIVDependencyVersion {
  major: number;
  minor: number;
  patch: number;
  full: string;
}

export interface NPIVDependencyList {
  [k: string]: NPIVInstalledDependency;
}
