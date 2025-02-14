import loadPassportSession from "./passport-session";
import loadPassportStrategy from "./passport-strategy";
import loadExpress from "./express";

export default async function () {
  await loadPassportSession();
  await loadPassportStrategy();
  await loadExpress();
}
