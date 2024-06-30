import {Command} from "commander";

type Actions = {
    doBranch: (branchName: string, options: {"d": boolean, "m": boolean}) => void
    doCommit: (options: {"m"?: string}) => void
    doFetch: (remoteServer: string, remoteName: string, options: {}) => void
};

export function createProgram(actions: Actions): Command {
    const program = new Command();
    program.name("prog")
        .version("0.1.0")
    program.command("branch <branch_name>")
        .option("-d", "Delete branch", false)
        .option("-m", "Move branch", false)
        .action((branchName, options) => {
            actions.doBranch(branchName, options);
        })
    program.command("commit")
        .option("-m <message>")
        .action((options) => {
            actions.doCommit(options);
        })
    program.command("fetch [remove_server] [remote_name]")
        .action((remoteServer, remoteName, options) => {
            actions.doFetch(remoteServer, remoteName, options);
        })
    return program;
}
