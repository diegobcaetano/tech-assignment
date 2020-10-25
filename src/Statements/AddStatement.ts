import {StatementGeneratorHandler} from "./StatementGeneratorHandler";
import {Mutation} from "../Types/Mutation.type";
import {Statement} from "../Types/Statement.type";

export class AddStatement extends StatementGeneratorHandler {

  protected statementKey = "$add";

  protected shouldHandle(): boolean {
    return !this.mutation.hasOwnProperty("_id");
  }

  handle(mutation: Mutation, path: string): Statement | null {
    this.mutation = mutation;
    if (this.shouldHandle()) {
      return {[this.statementKey]: {[path]: [mutation]}}
    }
    return this.next.handle(mutation, path);
  }
}
