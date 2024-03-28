import { createStore } from 'vuex';

const store = createStore({
    state: {
        popupRender: true,
        popupColumn: true,
        projects: [
            {
                'name': 'PROJETO 1',
                'expanded': false,
                'subDirectory': [
                    {
                        'name': 'FRONT-END'
                    },
                    {
                        'name': 'BACK-END'
                    },
                    {
                        'name': 'BANCO'
                    }
                ]
            },
            {
                'name': 'PROJETO 2',
                'expanded': false,
                'subDirectory': [
                    {
                        'name': 'FRONT-END'
                    },
                    {
                        'name': 'BACK-END'
                    },
                    {
                        'name': 'BANCO'
                    }
                ]
            }
        ]
    },
    getters: {},
    mutations: {
        addProject(state, newValue) {
            state.projects.push(newValue);
        }
    },
    actions: {}
});

export default store