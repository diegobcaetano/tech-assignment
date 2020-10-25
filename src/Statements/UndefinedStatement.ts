import {StatementGeneratorHandler} from "./StatementGeneratorHandler";

export class UndefinedStatement extends StatementGeneratorHandler {

  handle(mutation: {}, path: string): null {
    return null;
  }
}
