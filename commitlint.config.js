/** @type {import('@commitlint/types').UserConfig} */
export default {
  extends: ["@commitlint/config-conventional"],
  rules: {
    // Commit types — format: <type>(<optional scope>): <subject>
    // feat:     new feature          → feat: add order checkout flow
    // fix:      bug fix              → fix(cart): prevent duplicate items
    // docs:     documentation only   → docs: update README setup steps
    // style:    formatting, no logic   → style: format App.css with prettier
    // refactor: code change, no fix   → refactor: extract useCart hook
    // perf:     performance          → perf: lazy-load menu images
    // test:     add/update tests     → test: add cart reducer unit tests
    // build:    build/deps           → build: upgrade vite to v8
    // ci:       CI/CD changes        → ci: add lint workflow
    // chore:    maintenance          → chore: configure husky hooks
    // revert:   revert a commit      → revert: feat: add order checkout flow
    "type-enum": [
      2,
      "always",
      [
        "feat",
        "fix",
        "docs",
        "style",
        "refactor",
        "perf",
        "test",
        "build",
        "ci",
        "chore",
        "revert",
      ],
    ],
    "subject-case": [2, "never", ["start-case", "pascal-case", "upper-case"]],
    "header-max-length": [2, "always", 100],
  },
};
