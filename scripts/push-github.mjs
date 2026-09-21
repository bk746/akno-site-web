import fs from "node:fs/promises";
import path from "node:path";
import { execFileSync } from "node:child_process";
import git from "isomorphic-git";
import http from "isomorphic-git/http/node";
import ignore from "ignore";

const ROOT = path.resolve(import.meta.dirname, "..");
const REMOTE = "https://github.com/bk746/akno-web-end.git";
const COMMIT_MESSAGE = "Initial commit — AKNO site";

function getGitHubAuth() {
  const token = process.env.GITHUB_TOKEN || process.env.GH_TOKEN;
  if (token) {
    return { username: "bk746", password: token };
  }

  try {
    const input = "protocol=https\nhost=github.com\n\n";
    const out = execFileSync("git", ["credential", "fill"], {
      input,
      encoding: "utf8",
      stdio: ["pipe", "pipe", "pipe"],
    });
    const lines = Object.fromEntries(
      out
        .trim()
        .split("\n")
        .map((line) => line.split("="))
        .filter((pair) => pair.length === 2),
    );
    if (lines.username && lines.password) {
      return { username: lines.username, password: lines.password };
    }
  } catch {
    /* credential helper unavailable */
  }

  return null;
}

async function readGitignore() {
  const content = await fs.readFile(path.join(ROOT, ".gitignore"), "utf8");
  return ignore().add(content).add(".git");
}

async function walk(dir, ig, files = []) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  for (const ent of entries) {
    const abs = path.join(dir, ent.name);
    const rel = path.relative(ROOT, abs).split(path.sep).join("/");
    if (!rel || ig.ignores(rel) || ig.ignores(`${rel}/`)) continue;

    if (ent.isDirectory()) {
      await walk(abs, ig, files);
    } else if (ent.isFile()) {
      files.push(rel);
    }
  }
  return files;
}

async function ensureRepo() {
  const gitDir = path.join(ROOT, ".git");
  try {
    await fs.stat(gitDir);
  } catch {
    await git.init({ fs, dir: ROOT, defaultBranch: "main" });
  }
}

async function syncRemote() {
  const remotes = await git.listRemotes({ fs, dir: ROOT });
  if (remotes.some((r) => r.remote === "origin")) {
    await git.deleteRemote({ fs, dir: ROOT, remote: "origin" });
  }
  await git.addRemote({ fs, dir: ROOT, remote: "origin", url: REMOTE });
}

async function main() {
  await ensureRepo();

  const ig = await readGitignore();
  const files = await walk(ROOT, ig);
  for (const filepath of files) {
    await git.add({ fs, dir: ROOT, filepath });
  }

  const matrix = await git.statusMatrix({ fs, dir: ROOT });
  const dirty = matrix.some(
    ([, head, workdir, stage]) => head !== workdir || workdir !== stage,
  );

  if (dirty) {
    await git.commit({
      fs,
      dir: ROOT,
      message: COMMIT_MESSAGE,
      author: {
        name: "Keryan Bouzerda",
        email: "bk746@users.noreply.github.com",
      },
    });
  }

  await git.branch({ fs, dir: ROOT, ref: "main", checkout: true });
  await syncRemote();

  const auth = getGitHubAuth();
  if (!auth) {
    throw new Error(
      "Authentification GitHub introuvable. Configure un token (GITHUB_TOKEN) ou git credential.",
    );
  }

  const result = await git.push({
    fs,
    http,
    dir: ROOT,
    remote: "origin",
    ref: "main",
    onAuth: () => auth,
  });

  if (result.ok) {
    console.log("PUSH_OK");
    console.log(REMOTE);
    return;
  }

  const err = result.error || result.errors?.[0];
  throw new Error(err ? String(err) : "Push échoué");
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
});
