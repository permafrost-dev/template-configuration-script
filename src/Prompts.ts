import { booleanToString, dotget, dotset, isEmpty, yn } from '@/helpers';
import { promisify } from 'util';

export class Prompts {
    public question!: CallableFunction;

    constructor(rl) {
        this.init(rl);
    }

    init(rl) {
        if (this.question !== undefined) {
            return;
        }

        this.question = promisify(rl.question).bind(rl);
    }

    async ask(prompt, defaultValue: any = ''): Promise<any> {
        let result = '';

        try {
            result = await this.question(`${prompt} ${defaultValue.length ? '(' + defaultValue + ') ' : ''}`);
        } catch (err) {
            result = defaultValue;
        }

        return new Promise(resolve => {
            if (result.trim().length === 0) {
                result = defaultValue;
            }

            resolve(result);
        });
    }

    async boolean(str: string, defaultValue = false): Promise<boolean> {
        const resultStr: string | boolean = await this.ask(`${str} `, defaultValue);
        const value = typeof resultStr === 'boolean' ? booleanToString(resultStr) : resultStr;

        return yn(value, { default: defaultValue });
    }

    async conditional(obj: Record<string, any>, path: string, prompt: string, allowEmpty = false): Promise<any> {
        const value = dotget(obj, path);

        // eslint-disable-next-line no-constant-condition
        while (true) {
            dotset(obj, path, await this.ask(prompt, value));

            if (allowEmpty && isEmpty(dotget(obj, path, ''))) {
                break;
            }

            if (!isEmpty(dotget(obj, path, ''))) {
                break;
            }
        }

        return dotget(obj, path);
    }
}

// export const prompts = new Prompts();
