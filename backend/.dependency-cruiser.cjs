/** @type {import('dependency-cruiser').IConfiguration} */
module.exports = {
  forbidden: [
    {
      name: "domain-no-upward-imports",
      comment:
        "src/domain non può importare da application, infrastructure o main",
      severity: "error",
      from: { path: "^src/domain" },
      to: { path: "^src/(application|infrastructure|main)" },
    },
    {
      name: "application-no-upward-imports",
      comment: "src/application non può importare da infrastructure o main",
      severity: "error",
      from: { path: "^src/application" },
      to: { path: "^src/(infrastructure|main)" },
    },
    {
      name: "domain-application-no-infrastructure",
      comment:
        "src/infrastructure può dipendere da domain/application, non viceversa",
      severity: "error",
      from: { path: "^src/(domain|application)" },
      to: { path: "^src/infrastructure" },
    },
  ],
  options: {
    doNotFollow: { path: "node_modules" },
    exclude: { path: "node_modules" },
    tsPreCompilationDeps: true,
    combinedDependencies: true,
  },
};