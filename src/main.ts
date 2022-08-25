import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index'
import store from './store'
import './assets/styles.scss'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import VueClickAway from "vue3-click-away";
import { faFile, faEnvelope, faLock, faChevronDown, faPhone, faMapPin, faUpload, faAngleDown, faAddressCard, 
         faHouseUser, faRunning, faUserFriends, faMoneyBill, faAngleUp, faBell, faClipboard, faSearch, faFilePdf, faFileExcel,
         faChartLine, 
         faClock,
         faGlobe,         
         faChessRook,
         faPiggyBank,
         faEuroSign,
         faHandHolding,
         faAward,         
         faDove,         
         faPlaneDeparture,
         faUnlock,
         faArrowCircleLeft,
         faHistory,
         faArrowCircleUp,
         faArrowCircleRight,
         faCoins,
         faQuestion,
         faBriefcase,
         faChevronUp,
         faFileSignature
        } from '@fortawesome/free-solid-svg-icons'

library.add(faFile, faEnvelope, faLock, faChevronDown, faPhone, faMapPin, faUpload, faAngleDown, faAddressCard, 
            faHouseUser, faRunning, faUserFriends, faMoneyBill, faAngleUp, faBell, faClipboard, faSearch, faFilePdf, faFileExcel, 
            faChartLine, faClock, faGlobe, faHandHolding, faEuroSign, faChessRook, faPiggyBank, faAward, faPlaneDeparture, faDove,
            faUnlock, faArrowCircleLeft, faHistory, faArrowCircleUp, faArrowCircleRight, faCoins, faQuestion, faBriefcase, faChevronUp,
            faFileSignature)


createApp(App).use(store).use(router).use(VueClickAway).component('font-awesome-icon', FontAwesomeIcon).mount('#app')
