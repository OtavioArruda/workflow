import { createRouter, createWebHistory } from 'vue-router';
import LoginView from '@/views/LoginView.vue';
import CadastroView from '@/views/CadastroView.vue';
import PrincipalView from '@/views/PrincipalView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'login',
      component: LoginView
    },
    {
      path: '/cadastro',
      name: 'cadastro',
      component: CadastroView
    },
    {
      path: '/principal',
      name: 'principal',
      component: PrincipalView
    }
  ]
});

export default router;
