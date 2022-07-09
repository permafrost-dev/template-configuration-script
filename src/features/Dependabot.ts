import { Feature } from '@/features/Feature';
import { safeUnlink } from '@/helpers';
import { Script } from '@/Script';

export class Dependabot extends Feature {
    name = 'dependabot';
    prompt = 'Use Dependabot service?';
    enabled = true;
    result = false;
    default = true;
    dependsOn = [];

    disable(script: Script) {
        safeUnlink(script.repository.githubFile('dependabot'));
    }
}
