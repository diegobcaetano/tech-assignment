import {Mutation} from "../Types/Mutation.type";
import {Statement} from "../Types/Statement.type";

export abstract class StatementGeneratorHandler {
  protected next: StatementGeneratorHandler;
  protected mutation: Mutation;
  protected statementKey: string;

  handle(mutation: Mutation, path: string): Statement | null {
    throw new Error("Handler not implemented");
  };

  protected shouldHandle(): boolean {
    return false;
  }

  public setNext(next?: StatementGeneratorHandler): StatementGeneratorHandler {
    this.next = next;
    return this;
  }
}
