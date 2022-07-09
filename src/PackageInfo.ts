export interface PackageInfo {
    name: string;
    description: string;
    author: {
        name: string;
        email: string;
        github: string;
    };
    vendor: {
        name: string;
        github: string;
    };
}

export const createPackageInfo = (): PackageInfo => {
    return {
        name: '',
        description: '',
        vendor: {
            name: '',
            github: '',
        },
        author: {
            name: '',
            email: '',
            github: '',
        },
    };
};

export const packageInfo: PackageInfo = {
    name: '',
    description: '',
    vendor: {
        name: '',
        github: '',
    },
    author: {
        name: '',
        email: '',
        github: '',
    },
};
