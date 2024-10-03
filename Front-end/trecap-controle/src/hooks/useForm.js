import { useState } from "react";

const typesValidations = {
    email: {
        validate(value) {
            const regex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/
            return regex.test(value)
        },
        messageError: 'Email inválido!'
    },
    CPF: {
        validate(value) {
            const regex = /^([0-9]{3}\.?[0-9]{3}\.?[0-9]{3}\-?[0-9]{2}|[0-9]{2}\.?[0-9]{3}\.?[0-9]{3}\/?[0-9]{4}\-?[0-9]{2})$/
            return regex.test(value)
        },
        messageError: 'CPF inválido!'
    },
    token: {
        validate(value) {
            const regex = /^\d+$/
            return regex.test(value)
        },
        messageError: 'Token inválido'
    },
    CNPJ: {
        validate(value) {
            const regex = /^([0-9]{3}\.?[0-9]{3}\.?[0-9]{3}\-?[0-9]{2}|[0-9]{2}\.?[0-9]{3}\.?[0-9]{3}\/?[0-9]{4}\-?[0-9]{2})$/
            return regex.test(value)
        },
        messageError: 'CNPJ inválido!'
    },
    CEP: {
        validate(value) {
            const cepSemMascara = value.replace(/\D/g, '');

            const regex = /^[0-9]{8}$/;
            return regex.test(cepSemMascara)
        },
        messageError: 'O CEP está incorreto!'
    },
    cidade: {
        validate(value) {
            const regex = /\S+/;
            return regex.test(value)
        },
        messageError: 'A cidade não pode estar vazia!'
    },
    estado: {
        validate(value) {
            const regex = /[a-zA-Z\u00C0-\u00FF ]+/i;
            return regex.test(value)
        },
        messageError: 'O estado não pode estar vazio!'
    },
    bairro: {
        validate(value) {
            const regex = /[a-zA-Z\u00C0-\u00FF ]+/i;
            return regex.test(value)
        },
        messageError: 'O bairro não pode estar vazio'
    },
    nome: {
        validate(value) {
            const regex = /^[a-zA-ZÀ-ÿ]+$/;
            return regex.test(value);
        },
        messageError: 'Nome inválido! Use apenas letras e espaços.'
    },
    biometria: {
        validate(value){
            const regex = /^[a-zA-ZÀ-ÿ]+$/;
            return regex.test(value)
        },
        messageError: 'Biometria está inválida'
    },
    telefone: {
        validate(value) {
            const regex = /^\(?\d{2}\)?[\s-]?9?\d{4}[-]?\d{4}$/;
            return regex.test(value)
        },
        messageError: 'Digite um número válido!'
    },
    rua: {
        validate(value){
            const regex =  /\S+/;
            return regex.test(value)
        },
        messageError: 'Rua inválida!'
    }

}


const useForm = (type, validationFunction = null) => {
    const [value, setValue] = useState('')
    const [error, setError] = useState(null)

    function onChange({ target }) {
        if (error) {
            isValid(target.value)
        }
        setValue(target.value)
    }

    function isValid(value) {
        console.log(value)
        if (type === false) return true
        if (value.length === 0) {
            setError('Preencha um valor!')
            return false
        } else if (typesValidations[type] && !typesValidations[type].validate(value)) {
            setError(typesValidations[type].messageError)
            return false
        }
        setError(null)
        return true
    }

    return {
        value,
        setValue,
        onChange,
        error,
        setError,
        isValid: () => isValid(value),
        onBlur: () => isValid(value)
    }
}

export default useForm