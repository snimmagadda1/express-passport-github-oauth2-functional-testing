async function startServer() {
  console.info("Initializing express server...");
  (await import("./loaders")).default();
}

startServer();
