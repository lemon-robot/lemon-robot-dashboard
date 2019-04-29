export default {
  path: '/',
  component: () => import('@/views/main/Main'),
  name: 'main',
  children: [
    {
      path: 'dispatcher-manager',
      component: () => import('@/views/main/functions/dispatcher-manager/DispatcherManager'),
      name: 'dispatcher_manager'
    },
    {
      path: 'user-manager',
      component: () => import('@/views/main/functions/user-manager/UserManager'),
      name: 'user_manager'
    }
  ]
}
