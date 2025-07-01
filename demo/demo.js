"use strict";
/** @format */
Object.defineProperty(exports, "__esModule", {value: true});
const _1 = require(".");
/** @format */
const items = [
    {
        packageName: 'prettier',
        text: 'Installed Dependency',
    },
    {
        packageName: 'storybook',
        text: 'Not A Dependency',
    },
];
items.forEach((item) => {
    const {packageName, text} = item;
    console.info(`Getting data from "${packageName.toUpperCase()}" as ${text.toUpperCase()}`);
    const list = (0, _1.getNodePackagesInstalledVersion)(packageName);
    console.log('DEPS:\n', list);
});
