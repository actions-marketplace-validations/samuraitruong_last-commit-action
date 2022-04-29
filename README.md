# last-commit-action

A simple action to return last commit id for each package in workspace

## Usage

```
- uses: samuraitruong/last-commit-action@main
  id: last-commit-action
  with:
    package-manager: 'yarn'
    output: 'env'
- run: echo "${{env.package_name}}
```

or

```
- uses: samuraitruong/last-commit-action@main
  id: last-commit-action
  with:
    package-manager: 'yarn'
    output: 'output'
- run: echo "${{steps.last-commit-action.outputs.package_name}}
```
