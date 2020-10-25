import {StatementGeneratorHandler} from "./StatementGeneratorHandler";
import {Mutation} from "../Types/Mutation.type";
import {Statement} from "../Types/Statement.type";
import {isArrayOfObjects} from "../Helpers/utils";

export class UpdateStatement extends StatementGeneratorHandler {

  protected statementKey = "$update";
  private updateClause: { key: string, value: any };

  protected shouldHandle(): boolean {
    return !!this.updateClause;
  }

  private extractUpdateKeyValue() {
    for (let prop in this.mutation) {
      if (!isArrayOfObjects(this.mutation[prop]) && prop != "_id" && prop != "_delete") {
        this.updateClause = {key: prop, value: this.mutation[prop]};
      }
    }
  }

  handle(mutation: Mutation, path: string): Statement | null {
    this.mutation = mutation;
    this.extractUpdateKeyValue();
    if (this.shouldHandle()) {
      return {[this.statementKey]: {[path + "." + this.updateClause.key]: this.updateClause.value}}
    }
    return this.next.handle(mutation, path);
  }
}
