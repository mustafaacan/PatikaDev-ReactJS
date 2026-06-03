const fs = require("fs");
const path = require("path");
const { spawn } = require("child_process");

const command = process.argv[2];

if (!command) {
  console.error("Missing react-scripts command.");
  process.exit(1);
}

function resolveCanonicalPathFromAnchor(anchorPath, relativeTargetPath) {
  const segments = relativeTargetPath.split(path.sep).filter(Boolean);
  let currentPath = anchorPath;

  for (const segment of segments) {
    const entries = fs.readdirSync(currentPath, { withFileTypes: true });
    const matchedEntry = entries.find(
      (entry) => entry.name.toLowerCase() === segment.toLowerCase(),
    );

    currentPath = path.join(currentPath, matchedEntry ? matchedEntry.name : segment);
  }

  return currentPath;
}

const workspaceRoot = fs.realpathSync.native(
  path.resolve(__dirname, "..", "..", ".."),
);
const projectRelativePath = path.relative(
  workspaceRoot,
  path.resolve(__dirname, ".."),
);
const projectDir = resolveCanonicalPathFromAnchor(
  workspaceRoot,
  projectRelativePath,
);
const cacheTargets = [
  path.join(projectDir, "node_modules", ".cache"),
  path.join(projectDir, ".eslintcache"),
];

for (const target of cacheTargets) {
  fs.rmSync(target, { recursive: true, force: true });
}

process.chdir(projectDir);

const reactScriptsBin = path.join(
  projectDir,
  "node_modules",
  "react-scripts",
  "bin",
  "react-scripts.js",
);

const child = spawn(process.execPath, [reactScriptsBin, command], {
  cwd: projectDir,
  stdio: "inherit",
  env: process.env,
});

child.on("exit", (code, signal) => {
  if (signal) {
    process.kill(process.pid, signal);
    return;
  }

  process.exit(code ?? 0);
});

child.on("error", (error) => {
  console.error(error);
  process.exit(1);
});
