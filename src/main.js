import './style.css'
import{router} from './routes/router'
import App from './App.vue'
import{  createPinia} from 'pinia'
import { createApp } from 'vue'
import {
  // create naive ui
  create,
  // component
  NButton,NInputGroup,NCard,NInput,NForm,NFormItem,NCheckbox,NDivider,NGrid,NGridItem,NSpace,NCarousel,NBreadcrumb,
  NBreadcrumbItem,NP,NH1,NH2,NLayout,NLayoutHeader,NLayoutContent,NLayoutFooter,NIcon,NCalendar,NDropdown,NLayoutSider,NImage,NList,NListItem,NThing,
  NEllipsis,NPagination,NTabs,NTabPane,NAvatar, NUpload, NMessageProvider, NSelect, NRadio, NCheckboxGroup, NSwitch, NMenu,NDialogProvider, NTable
} from 'naive-ui'


const naive = create({
    components: [NButton,NInputGroup,NCard,NInput,NForm,NFormItem,NCheckbox,NDivider,NGrid,NGridItem,NSpace,NCarousel,
      NBreadcrumb,NBreadcrumbItem,NP,NH1,NH2,NLayout,NLayoutHeader,NLayoutContent,NLayoutFooter,NIcon,NCalendar,NDropdown,NLayoutSider,NImage,NList,NListItem,NThing,
      NEllipsis,NPagination,NTabs,NTabPane,NAvatar,NUpload,NMessageProvider,NSelect,NRadio,NCheckboxGroup,NSwitch,NMenu,NDialogProvider,NTable ]
  })
  const sensitiveWords = ['fuck', '敏感词2', '敏感词3'];
  const app = createApp(App);

  app.use(naive);
  app.use(createPinia());
  app.use(router);
  app.mount('#app');



