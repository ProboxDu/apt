import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err)
}

const routes = [
    {
        path: '/index',
        component: () => import('@/views/Index.vue'),
        meta: {
            title: "APT威胁情报知识库"
        }
    },
    {
        path: '/',
        name: 'Home',
        redirect: '/index',
        component: () => import('@/views/home/Home.vue'),
        children:[
            {
                path: 'reportsearch',
                name: 'ReportSearch',
                component: () => import('../views/home/ReportSearch.vue')
            },
            {
                path: 'intelligence',
                name: 'IntelligenceSearch',
                component: () => import('../views/home/IntelligenceSearch.vue')
            },
            {
                path: 'aptaa',
                name: 'APTAssociationAnalysis',
                component: () => import('../views/home/APTAssociationAnalysis.vue')
            },
            {
                path: 'reportmanage',
                name: 'ReportManage',
                component: () => import('../views/home/ReportManage.vue')
            },
            {
                path: 'audit',
                name: 'Audit',
                component: () => import('../views/home/Audit.vue')
            },
        ]
    },
]

const router = new VueRouter({
    mode: "history",
    base: process.env.BASE_URL,
    routes,
    scrollBehavior(to, from, savedPosition) {
        if (savedPosition) {
            return savedPosition
        } else {
            // 如果不是通过上述行为切换组件，就会让页面回到顶部
            return {x: 0, y: 0}
        }
    },
})


export default router
