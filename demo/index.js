"use strict";
/** @format */
Object.defineProperty(exports, "__esModule", { value: true });
exports.getNodePackagesInstalledVersion = void 0;
const child_process_1 = require("child_process");
const ERROR_CODE = {
    MISSING_PACKAGE: 'ELSPROBLEMS',
};
const getSplitVersionFromString = (version) => {
    const [majorVersion, minorVersion, patchVersion] = version.split('.');
    return {
        major: parseInt(majorVersion),
        minor: parseInt(minorVersion),
        patch: parseInt(patchVersion),
        full: version,
    };
};
const getInstalledDependenciesFromMap = (dependencies) => {
    if (!dependencies)
        return {};
    const entries = Object.entries(dependencies).reduce((deps, [name, data]) => {
        const { version } = data;
        if (version) {
            deps.set(name, {
                name,
                version: getSplitVersionFromString(version),
            });
        }
        return deps;
    }, new Map());
    return Object.fromEntries(entries);
};
const getNodePackagesInstalledVersion = (packageName) => {
    let response = new Map();
    try {
        const command = `npm ls${!!packageName ? ` ${packageName} ` : ' '}--depth=0 --long --json`;
        const options = { encoding: 'utf8' };
        response = JSON.parse((0, child_process_1.execSync)(command, options)).dependencies;
    }
    catch (e) {
        const json = JSON.parse(e.stdout);
        if (json.error.code && json.error.code !== ERROR_CODE.MISSING_PACKAGE) {
            throw e;
        }
        response = json.dependencies.filter((item) => item.missing);
    }
    finally {
        return Object.keys(response).length >= 1 ?
            getInstalledDependenciesFromMap(response)
            : null;
    }
};
exports.getNodePackagesInstalledVersion = getNodePackagesInstalledVersion;
