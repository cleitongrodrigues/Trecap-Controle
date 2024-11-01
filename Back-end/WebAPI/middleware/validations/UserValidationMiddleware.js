import { checkSchema, validationResult } from "express-validator";

const userSchema = {
    usu_nome: {
        in: ['body'],
        exists: {
            errorMessage: 'O nome é obrigatório.',
        },
        isString: {
            errorMessage: 'O nome deve ser uma string.',
        },
        isLength: {
            options: { min: 1 },
            errorMessage: 'O nome não pode estar vazio.',
        },
    },
   usu_CPF: {
        in: ['body'],
        exists: {
            errorMessage: 'O CPF é obrigatório.',
        },
        isString: {
            errorMessage: 'O CPF deve ser uma string.',
        },
        isLength: {
            options: { min: 11, max: 11 },
            errorMessage: 'O CPF deve ter 11 dígitos.',
        },
    },
    usu_email: {
        in: ['body'],
        exists: {
            errorMessage: 'O email é obrigatório.',
        },
        isEmail: {
            errorMessage: 'O email deve ser válido.',
        },
    },
    usu_senha: {
        in: ['body'],
        exists: {
            errorMessage: 'A senha é obrigatória.',
        },
        isString: {
            errorMessage: 'A senha deve ser uma string.',
        },
        isLength: {
            options: { min: 6 },
            errorMessage: 'A senha deve ter pelo menos 6 caracteres.',
        },
    },
    usu_telefone: {
        in: ['body'],
        exists: {
            errorMessage: 'O telefone é obrigatório.',
        },
        isString: {
            errorMessage: 'O telefone deve ser uma string.',
        },
        isLength: {
            options: { min: 10, max: 15 },
            errorMessage: 'O telefone deve ter entre 10 e 15 caracteres.',
        },
    },
    empresa_id: {
        in: ['body'],
        exists: { 
            errorMessage: 'O companyId é obrigatório.',
        },
        isNumeric: {
            errorMessage: 'O companyId deve ser um número.',
        },
    },
};

const userValidation = () => {
    return [
        checkSchema(userSchema),
        (request, response, next) =>{
            const errors = validationResult(request)
            if (!errors.isEmpty()) {
                const formattedErrors = {};

                console.log(errors.mapped())
                for (const key in errors.mapped()) {
                    formattedErrors[key] = {
                        message: errors.mapped()[key].msg,
                    };
                }

                return response.status(422).json({
                    errors: formattedErrors,
                });
            }
            next()
        }
    ]
};

export default userValidation()