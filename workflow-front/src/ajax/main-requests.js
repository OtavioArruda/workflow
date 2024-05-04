import axios from 'axios';


export const searchProjects = async (store, dataLoaded) => {
    try {
        const resProject = await axios.get(
            'http://localhost:3000/projects',
            {
                headers: { Authorization: `Bearer ${store.token}` }
            }
        );
        if (resProject.data) {
            let projects = resProject.data;
            store.addProject(projects);
            dataLoaded.value = true;
        }
    }
    catch (error) {
        console.log(error);
    }
}

export const createdProject = async (dados, store) => {
    try {
        store.popupRender = !store.popupRender;

        const response = await axios.post(
            'http://localhost:3000/projects',
            dados,
            {
                headers: { Authorization: `Bearer ${store.token}` }
            }
        )
        store.addProject(response.data.data.project);
    }
    catch (error) {

    }
}

export const createdFolder = async (dados, store) => {
    try {

        const response = await axios.post(
            'http://localhost:3000/folders',
            dados,
            {
                headers: { Authorization: `Bearer ${store.token}` }
            }
        )
        console.log(response.data);
        
    } 
    catch (error) {
        console.log(error);
    }
}

export const deleteFolder = async (idFolder, store) => {
    try {
        const response = await axios.delete(
            `http://localhost:3000/folders/${idFolder}`,
            {
                headers: { Authorization: `Bearer ${store.token}` }
            }
        )
        console.log(response.data);
        
    } 
    catch (error) {
        console.log(error);
    }
}

export const createColumn = async (dados, store) => {
    try {
        const response = await axios.post(
            'http://localhost:3000/columns',
            dados,
            {
                headers: { Authorization: `Bearer ${store.token}` }
            }
        )
        console.log(response.data);
        
    } 
    catch (error) {
        console.log(error);
    }
}

export const addTasks = async (dados, store) => {
    try {

        const response = await axios.post(
            'http://localhost:3000/tasks',
            dados,
            {
                headers: { Authorization: `Bearer ${store.token}` }
            }
        )
        console.log(response.data);
        
    } 
    catch (error) {
        console.log(error);
    }
}

export const deleteColumn = async (idColumn, store) => {
    try {
        const response = await axios.delete(
            `http://localhost:3000/columns/${idColumn}`,
            {
                headers: { Authorization: `Bearer ${store.token}` }
            }
        )
        console.log(response.data);
        
    } 
    catch (error) {
        console.log(error);
    }
}