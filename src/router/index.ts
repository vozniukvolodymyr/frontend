import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import HomeComponent from '../components/Home.vue';
const HomeInfoComponent = () => import('../components/HomeInfo.vue');
import LoginComponent from '../components/Login.vue';
const DashBoardComponent = () => import('../components/DashBoard.vue');
const ProfileComponent = () => import('../components/Profile.vue');
const ChangePassComponent = () => import('../components/ChangePass.vue');
const PartnerBecomeComponent = () => import('../components/PartnerBecome.vue');
const StructureComponent = () => import('../components/Structure.vue');
const PayComponent = () => import('../components/Pay.vue');
const NotFoundComponent = () => import('../components/NotFound.vue');
const RegisterComponent = () => import('../components/Register.vue');
const PolicyComponent = () => import('../components/Policy.vue');
const CompanyComponent = () => import('../components/Company.vue');
const LaunchComponent = () => import('../components/Launch.vue');
const LegalComponent = () => import('../components/Legal.vue');
const SupportComponent = () => import('../components/Support.vue');
const MessagesComponent = () => import('../components/Messages.vue');
const HangupComponent = () => import('../components/Hangup.vue');
const CareerComponent = () => import('../components/Career.vue');
const HelpComponent = () => import('../components/Help.vue');
const AgreementComponent = () => import('../components/Agreement.vue');
const PromotionComponent = () => import('../components/Promotion.vue');

import store from '../store/index';
import { AUTH_TIMERRESTART } from '../store/actions/user';

const ifAuthenticated = (to: any, from: any, next: any) => {
  if (store.getters.authenticated) {
    next();
    store.commit(AUTH_TIMERRESTART);    
  }else{
    next("/login");
  }
};

const ifRefer = (to: any, from: any, next: any) => {
  if (store.getters.authenticated) {
    if (store.getters.user.refer){
      next();
      store.commit(AUTH_TIMERRESTART);      
    }else{
      next(false);      
    }
  }else{
    next("/login");
  }
};

const ifNorefer = (to: any, from: any, next: any) => {
  if (store.getters.authenticated) {
    if (!store.getters.user.refer){
      next();
      store.commit(AUTH_TIMERRESTART);      
    }else{
      next(false);      
    }
  }else{
    next("/login");
  }
};

const ifHomeAuthenticated = (to: any, from: any, next: any) => {
  if (store.getters.authenticated) {
    next("/launch" + to.href);
  }else{
    next();
  }
};

const routes: Array<RouteRecordRaw> = [
  {
    path: "/login",
    component: LoginComponent
  },  
  {
    path: "/register",
    component: RegisterComponent
  },
  {
    path: "/hangup",
    component: HangupComponent
  },   
  {
    path: "/",
    component: HomeComponent,
    children: [
      {
        path: 'company',
        component: CompanyComponent,
        beforeEnter: ifHomeAuthenticated        
      },      
      {
        path: '',
        component: HomeInfoComponent,
        beforeEnter: ifHomeAuthenticated        
      },
      {
        path: "policy",
        component: PolicyComponent,
        beforeEnter: ifHomeAuthenticated
      },      
      {
        path: "legal",
        component: LegalComponent,
        beforeEnter: ifHomeAuthenticated
      },      
      {
        path: "support",
        component: SupportComponent,
        beforeEnter: ifHomeAuthenticated
      }       
    ]    
  },    
  {
    path: "/launch",
    component: LaunchComponent,
    children: [
      {
        path: 'dashboard',
        component: DashBoardComponent,
        beforeEnter: ifAuthenticated        
      },
      {
        path: 'profile',
        component: ProfileComponent, 
        beforeEnter: ifAuthenticated       
      },
      {
        path: 'changepass',
        component: ChangePassComponent, 
        beforeEnter: ifAuthenticated       
      },
      {
        path: 'partnerbecome',
        component: PartnerBecomeComponent,
        beforeEnter: ifNorefer
      },
      {
        path: 'structure',
        component: StructureComponent, 
        beforeEnter: ifRefer       
      },
      {
        path: 'pay',
        component: PayComponent,
        beforeEnter: ifAuthenticated        
      },
      {
        path: 'career',
        component: CareerComponent,
        beforeEnter: ifAuthenticated        
      },
      {
        path: 'help',
        component: HelpComponent,
        beforeEnter: ifAuthenticated        
      },
      {        
        path: "messages", 
        component: MessagesComponent, 
        beforeEnter: ifAuthenticated
      },  
      {
        path: "messages/unread",
        component: MessagesComponent, 
        props: { onlyunread: true },             
        beforeEnter: ifAuthenticated
      },
      {
        path: 'company',
        component: CompanyComponent,    
        beforeEnter: ifAuthenticated    
      },      
      {
        path: '',
        component: HomeInfoComponent, 
        beforeEnter: ifAuthenticated       
      },
      {
        path: "policy",
        component: PolicyComponent,
        beforeEnter: ifAuthenticated
      },      
      {
        path: "legal",
        component: LegalComponent,
        beforeEnter: ifAuthenticated
      },      
      {
        path: "support",
        component: SupportComponent,
        beforeEnter: ifAuthenticated
      },
      {
        path: "agreement",
        component: AgreementComponent,
        beforeEnter: ifAuthenticated
      },
      {
        path: "promotion",
        component: PromotionComponent,
        beforeEnter: ifAuthenticated
      },
    ],
    beforeEnter: ifAuthenticated    
  },    
  {
    path: "/:catchAll(.*)",
    component:NotFoundComponent
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  linkActiveClass: "routerlinkactive",
  linkExactActiveClass: "routerlinkactive"
})

export default router
