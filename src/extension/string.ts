String.prototype.replaceForbiddenChar = function(): string {
  return this
    .replace(new RegExp("<", "g"), "less than")
    .replace(new RegExp(">", "g"), "greater than")
    .replace(new RegExp(":", "g"), " -")
    .replace(new RegExp(","), "")
    .replace(new RegExp("/", "g"), " ")
    .replace(new RegExp("\\?", "g"), "")
    .replace(new RegExp("\\*", "g"), "")
    .replace(new RegExp("\\.", "g"), "")
    .replace(new RegExp("\\\"", "g"), "")
}
