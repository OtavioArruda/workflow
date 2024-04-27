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
            idProject: "",
            idFolder: ""
        },
        projects: []
    }),
    getters: {},
    actions: {
        addProject(value) {
            if (this.projects.length == 0) {
                this.projects.push(value);
            }
            else{
                this.projects[0].data.projects.push(value)
            }
        },
        
        updatetasksActive(data, project, folder, idProject, idFolder) {
            this.tasksActive.data = data;
            this.tasksActive.project = project;
            this.tasksActive.folder = folder;
            this.tasksActive.idProject = idProject;
            this.tasksActive.idFolder = idFolder;
        }
    }
});
