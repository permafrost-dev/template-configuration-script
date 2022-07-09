import { Automerge } from '@/features/Automerge';
import { Codecov } from '@/features/Codecov';
import { CodeQl } from '@/features/CodeQl';
import { Dependabot } from '@/features/Dependabot';
import { Feature } from '@/features/Feature';
import { Madge } from '@/features/Madge';
import { Script } from '@/Script';
import { UpdateChangelog } from '@/features/UpdateChangelog';

export class Features {
    codecov = new Codecov(this);
    codeql = new CodeQl(this);
    dependabot = new Dependabot(this);
    automerge = new Automerge(this);
    updateChangelog = new UpdateChangelog(this);
    useMadgePackage = new Madge(this);

    features: Feature[] = [
        this.codecov,
        this.dependabot,
        this.automerge,
        this.codeql,
        this.updateChangelog,
        this.useMadgePackage
    ];

    async run(script: Script) {
        for (const feature of this.features) {
            await feature.run(script);
        }
    }
}
