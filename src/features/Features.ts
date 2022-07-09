import { Automerge } from '@/features/Automerge';
import { Codecov } from '@/features/Codecov';
import { CodeQl } from '@/features/CodeQl';
import { Dependabot } from '@/features/Dependabot';
import { Feature } from '@/features/Feature';
import { Madge } from '@/features/Madge';
import { Script } from '@/Script';
import { UpdateChangelog } from '@/features/UpdateChangelog';

export class Features {
    getFeatures: () => Feature[] = () => this.features;

    codecov = new Codecov(this.getFeatures);
    codeql = new CodeQl(this.getFeatures);
    dependabot = new Dependabot(this.getFeatures);
    automerge = new Automerge(this.getFeatures);
    updateChangelog = new UpdateChangelog(this.getFeatures);
    useMadgePackage = new Madge(this.getFeatures);

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
