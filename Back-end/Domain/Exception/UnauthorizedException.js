export default class UnauthorizedException extends Error{
    constructor(message){
        super(message)
        this.name = "UnauthorizedError"
    }
}