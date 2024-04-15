import { defineStore } from 'pinia'

export const useGlobalsStore = defineStore('globals', {
    state: () => ({
        popupRender: true,
        popupColumn: true,
        token: localStorage.getItem('token') || null,
        tasksActive: {
            project: "",
            folder: "",
            column: [],
        },
        projects: []
    }),
    getters: {},
    actions: {
        addProject(value) {
            this.projects.push(value);
        },
        
        updatetasksActive(project, folder, columns) {
            this.tasksActive.project = project;
            this.tasksActive.folder = folder;
            this.tasksActive.column = columns;
        }
    }
});

// const store = createStore({
//     state: {
//         popupRender: true,
//         popupColumn: true,
//         projects: [
//             {
//                 'name': 'PROJETO 1',
//                 'expanded': false,
//                 'subDirectory': [
//                     {
//                         'name': 'FRONT-END'
//                     },
//                     {
//                         'name': 'BACK-END'
//                     },
//                     {
//                         'name': 'BANCO'
//                     }
//                 ]
//             },
//             {
//                 'name': 'PROJETO 2',
//                 'expanded': false,
//                 'subDirectory': [
//                     {
//                         'name': 'FRONT-END'
//                     },
//                     {
//                         'name': 'BACK-END'
//                     },
//                     {
//                         'name': 'BANCO'
//                     }
//                 ]
//             }
//         ]
//     },
//     getters: {},
//     mutations: {
//         addProject(state, value) {
//             state.projects.push(value);
//         }
//     },
//     actions: {}
// });

// export default store