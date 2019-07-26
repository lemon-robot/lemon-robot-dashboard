const mainChildren = [
  {
    path: 'dispatcher-manager',
    component: () => import('@/views/main/functions/dispatcher-manager/DispatcherManager.vue'),
    name: 'dispatcher_manager'
  },
  {
    path: 'environment-manager',
    component: () => import('@/views/main/functions/environment-manager/EnvironmentManager.vue'),
    name: 'environment_manager'
  },
  {
    path: 'task-manager',
    component: () => import('@/views/main/functions/task-manager/TaskManager.vue'),
    name: 'task_manager'
  },
  {
    path: 'plan-manager',
    component: () => import('@/views/main/functions/plan-manager/PlanManager.vue'),
    name: 'plan_manager'
  },
  {
    path: 'user-manager',
    component: () => import('@/views/main/functions/user-manager/UserManager.vue'),
    name: 'user_manager'
  },
  {
    path: 'system-settiings',
    component: () => import('@/views/main/functions/system-settings/SystemSettings.vue'),
    name: 'system_settings'
  }
]

export default {
  path: '/',
  component: () => import('@/views/main/Main.vue'),
  name: 'main',
  redirect: mainChildren[0].path,
  children: mainChildren
}
