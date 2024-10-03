const errorTypes = {
    NotFound: {
        statusCode: 404,
        message: (error) => error.message || "Recurso não encontrado!"
    },
    ValidationError: {
        statusCode: 400,
        message: (error) => error.message || "Dados de entrada inválidos!"
    },
    UnauthorizedError:{
        statusCode: 403,
        message: (error) => error.message || "Você não possui autorização para acessar essa rota!"
    },
    ServerError: {
        statusCode: 500,
        message: (error) => error.message || "Internal Server error"
    }
}



export default function errorHandler(error, request, response, next) {
    const errorType = error.name || 'ServerError'

    const { statusCode, message } = errorTypes[errorType] || errorTypes['ServerError']

    return response.status(statusCode).send({ message: message(error) })
}