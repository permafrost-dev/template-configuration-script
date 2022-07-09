import { runCommand, safeUnlink, writefile } from '@/lib/helpers';
import { Feature } from '@/features/Feature';
import { Script } from '@/Script';

export class Madge extends Feature {
    name = 'madge-package';
    prompt = 'Use madge package for code analysis?';
    enabled = true;
    result = false;
    default = true;
    dependsOn = [];

    disable(script: Script) {
        runCommand('npm rm madge');
        safeUnlink(`${script.repository.path}/.madgerc`);

        const pkg = require(`${script.repository.path}/package.json`);

        delete pkg.scripts['analyze:deps:circular'];
        delete pkg.scripts['analyze:deps:list'];
        delete pkg.scripts['analyze:deps:graph'];

        writefile(`${script.repository.path}/package.json`, JSON.stringify(pkg, null, 4));
    }
}
