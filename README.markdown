# setup-maven

This action provides the following functionality for GitHub Actions runners:

- Downloading and setting up a requested version of [Apache Maven](https://maven.apache.org).

## Usage

Input `maven-version` is mandatory.

```yaml
steps:
- uses: actions/checkout@v2
- uses: Cox-Automotive/setup-maven@main
  with:
    maven-version: "3.8.5"
```

## License

The scripts and documentation in this project are released under the [MIT License](LICENSE).
