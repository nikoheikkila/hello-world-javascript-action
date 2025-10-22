import type {Core, GitHub} from "./types.ts";

export class HelloWorldGitHubAction {
  private readonly core: Core;
  private readonly github: GitHub;

  constructor(core: Core, github: GitHub) {
    this.core = core;
    this.github = github;
  }

  public run(): void {
    const nameToGreet = this.core.getInput("who-to-greet");
    this.core.info(`Hello to you, ${nameToGreet}!`);

    const time = new Date().toTimeString();
    this.core.setOutput("time", time);

    const payload = JSON.stringify(this.github.context.payload, undefined, 2);
    this.core.info(`The event payload: ${payload}`);
  }
}
