import { defineStore } from 'pinia'

export const useGlobalsStore = defineStore('globals', {
    state: () => ({
        popupRender: true,
        popupColumn: true,
        token: localStorage.getItem('token') || null,
        tasksActive: {
            data: "",
            project: "",
            folder: "",
            id_project: "",
            id_folder: ""
        },
        projects: []
    }),
    getters: {},
    actions: {
        addProject(value) {
            this.projects.push(value);
        },
        
        updatetasksActive(data, project, folder, id_project, id_folder) {
            this.tasksActive.data = data;
            this.tasksActive.project = project;
            this.tasksActive.folder = folder;
            this.tasksActive.id_project = id_project;
            this.tasksActive.id_folder = id_folder;
        }
    }
});
