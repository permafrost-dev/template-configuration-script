<p align="center">
    <img style="height: 130px;" src="https://user-images.githubusercontent.com/5508707/178102899-d8a0d8ec-6126-4969-8dae-763c7d0b22ba.png" alt="" />
</p>

# template-configuration-script

<p align="center" style="flex">
<img alt="Tests" src="https://github.com/permafrost-dev/template-configuration-script/actions/workflows/run-tests.yml/badge.svg?branch=main" />
<img alt="License" src="https://shields.io/github/license/permafrost-dev/template-configuration-script" />
<img alt="Lines of code" src="https://img.shields.io/tokei/lines/github/permafrost-dev/template-configuration-script" />
<br>
<!--<img src="https://www.codefactor.io/repository/github/permafrost-dev/template-configuration-script/badge" alt="CodeFactor" />-->
<img alt="CodeFactor Grade" src="https://img.shields.io/codefactor/grade/github/permafrost-dev/template-configuration-script?logo=codefactor" />
<img alt="Code Climate maintainability" src="https://img.shields.io/codeclimate/maintainability-percentage/permafrost-dev/template-configuration-script?logo=codeclimate" />
<img alt="Code Climate technical debt" src="https://img.shields.io/codeclimate/tech-debt/permafrost-dev/template-configuration-script?label=tech%20debt&logo=codeclimate" />
</p>

Script included in [Permafrost Software](https://github.com/permafrost-dev) template repositories for customization.

Some of the optional features included in this script are:

- Use of the [codecov.io](https://codecov.io) service to report coverage.
- Use of Dependabot to automatically update dependencies.
- Automatically merging Dependabot pull requests.
- Use of CodeQL to analyze code quality.

---

## Description

The compiled script prompts the user for some configuration options, which are used to replace the placeholders in several files.

- project name;
- project description;
- name, email and github username of the author;
- name and github username of the project's owner/organization;

The default values for the configuration prompts are intelligently guessed using several sources, such as the local git configuration and the GitHub API.

## Setup

```bash
npm install
npm run build
```

This will generate the compiled script in `dist/configure-template.js`.

## Testing

`template-configuration-script` uses Jest for unit tests.  To run the test suite:

`npm run test`

---

## Changelog

Please see [CHANGELOG](CHANGELOG.md) for more information on what has changed recently.

## Contributing

Please see [CONTRIBUTING](.github/CONTRIBUTING.md) for details.

## Security Vulnerabilities

Please review [our security policy](../../security/policy) on how to report security vulnerabilities.

## Credits

- [Patrick Organ](https://github.com/patinthehat)
- [All Contributors](../../contributors)

## License

The MIT License (MIT). Please see [License File](LICENSE) for more information.
