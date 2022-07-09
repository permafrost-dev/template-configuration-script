import { Feature } from '@/features/Feature';
import { githubWorkflowFilename, safeUnlink } from '@/lib/helpers';
import { Script } from '@/Script';

export class CodeQl extends Feature {
    name = 'codeql';
    prompt = 'Use quality analysis service CodeQL?';
    enabled = true;
    result = false;
    default = true;
    dependsOn = [];

    disable(script: Script) {
        safeUnlink(script.repository.workflowFile('codeql-analysis'));
    }
}
