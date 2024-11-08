import Joi from "joi";
import ValidatorBase from "./ValidatorBase.js";


class UserValidator extends ValidatorBase {
    validate(user) {
        const schema = Joi.object({
            usu_nome : Joi.string().required().empty().messages({
                "any.required": "O campo usu_nome é obrigatório",
                "string.empty": "O campo usu_nome não pode ser vazio"
            }),
            usu_CPF : Joi.number().required().empty().messages({
                "any.required": "O campo usu_CPF é obrigatório",
                "string.empty": "O campo usu_CPF não pode ser vazio"
            }),
            usu_email : Joi.string().email().required().empty().messages({
                "any.required": "O campo usu_email é obrigatório",
                "string.empty": "O campo usu_email não pode ser vazio"
            }),
            usu_senha : Joi.string().required().empty().messages({
                "any.required": "O campo usu_senha é obrigatório",
                "string.empty": "O campo usu_senha não pode ser vazio"
            }),
            usu_telefone : Joi.string().required().empty().messages({
                "any.required": "O campo usu_telefone é obrigatório",
                "string.empty": "O campo usu_telefone não pode ser vazio"
            }),
            empresa_id : Joi.number().required().empty().messages({
                "any.required": "O campo empresa_id é obrigatório",
                "string.empty": "O campo empresa_id não pode ser vazio"
            }),
        }).unknown(true)

        const { error, value } = schema.validate(user, {abortEarly:false})

        if(error) this.verifyErros(error)
    }
}

export default new UserValidator()