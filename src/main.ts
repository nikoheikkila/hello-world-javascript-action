import * as core from '@actions/core';
import * as github from '@actions/github';
import {HelloWorldGitHubAction} from "./action.ts";

export default function main() {
  const action = new HelloWorldGitHubAction(core, github);

  try {
    action.run();
  } catch (error: unknown) {
    const message = error instanceof Error ? error : String(error);
    core.setFailed(message);
  }
}
