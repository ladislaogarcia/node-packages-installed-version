/** @format */
import { getNodePackagesInstalledVersion } from '.';

const items: {
  packageName: string;
  filename: string;
}[] = [
  {
    packageName: 'prettier',
    filename: 'Installed Dependency',
  },
  {
    packageName: '@tsconfig/node22',
    filename: 'Not Installed Dependency',
  },
  {
    packageName: 'storybook',
    filename: 'Not A Dependency',
  },
];

items.forEach((item: { packageName: string; filename: string }) => {
  const { packageName, filename } = item;
  console.info(
    `Getting data from "${packageName.toUpperCase()}" as ${filename.toUpperCase()}`,
  );
  const list = getNodePackagesInstalledVersion(packageName);
  console.log('DEPS:\n', list);
});
