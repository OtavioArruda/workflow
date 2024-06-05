import axios from 'axios';

export const createdUser = async (dados) => {    
    try {
        const response = await axios.post(
            'http://localhost:3000/users', 
            dados
        );

        return response.data;
    } catch (error) {
        console.error('Erro ao criar usuário:', error);
    }
}

export const accessAccount = async (login, router) => {
    try {
        const response = await axios.post(
            'http://localhost:3000/auth/login', 
            login
            );
        localStorage.setItem('token', response.data.data.token);  
        router.push('/principal');
    }
    catch (error) {
        console.error('Erro ao buscar usuário:', error);
    }
  
}