import {StatementGeneratorHandler} from "./StatementGeneratorHandler";
import {Mutation} from "../Types/Mutation.type";

export class DeleteStatement extends StatementGeneratorHandler {

  protected statementKey = "$delete";

  protected shouldHandle(): boolean {
    return this.mutation._delete;
  }

  handle(mutation: Mutation, path: string) {
    this.mutation = mutation;
    if (this.shouldHandle()) {
      return {[this.statementKey]: {[path]: true}}
    }
    return this.next.handle(mutation, path);
  }
}
