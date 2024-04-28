import { Command } from "commander";v

const program = new Command(); 

program 
    .option("--mode <mode>", "modo de trabajo", "produccion");
program.parse();

export default program;