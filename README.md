# template-configuration-script

Configuration script used by [Permafrost Software](https://github.com/permafrost-dev) template repositories.

---

## Usage

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
