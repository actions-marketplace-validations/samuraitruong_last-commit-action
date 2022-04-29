const core = require("@actions/core");
const github = require("@actions/github");
const { execSync } = require("child_process");
const fs = require("fs");

try {
  const inputs = ["output", "package-manager"];
  const [output = "env", packageManager = "yarn"] = inputs.map((prop) =>
    core.getInput(prop)
  );

  if (packageManager !== "yarn") {
    throw new Error(`package-manager must be yarn`);
  }

  const exportLastCommitSha = (key, directory) => {
    const value = execSync(`git log --pretty=tformat:"%h" -n1 ${directory}`)
      .toString()
      .trim();
    if (output === "env") {
      core.exportVariable(key, value);
    } else {
      core.setOutput(key, branch);
    }
    core.info(`${output} ->  ${key}=${value}`);
  };

  const packages = execSync("yarn workspaces list --json")
    .toString()
    .trim()
    .split("\n")
    .map((x) => {
      return JSON.parse(x);
    });

  packages.forEach(({ name, location }) => {
    exportLastCommitSha(name.split("/").pop(), location);
  });

  const workspaces =
    JSON.parse(fs.readFileSync("package.json", "utf8")).workspaces || [];

  workspaces.forEach((workspace) => {
    const rootFolder = workspace.split("/")[0];

    exportLastCommitSha(rootFolder, "./" + rootFolder);
  });
} catch (error) {
  core.setFailed(error.message);
}
