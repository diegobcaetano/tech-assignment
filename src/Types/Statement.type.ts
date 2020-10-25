export type Statement = {
  "$add"?: Operation,
  "$update"?: Operation,
  "$delete"?: Operation
}

type Operation = {
  [prop: string]: any
}
