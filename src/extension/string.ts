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

String.prototype.truncate = function(size = 20): string {
  return `${this.substring(0, size)}${this.length > size ? "..." : ""}`
}
