import { checkSchema, validationResult } from "express-validator";

const userSchema = {
    name: {
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
    cpf: {
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
    userType: {
        in: ['body'],
        exists: {
            errorMessage: 'O tipo de usuário é obrigatório.',
        },
        isString: {
            errorMessage: 'O tipo de usuário deve ser uma string.',
        },
        // isIn: {
        //     options: [['admin', 'user', 'guest']],
        //     errorMessage: 'O tipo de usuário deve ser admin, user ou guest.',
        // },
    },
    email: {
        in: ['body'],
        exists: {
            errorMessage: 'O email é obrigatório.',
        },
        isEmail: {
            errorMessage: 'O email deve ser válido.',
        },
    },
    password: {
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
    telefone: {
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
    registerDate: {
        in: ['body'],
        exists: {
            errorMessage: 'A data de registro é obrigatória.',
        },
    },
    companyId: {
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