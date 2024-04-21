import { defineStore } from 'pinia'

export const useGlobalsStore = defineStore('globals', {
    state: () => ({
        popupRender: true,
        popupColumn: true,
        token: localStorage.getItem('token') || null,
        tasksActive: {
            data: "",
            project: "",
            folder: ""
        },
        projects: []
    }),
    getters: {},
    actions: {
        addProject(value) {
            this.projects.push(value);
        },
        
        updatetasksActive(data, project, folder) {
            this.tasksActive.data = data;
            this.tasksActive.project = project;
            this.tasksActive.folder = folder;
        }
    }
});
