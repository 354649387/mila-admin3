import Main from '../components/Main.vue'
import Index from '../components/Index/index.vue';
import AdminList from '../components/Admin/list.vue'
import AdminAdd from '../components/Admin/add.vue'
import AdminEdit from '../components/Admin/edit.vue'
import CategoryList from '../components/Category/list.vue'
import CategoryEdit from '../components/Category/edit.vue'
import ArticleList from '../components/Article/list.vue'
import ArticleAdd from '../components/Article/add.vue'
import ArticleEdit from '../components/Article/edit'
import RuleList from '../components/Rule/list.vue'
import RuleAdd from '../components/Rule/add.vue'
import RuleEdit from '../components/Rule/edit.vue'
import RoleList from '../components/Role/list.vue'
import RoleAdd from '../components/Role/add.vue'
import RoleEdit from '../components/Role/edit.vue'




const routes = [
	
	{path:'',component:Main,redirect:{name:"Index"}},
	
	{path:'/main',component:Main,children:[
		
		{path:'index',name:"Index",component:Index},
		{path:'adminList',name:"adminList",component:AdminList},
		{path:'adminAdd',name:"adminAdd",component:AdminAdd},
		{path:'adminEdit',name:"adminEdit",component:AdminEdit},
		{path:'categoryList',name:"categoryList",component:CategoryList},
		{path:'categoryEdit',name:"categoryEdit",component:CategoryEdit},
		{path:'articleList',name:"articleList",component:ArticleList},
		{path:'articleAdd',name:"articleAdd",component:ArticleAdd},
		{path:'articleEdit',name:"articleEdit",component:ArticleEdit},
		{path:'ruleList',name:'ruleList',component:RuleList},
		{path:'ruleAdd',name:'ruleAdd',component:RuleAdd},
		{path:'ruleEdit',name:'ruleEdit',component:RuleEdit},
		{path:'roleList',name:'roleList',component:RoleList},
		{path:'roleAdd',name:'roleAdd',component:RoleAdd},
		{path:'roleEdit',name:'roleEdit',component:RoleEdit},
		
	]},
	
]

export default routes;