import {createProgram} from "./cli";

const program = createProgram({
    doBranch: (branchName, options) => {
        console.log("branch:", branchName, options);
    },
    doCommit: (options) => {
        console.log("commit:", options);
    },
    doFetch: (options) => {
        console.log("fetch:", options);
    },
})
program.parse().opts();
