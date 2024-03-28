import { createStore } from "vuex";

const store = createStore({
    state: {
        popup_render: true,
        popup_column: true,
        projects: [
            {
                'name': "PROJETO 1",
                'expanded': false,
                'sub_directory': [
                    {
                        'name': "FRONT-END"
                    },
                    {
                        'name': "BACK-END"
                    },
                    {
                        'name': "BANCO"
                    }
                ]
            },
            {
                'name': "PROJETO 2",
                'expanded': false,
                'sub_directory': [
                    {
                        'name': "FRONT-END"
                    },
                    {
                        'name': "BACK-END"
                    },
                    {
                        'name': "BANCO"
                    }
                ]
            }
        ]
    },
    getters: {},
    mutations: {
        AddProject(state, newValue) {
            state.projects.push(newValue);
          }
    },
    actions: {}
});

export default store