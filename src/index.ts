import {getPropertyValueByPath, isArrayOfObjects} from "./Helpers/utils";
import {UndefinedStatement} from "./Statements/UndefinedStatement";
import {AddStatement} from "./Statements/AddStatement";
import {Mutation} from "./Types/Mutation.type";
import {Statement} from "./Types/Statement.type";
import {UpdateStatement} from "./Statements/UpdateStatement";
import {DeleteStatement} from "./Statements/DeleteStatement";

export class StatementGenerator {

  private list: Statement[] = [];

  constructor(private originalDocument: {}, private mutation: Mutation) {
    this.traverseMutationObject(this.mutation);
  }

  public getList(): Statement[] {
    return this.list;
  }

  private traverseMutationObject(mutation: {}, path = "") {

    //for each path the function below adds the index of the object in the original document
    path = this.concatIndexOnPath(mutation, path);

    //if in any level the given id is not found, discard this mutation
    if (path.indexOf("-1") !== -1) return;

    //if the current object has sub levels, just go to the next level
    // and discard any mutations on the current level
    let mutationHasSubObjects = false;
    for (let prop in mutation) {
      if (isArrayOfObjects(mutation[prop])) {
        mutationHasSubObjects = true;
        for (let i = 0; i < mutation[prop].length; i++) {
          this.traverseMutationObject(mutation[prop][i], this.completePath(path, prop));
        }
      }
    }

    if (!mutationHasSubObjects) {
      this.incrementStatementList(mutation, path);
    }
  }

  private incrementStatementList(mutation: Mutation, path: string) {
    const statement = this.generateStatement(mutation, path);
    if (statement) this.list.push(statement);
  }

  private generateStatement(mutation: Mutation, path: string): Statement | null {

    const undefinedStatement = new UndefinedStatement().setNext(null);
    const updateStatement = new UpdateStatement().setNext(undefinedStatement);
    const deleteStatement = new DeleteStatement().setNext(updateStatement);
    const addStatement = new AddStatement().setNext(deleteStatement);

    return addStatement.handle(mutation, path);
  }


  private getTargetIndexById(targetId: string | number, path: string): number {
    const list = getPropertyValueByPath(path, this.originalDocument);
    return list.map(obj => obj._id).indexOf(targetId);
  }

  private concatIndexOnPath(mutation: Mutation, path: string): string {
    if ("_id" in mutation) {
      path += "." + this.getTargetIndexById(mutation._id, path);
    }
    return path;
  }

  private completePath(path: string, prop: string): string {
    if (!path) return prop;
    return path + "." + prop;
  }
}

export function generateUpdateStatement(originalDocument: {}, mutation: Mutation) {
  return new StatementGenerator(originalDocument, mutation).getList();
}
