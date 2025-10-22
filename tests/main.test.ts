import {beforeEach, describe, expect, it, spyOn} from 'bun:test';
import {FakeCore, FakeGitHub} from "./utils.ts";
import {HelloWorldGitHubAction} from "../src/action.ts";

describe('Hello World GitHub Action', () => {
  let action: HelloWorldGitHubAction;
  let core: FakeCore;
  let github: FakeGitHub;

  beforeEach(() => {
    core = new FakeCore();
    github = new FakeGitHub();
    action = new HelloWorldGitHubAction(core, github);
  });

  it('greets the caller', () => {
    const name = 'Niko';
    core.setInput("who-to-greet", name);

    action.run();

    expect(core.events.info).toContain(`Hello to you, ${name}!`)
  });

  it('sets current time as output', () => {
    const date = Date.now();
    spyOn(Date, 'now').mockReturnValue(date);

    action.run();

    expect(core.getOutput('time')).toBe(new Date(date).toTimeString());
  });

  it('prints out context payload for debugging', () => {
    const payload = { key: 'value' };
    const stringify = (data: Record<string, unknown>)=> JSON.stringify(data, undefined, 2);
    github.context.payload = payload;

    action.run();

    expect(core.events.info).toContain(`The event payload: ${stringify(payload)}`)
  });
});
