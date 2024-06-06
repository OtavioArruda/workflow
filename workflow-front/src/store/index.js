import { defineStore } from 'pinia'

export const useGlobalsStore = defineStore('globals', {
    state: () => ({
        popupRender: false,
        popupTask: false,
        popupProject: false,
        popupTaskUpdate: false,
        token: localStorage.getItem('token') || null,
        idColumn: "",
        idTask: "",
        projectActive: "",
        participants: [],
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

        addTask(task, idProj, idFol, idCol) {
            for (let idx = 0; idx < this.projects[0].data.projects.length; idx++) {
                
                const project = this.projects[0].data.projects[idx];
                if(project._id == idProj) {
                    
                    const folder = project.folders
                    for (let idxFolder = 0; idxFolder < folder.length; idxFolder++) {
                        if (idFol == folder[idxFolder]._id){
                            
                            const column = folder[idxFolder].columns;
                            for (let idxColumn = 0; idxColumn < column.length; idxColumn++) {
                                if (idCol == column[idxColumn]._id) {
                                    project.folders[idxFolder].columns[idxColumn].tasks.push(task);
                                }
                            }
                        }
                        
                    }
                }
            }
        },

        deleteTaskState(idProject, idFolder, idColumn, idTask){
            for (let idx = 0; idx < this.projects[0].data.projects.length; idx++) {

                const project = this.projects[0].data.projects[idx];
                if(project._id == idProject) {

                    const folder = project.folders
                    for (let idxFolder = 0; idxFolder < folder.length; idxFolder++) {
                        if (idFolder == folder[idxFolder]._id){

                            const column = project.folders[idxFolder].columns;
                            for (let idxColumn = 0; idxColumn < column.length; idxColumn++) {
                                if (idColumn == column[idxColumn]._id){
                                    
                                    const task = project.folders[idxFolder].columns[idxColumn].tasks;
                                    for (let idxTask = 0; idxTask < task.length; idxTask++) {
                                        if (idTask == task[idxTask]._id){
                                            column[idxColumn].tasks.splice(idxTask, 1);
                                        }
                                    }
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
        },

        updateProjectActive(data) {
            this.projectActive = data
        }
    }
});
