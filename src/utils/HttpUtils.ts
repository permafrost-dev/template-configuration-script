import https from 'https';
import { IncomingHttpHeaders } from 'http';

export interface RestApiResponse {
    data: any;
    statusCode: number;
    headers: IncomingHttpHeaders;
    success: boolean;
    failed: boolean;
    error: string;
    hasError: boolean;
}

export async function getJson(url: string): Promise<RestApiResponse> {
    const result: RestApiResponse = {
        data: null,
        error: '',
        failed: false,
        hasError: false,
        headers: {},
        statusCode: 0,
        success: false,
    };

    const requestJson = async url => {
        const options = {
            headers: {
                Accept: 'application/json, */*',
                'User-Agent': 'permafrost-dev-template-configure/1.0',
            },
        };

        return new Promise((resolve, reject) => {
            const req = https.get(url, options);

            req.on('response', async res => {
                result.headers = res.headers;
                result.statusCode = <number>res.statusCode;
                let body = '';
                res.setEncoding('utf-8');

                for await (const chunk of res) {
                    body += chunk;
                }

                resolve(JSON.parse(body));
            });

            req.on('error', (err: any) => {
                throw new err();
            });
        });
    };

    try {
        result.data = await requestJson(url);
        result.success = true;
        result.failed = false;
        result.error = '';
        result.hasError = false;
    } catch (e: any) {
        result.data = null;
        result.success = false;
        result.failed = true;
        result.error = e.message;
        result.hasError = true;
    }

    return result;
}

export async function getUrl(url: string): Promise<RestApiResponse> {
    const result: RestApiResponse = {
        data: null,
        error: '',
        failed: false,
        hasError: false,
        headers: {},
        statusCode: 0,
        success: false,
    };

    const requestContent = async url => {
        const options = {
            headers: {
                Accept: 'text/plain, */*',
                'User-Agent': 'permafrost-dev-template-configure/1.0',
            },
        };

        return new Promise((resolve, reject) => {
            const req = https.get(url, options);

            req.on('response', async res => {
                result.headers = res.headers;
                result.statusCode = <number>res.statusCode;
                let body = '';
                res.setEncoding('utf-8');

                for await (const chunk of res) {
                    body += chunk;
                }

                resolve(body);
            });

            req.on('error', (err: any) => {
                throw new err();
            });
        });
    };

    try {
        result.data = await requestContent(url);
        result.success = true;
        result.failed = false;
        result.error = '';
        result.hasError = false;
    } catch (e: any) {
        result.data = null;
        result.success = false;
        result.failed = true;
        result.error = e.message;
        result.hasError = true;
    }

    return result;
}
