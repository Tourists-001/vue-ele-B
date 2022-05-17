const Login = () => import('@/views/login/index.vue')
const Manage = () => import('@/views/manage/index.vue')
const Home = () => import('@/views/Home/index.vue')
const userList = () => import('@/views/userList/index.vue')
const shopList = () => import('@/views/shopList/index.vue')
const foodList = () => import('@/views/foodList/index.vue')
const orderList = () => import('@/views/orderList/index.vue')
const adminList = () => import('@/views/adminList/index.vue')
const addShop = () => import('@/views/addShop')
const addGoods = () => import('@/views/addGoods')
const visitor = () => import('@/views/visitor')
const vueEdit = () => import('@/views/vueEdit')
const adminSet = () => import('@/views/adminSet')
const explain = () => import('@/views/explain')
export default [{
    path: '/',
    component: Login,
}, {
    path: '/manage',
    component: Manage,
    name: '',
    children: [{
        path: '',
        component: Home,
        meta: []
    }, {
        path: '/userList',
        component: userList,
        meta: ['数据管理', '用户列表'],
    }, {
        path: '/shopList',
        component: shopList,
        meta: ['数据管理', '商家列表'],
    }, {
        path: '/foodList',
        component: foodList,
        meta: ['数据管理', '食品列表'],
    }, {
        path: '/orderList',
        component: orderList,
        meta: ['数据管理', '订单列表'],
    }, {
        path: '/adminList',
        component: adminList,
        meta: ['数据管理', '用户管理'],
    }, {
        path: '/addShop',
        component: addShop,
        meta: ['数据管理', '添加商品'],
    }, {
        path: '/addGoods',
        component: addGoods,
        meta: ['数据管理', '添加商铺'],
    },{
        path: '/visitor',
        component: visitor,
        meta: ['数据管理', '用户分布'],
    },{
        path: '/vueEdit',
        component: vueEdit,
        meta: ['数据管理', '文本编辑'],
    }, {
        path: '/adminSet',
        component: adminSet,
        meta: ['数据管理', '用户设置'],
    }, {
        path: '/explain',
        component: explain,
        meta: ['数据管理', '用户说明'],
    }]
}]