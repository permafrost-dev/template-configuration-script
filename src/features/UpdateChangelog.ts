import { Feature } from '@/features/Feature';
import { safeUnlink } from '@/lib/helpers';
import { Script } from '@/Script';

export class UpdateChangelog extends Feature {
    name = 'update-changelog';
    prompt = 'Use Changelog Updater Workflow?';
    enabled = true;
    result = false;
    default = true;
    dependsOn = [];

    disable(script: Script) {
        safeUnlink(script.repository.workflowFile('update-changelog'));
    }
}
