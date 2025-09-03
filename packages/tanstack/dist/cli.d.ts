interface CLIOptions {
    config?: string;
    output?: string;
    watch?: boolean;
    help?: boolean;
    version?: boolean;
}
declare function parseArgs(args: string[]): CLIOptions;
declare function printHelp(): void;
declare function main(): Promise<void>;

export { type CLIOptions, main, parseArgs, printHelp };
