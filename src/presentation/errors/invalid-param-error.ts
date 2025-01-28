export class InvalidParamError extends Error {
    constructor (paramName: String) {
        super(`Missing param: ${paramName}`)

        this.name = "InvalidParamName"
    }
}