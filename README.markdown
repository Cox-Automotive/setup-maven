# setup-maven

<p align="left">
  <a href="https://github.com/Cox-Automotive/setup-maven"><img alt="GitHub Actions status" src="https://github.com/Cox-Automotive/setup-maven/workflows/Main%20workflow/badge.svg"></a>
</p>

This action provides the following functionality for GitHub Actions runners:
- Downloading and setting up a requested version of [Apache Maven](https://maven.apache.org).

## Usage
Input `maven-version` is mandatory.

```yaml
steps:
- uses: actions/checkout@v2
- uses: actions/setup-maven@main
  with:
    maven-version: '3.8.2'
```
## License

The scripts and documentation in this project are released under the [MIT License](LICENSE).
