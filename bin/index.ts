import * as core from "@actions/core";
import { Rot13GitHubAction } from "../src";

const action = new Rot13GitHubAction({ core });

try {
	action.run();
} catch (error: unknown) {
	const message = error instanceof Error ? error : String(error);
	core.setFailed(message);
}
