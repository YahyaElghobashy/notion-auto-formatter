# Contributing to Notion Auto-Formatter

Thank you for considering contributing to Notion Auto-Formatter! This document provides guidelines and instructions for contributing to the project.

## Code of Conduct

By participating in this project, you agree to maintain a respectful and inclusive environment for everyone.

## How to Contribute

### Reporting Bugs

If you find a bug, please create an issue in the GitHub repository with the following information:

1. A clear descriptive title
2. Steps to reproduce the bug
3. Expected behavior
4. Actual behavior
5. Screenshots (if applicable)
6. Environment details (browser, OS, etc.)

### Suggesting Features

We welcome feature suggestions! Please create an issue with:

1. A clear descriptive title
2. A detailed description of the proposed feature
3. The problem it solves
4. Any additional context or screenshots

### Pull Requests

1. Fork the repository
2. Create a new branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Run tests and linting (`npm test && npm run lint`)
5. Commit your changes (`git commit -m 'Add some amazing feature'`)
6. Push to the branch (`git push origin feature/amazing-feature`)
7. Open a Pull Request

### Pull Request Process

1. Update the README.md or documentation with details of changes if needed
2. Update the CHANGELOG.md with details of changes
3. The PR will be merged once reviewed and approved by maintainers

## Development Workflow

1. Clone your fork and set up the development environment:
   ```
   git clone https://github.com/yahyaelghobashy/notion-auto-formatter.git
   cd notion-auto-formatter
   npm install
   cp .env.example .env
   ```

2. Create a branch for your feature or bugfix:
   ```
   git checkout -b feature/your-feature-name
   ```

3. Make your changes and ensure they follow the code style:
   ```
   npm run lint
   npm test
   ```

4. Commit your changes with clear, descriptive commit messages

5. Push your branch and submit a pull request

## Style Guidelines

- Follow the ESLint configuration in the project
- Write clear, self-documenting code
- Add comments for complex logic
- Write tests for new features
- Update documentation as needed

## Git Commit Messages

- Use the present tense ("Add feature" not "Added feature")
- Use the imperative mood ("Move cursor to..." not "Moves cursor to...")
- Limit the first line to 72 characters or less
- Reference issues and pull requests after the first line

## License

By contributing, you agree that your contributions will be licensed under the project's MIT License. 