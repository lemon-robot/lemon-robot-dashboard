const mainChildren = [
  {
    path: 'dispatcher-manager',
    component: () => import('@/views/main/functions/dispatcher-manager/DispatcherManager'),
    name: 'dispatcher_manager'
  },
  {
    path: 'user-manager',
    component: () => import('@/views/main/functions/user-manager/UserManager'),
    name: 'user_manager'
  },
  {
    path: 'system-settiings',
    component: () => import('@/views/main/functions/system-settings/SystemSettings'),
    name: 'system_settings'
  }
]

export default {
  path: '/',
  component: () => import('@/views/main/Main'),
  name: 'main',
  redirect: mainChildren[0].path,
  children: mainChildren
}
