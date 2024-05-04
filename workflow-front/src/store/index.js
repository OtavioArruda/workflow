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
    actions: {
        addProject(value) {
            if (this.projects.length == 0) {
                this.projects.push(value);
            }
            else{
                this.projects[0].data.projects.push(value)
            }
        },

        addFolder(value, idProject) {
            for (let idx = 0; idx < this.projects[0].data.projects.length; idx++) {
                let project = this.projects[0].data.projects[idx];
                if(project._id == idProject) {
                    project.folders.push(value);
                }
            }
        },

        deleteFolder(idProject, idFolder) {
            for (let idx = 0; idx < this.projects[0].data.projects.length; idx++) {

                let project = this.projects[0].data.projects[idx];
                if(project._id == idProject) {

                    let folder = project.folders
                    for (let idxFolder = 0; idxFolder < folder.length; idxFolder++) {
                        if (idFolder == folder[idxFolder]._id){
                            project.folders.splice(idxFolder, 1);
                        }
                        
                    }
                }
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
