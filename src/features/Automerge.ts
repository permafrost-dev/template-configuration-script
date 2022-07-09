import { Feature } from '@/features/Feature';
import { safeUnlink } from '@/lib/helpers';
import { Script } from '@/Script';

export class Automerge extends Feature {
    name = 'automerge';
    prompt = 'Automerge Dependabot PRs?';
    enabled = true;
    result = false;
    default = true;
    dependsOn = [ 'dependabot' ];

    disable(script: Script) {
        safeUnlink(script.repository.workflowFile('dependabot-auto-merge'));
    }
}
