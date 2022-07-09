/* eslint-disable no-unused-vars */

import { Script } from '@/Script';

/**
 * Configure a repository created from a template repository.
 */
async function main() {
    const script = new Script();

    if (process.cwd().endsWith('dist')) {
        process.chdir(script.repository.path);
    }

    await script.run();
    process.exit(0);
}

main();

// const run = async function () {
//     await populatePackageInfo();
//     await new OptionalFeatures().run();
// };
