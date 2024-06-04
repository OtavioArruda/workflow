import axios from 'axios';


export const searchUsers = async (store, participant) => {
    try {
        const res = await axios.get(
            'http://localhost:3000/users',
            {
                headers: { Authorization: `Bearer ${store.token}` }
            }
        );

        const users = res.data.data;

        for (let idxUser = 0; idxUser < users.length; idxUser++) {
            if (users[idxUser].email == participant) {
                return users[idxUser]._id;
            }
        }

        return false;
    }
    catch (error) {
        console.log(error);
    }
}

export const searchParticipants = async (store, participant) => {
    try {
        const res = await axios.get(
            'http://localhost:3000/users',
            {
                headers: { Authorization: `Bearer ${store.token}` }
            }
        );

        const users = res.data.data;

        for (let idxUser = 0; idxUser < users.length; idxUser++) {
            if (users[idxUser]._id == participant) {
                return users[idxUser];
            }
        }

        return false;
    }
    catch (error) {
        console.log(error);
    }
}

export const searchEmails = async (store, participant) => {
    try {
        const res = await axios.get(
            'http://localhost:3000/users',
            {
                headers: { Authorization: `Bearer ${store.token}` }
            }
        );

        const users = res.data.data;

        for (let idxUser = 0; idxUser < users.length; idxUser++) {
            if (users[idxUser].email == participant) {
                return users[idxUser]._id;
            }
        }

        return false;
    }
    catch (error) {
        console.log(error);
    }
}

export const searchMe = async (store) => {
    try {
        const res = await axios.get(
            'http://localhost:3000/users/me',
            {
                headers: { Authorization: `Bearer ${store.token}` }
            }
        );

        const user = res.data.data;

        return user.user
    }
    catch (error) {
        console.log(error);
    }
}


export const searchProjects = async (store, dataLoaded) => {
    try {
        const resProject = await axios.get(
            'http://localhost:3000/projects',
            {
                headers: { Authorization: `Bearer ${store.token}` }
            }
        );

        if (resProject.data) {
            const user = await searchMe(store);

            if (user != undefined) {
                store.email = user.email;
                store.name = user.name;
                store.sigla = store.email[0].toUpperCase()

                store.addProject(resProject.data);

                dataLoaded.value = true;
            }

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
        );

        store.addProject(response.data.data.project);
        return response.data;

    }
    catch (error) {
        console.log(error);
    }
}

export const createdFolder = async (dados, store, idProject) => {
    try {

        const response = await axios.post(
            'http://localhost:3000/folders',
            dados,
            {
                headers: { Authorization: `Bearer ${store.token}` }
            }
        );

        store.addFolder(response.data.data.folder, idProject);
    }
    catch (error) {
        console.log(error);
    }
}

export const deleteFolder = async (idProject, idFolder, store) => {
    try {
        const response = await axios.delete(
            `http://localhost:3000/folders/${idFolder}`,
            {
                headers: { Authorization: `Bearer ${store.token}` }
            }
        );

        store.deleteFolder(idProject, idFolder);
    }
    catch (error) {
        console.log(error);
    }
}

export const createColumn = async (dados, store, projectId, folderId) => {
    try {
        const response = await axios.post(
            'http://localhost:3000/columns',
            dados,
            {
                headers: { Authorization: `Bearer ${store.token}` }
            }
        );

        store.addColumn(response.data.data.column, projectId, folderId);
    }
    catch (error) {
        console.log(error);
    }
}


export const deleteColumn = async (idProject, idFolder, idColumn, store) => {
    try {
        const response = await axios.delete(
            `http://localhost:3000/columns/${idColumn}`,
            {
                headers: { Authorization: `Bearer ${store.token}` }
            }
        );

        store.deleteColumn(idProject, idFolder, idColumn);

    }
    catch (error) {
        console.log(error);
    }
}

export const createdTasks = async (dados, store, idFolder, idProject, idColumn) => {
    try {
        const response = await axios.post(
            'http://localhost:3000/tasks',
            dados,
            {
                headers: { Authorization: `Bearer ${store.token}` }
            }
        );

        store.popupTask = !store.popupTask;

        store.addTask(response.data.data.task, idProject, idFolder, idColumn);
    }
    catch (error) {
        console.log(error);
    }
}

export const updateFolder = async (data, idFolder, store) => {
    try {
        const response = await axios.put(
            `http://localhost:3000/folders/${idFolder}`,
            data,
            {
                headers: { Authorization: `Bearer ${store.token}` }
            }
        );

        const btnActive = document.querySelector(`.about-tasks[data-value="${data.name}"]`);

        const selectTask = new MouseEvent('click', {
            bubbles: true,
            cancelable: true,
        });

        btnActive.dispatchEvent(selectTask);
    }
    catch (error) {
        console.log(error);
    }
}

export const updateColumn = async (data, idColumn, store) => {
    try {
        const response = await axios.put(
            `http://localhost:3000/columns/${idColumn}`,
            data,
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