import {createProgram} from "./cli";

const doNothing = () => {};

describe("branch", () => {
    test("create a branch", () => {
        const program = createProgram({
            doBranch: (branchName, options) => {
                expect(branchName).toBe("dev");
                expect(options.d).toBe(false);
            },
            doCommit: doNothing,
            doFetch: doNothing,
        });
        const result = program.parse(["node", "prog", "branch", "dev"]).opts();
    });
    test("delete the branch", () => {
        const program = createProgram({
            doBranch: (branchName, isDelete) => {
                expect(branchName).toBe("dev");
                expect(isDelete.d).toBe(true);
            },
            doCommit: doNothing,
            doFetch: doNothing,
        });
        const result = program.parse(["node", "prog", "branch", "-d", "dev"]).opts();
    });
    test("move the branch", () => {
        const program = createProgram({
            doBranch: (branchName, options) => {
                expect(branchName).toBe("dev");
                expect(options.m).toBe(true);
            },
            doCommit: doNothing,
            doFetch: doNothing,
        });
        const result = program.parse(["node", "prog", "branch", "-m", "dev"]).opts();
    });
});

describe("commit", () => {
    test("commit without a message", () => {
        const program = createProgram({
            doCommit: (options) => {
                expect(options.m).toBe(undefined);
            },
            doBranch: doNothing,
            doFetch: doNothing,
        });
        const result = program.parse(["node", "prog", "commit"]).opts();
    });
    test("commit with a message", () => {
        const program = createProgram({
            doCommit: (options) => {
                expect(options.m).toBe("Hello, World");
            },
            doBranch: doNothing,
            doFetch: doNothing,
        });
        const result = program.parse(["node", "prog", "commit", "-m", "Hello, World"]).opts();
    });
});

describe("fetch", () => {
    test("fetch", () => {
        const program = createProgram({
            doFetch: (remoteServer, remoteBranch, options) => {
                expect(remoteServer).toBe(undefined);
                expect(remoteBranch).toBe(undefined);
                expect(options).toEqual({});
            },
            doCommit: doNothing,
            doBranch: doNothing,
        });
        const result = program.parse(["node", "prog", "fetch"]).opts();
    });
    test("fetch origin main", () => {
        const program = createProgram({
            doFetch: (remoteServer, remoteBranch, options) => {
                expect(remoteServer).toBe("origin");
                expect(remoteBranch).toBe("main");
                expect(options).toEqual({});
            },
            doCommit: doNothing,
            doBranch: doNothing,
        });
        const result = program.parse(["node", "prog", "fetch", "origin", "main"]).opts();
    });
});
