import Joi from "joi";
import ValidationException from "../../Exception/ValidationException.js";

export default class ValidatorBase {
    verifyErros(error) {
        const formattedErrors = error.details.map(err => ({
            field: err.path[0],
            message: err.message,
        }));

        throw new ValidationException(formattedErrors)
    }
}
