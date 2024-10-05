import {useState} from 'react'

export default function CadastroDigital() {
    const [formData, setFormData] = useState ({
        name: '',
        email: '',
        password: '',
        cpf: '',
        telefone: '',
    });

    const [error, setError] = useState('');

    const handleChange = (e) => {
        setFormData({
            ...formData,
        [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validação de maneira Simples

        if (!formData.name || !formData.email || formData.password || formData.cpf || formData.telefone) {
            setError('Todos os campos são obrigatórios');
            
            return;

        }

        //realizar requisição para uma api

        console.log(formData)
    };

}