/* eslint-disable sort-keys */

import { replaceFileString, safeUnlink } from '@/lib/helpers';
import { Feature } from '@/features/Feature';
import { Script } from '@/Script';

export class Codecov extends Feature {
    name = 'codecov';
    prompt = 'Use code coverage service codecov.io?';
    enabled = true;
    result = false;
    default = true;
    dependsOn = [];

    disable(script: Script) {
        const workflowFile = script.repository.workflowFile('run-tests');
        replaceFileString(workflowFile, 'USE_CODECOV_SERVICE: yes', 'USE_CODECOV_SERVICE: no');

        safeUnlink(script.repository.githubFile('codecov'));
    }
}
