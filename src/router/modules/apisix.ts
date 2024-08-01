import { shallowRef } from 'vue';

import apisixSvg from '@/assets/apisix_svg.svg?component';
import Layout from '@/layouts/index.vue';

export default [
  {
    path: '/apisix',
    component: Layout,
    redirect: '/apisix/route',
    name: 'apisix',
    meta: {
      title: {
        zh_CN: 'APISIX',
        en_US: 'APISIX',
      },
      icon: shallowRef(apisixSvg),
      orderNo: 0,
    },
    children: [
      {
        path: 'route',
        name: 'ApisixRoute',
        component: () => import('@/pages/apisix/route/index.vue'),
        meta: {
          title: {
            zh_CN: '路由',
            en_US: 'Route',
          },
        },
      },
      {
        path: 'route/edit',
        name: 'ApisixRouteEdit',
        component: () => import('@/pages/apisix/route/edit/index.vue'),
        meta: {
          title: {
            zh_CN: '编辑路由',
            en_US: 'Edit Route',
          },
          hidden: true,
        },
      },
    ],
  },
];
