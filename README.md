# Asciidoctor PDF Docker

A Docker container for generating PDF documents from AsciiDoc files using [Asciidoctor PDF](https://github.com/asciidoctor/asciidoctor-pdf).

## Features

- Converts AsciiDoc documents to PDF files using Asciidoctor PDF
- Ready-to-use container with all dependencies pre-installed
- Supports custom fonts, themes, and extensions
- Simple to use with volume mounting for document processing

## Quick Start

1. Pull the Docker image:

    ```bash
    docker pull quay.io/ganelson/asciidoctor-pdf-docker:latest
    ```

1. Convert an AsciiDoc file to PDF:

    ```bash
    docker run --rm -v $(pwd):/documents quay.io/ganelson/asciidoctor-pdf-docker:latest document.adoc
    ```

## Usage

### Basic Usage

```bash
docker run --rm -v $(pwd):/documents quay.io/ganelson/asciidoctor-pdf-docker:latest [OPTIONS] filename.adoc
```

Where:
- `--rm` removes the container after execution
- `-v $(pwd):/documents` mounts your current directory to the `/documents` directory in the container
- `[OPTIONS]` are any additional Asciidoctor PDF options

### Command generator

Use the command generator app at https://gaurav-nelson.github.io/asciidoctor-pdf-docker/

### Example with Options

```bash
docker run --rm -v $(pwd):/documents quay.io/ganelson/asciidoctor-pdf-docker:latest -a pdf-theme=custom-theme.yml -a pdf-fontsdir=fonts document.adoc
```

## Customization

The container includes common fonts and configurations. For customizations:

1. Create a custom theme YAML file
2. Mount your fonts directory
3. Pass the appropriate attributes to asciidoctor-pdf

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
