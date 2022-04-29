# last-commit-action

A simple action to return last commit id for each package in workspace

## Usage

```
- uses: samuraitruong/last-commit-action@main
  id: last-commit-action
  with:
    package-manager: 'yarn'
    output: 'env'
```
