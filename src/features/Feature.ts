import { Script } from '@/Script';

export abstract class Feature {
    public script!: Script;
    public features: () => Feature[];

    constructor(getFeatures: () => Feature[]) {
        this.features = getFeatures;
    }

    public name!: string;
    public prompt!: string;
    public enabled!: boolean;
    public result!: boolean;
    public default!: boolean;
    public dependsOn!: string[];
    public abstract disable(script: Script);

    public dependents(): Feature[] {
        return this.features().filter(feature => feature.dependsOn.includes(this.name));
    }

    public disableDependents(script: Script): void {
        for (const feature of this.dependents()) {
            feature.enabled = false;
            feature.disable(script);
        }
    }

    public isEnabled() {
        for (const featureName of this.dependsOn) {
            const feature = this.features().find(f => f.name === featureName);

            if (feature && !feature.result) {
                return false;
            }
        }

        return true;
    }

    public async run(script: Script) {
        if (!this.enabled || !this.isEnabled()) {
            return;
        }

        this.result = await script.prompts.boolean(this.prompt, this.default);

        if (!this.result) {
            this.disable(script);
            this.disableDependents(script);
        }
    }
}
