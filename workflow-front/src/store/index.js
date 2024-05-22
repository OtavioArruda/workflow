import { defineStore } from 'pinia'

export const useGlobalsStore = defineStore('globals', {
    state: () => ({
        popupRender: false,
        popupTask: false,
        token: localStorage.getItem('token') || null,
        idColumn: "",
        tasksActive: {
            data: "",
            project: "",
            folder: "",
            idProject: "",
            idFolder: ""
        },
        projects: [],
        email: "",
        name: "",
        sigla: ""
    }),
    actions: {
        addProject(project) {
            if (this.projects.length == 0) {
                this.projects.push(project);
            }
            else{
                this.projects[0].data.projects.push(project)
            }
        },

        addFolder(folder, idProject) {
            for (let idx = 0; idx < this.projects[0].data.projects.length; idx++) {
                const project = this.projects[0].data.projects[idx];
                if(project._id == idProject) {
                    project.folders.push(folder);
                }
            }
        },

        deleteFolder(idProject, idFolder) {
            for (let idx = 0; idx < this.projects[0].data.projects.length; idx++) {

                const project = this.projects[0].data.projects[idx];
                if(project._id == idProject) {

                    const folder = project.folders
                    for (let idxFolder = 0; idxFolder < folder.length; idxFolder++) {
                        if (idFolder == folder[idxFolder]._id){
                            project.folders.splice(idxFolder, 1);
                        }
                        
                    }
                }
            }
        },

        addColumn(column, idProject, idFolder) {
            for (let idx = 0; idx < this.projects[0].data.projects.length; idx++) {

                const project = this.projects[0].data.projects[idx];
                if(project._id == idProject) {

                    const folder = project.folders
                    for (let idxFolder = 0; idxFolder < folder.length; idxFolder++) {
                        if (idFolder == folder[idxFolder]._id){
                            project.folders[idxFolder].columns.push(column);
                        }
                        
                    }
                }
            }
        },

        deleteColumn(idProject, idFolder, idColumn){
            for (let idx = 0; idx < this.projects[0].data.projects.length; idx++) {

                const project = this.projects[0].data.projects[idx];
                if(project._id == idProject) {

                    const folder = project.folders
                    for (let idxFolder = 0; idxFolder < folder.length; idxFolder++) {
                        if (idFolder == folder[idxFolder]._id){

                            const column = project.folders[idxFolder].columns;
                            for (let idxColumn = 0; idxColumn < column.length; idxColumn++) {
                                if (idColumn == column[idxColumn]._id){
                                    folder[idxFolder].columns.splice(idxColumn, 1);
                                }
                            }
                        }
                        
                    }
                }
            }
        },

        addTask(task, idProject, idFolder, idColumn) {
            for (let idx = 0; idx < this.projects[0].data.projects.length; idx++) {

                const project = this.projects[0].data.projects[idx];
                if(project._id == idProject) {

                    const folder = project.folders
                    for (let idxFolder = 0; idxFolder < folder.length; idxFolder++) {
                        if (idFolder == folder[idxFolder]._id){

                            const column = folder[0].columns;
                            for (let idxColumn = 0; idxColumn < column.length; idxColumn++) {
                                if (idColumn = column[idxColumn]._id) {
                                    console.log(project.folders[idxFolder].columns[idxColumn]);
                                    project.folders[idxFolder].columns[idxColumn].tasks.push(task);
                                }
                            }
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
