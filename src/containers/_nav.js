import React from 'react'
import CIcon from '@coreui/icons-react'

const _nav =  [
  {
    _tag: 'CSidebarNavItem',
    name: 'Dashboard',
    to: '/dashboard',
    icon: <CIcon name="cil-speedometer" customClasses="c-sidebar-nav-icon"/>,
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Charts',
    to: '/charts',
    icon: 'cil-chart-pie'
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Tables',
    to: '/base/tables',
    icon: 'cil-calculator',
  },
  // {
  //   _tag: 'CSidebarNavItem',
  //   name: 'Exchange',
  //   to: '/base/exchange',
  //   icon: 'cil-speedometer',
  // },
  {
    _tag: 'CSidebarNavItem',
    name: 'Inputs',
    to: '/base/inputs',
    icon: 'cil-puzzle',
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Wallet',
    to: '/base/wallet',
    icon: 'cil-scrubber',
  },
  // {
  //   _tag: 'CSidebarNavDropdown',
  //   name: 'Base',
  //   route: '/base',
  //   icon: 'cil-puzzle',
  //   _children: [
  //     {
  //       _tag: 'CSidebarNavItem',
  //       name: 'Breadcrumb',
  //       to: '/base/breadcrumbs',
  //     },
  //     {
  //       _tag: 'CSidebarNavItem',
  //       name: 'Cards',
  //       to: '/base/cards',
  //     },
  //     {
  //       _tag: 'CSidebarNavItem',
  //       name: 'Carousel',
  //       to: '/base/carousels',
  //     },
  //     {
  //       _tag: 'CSidebarNavItem',
  //       name: 'Collapse',
  //       to: '/base/collapses',
  //     },
  //     {
  //       _tag: 'CSidebarNavItem',
  //       name: 'Forms',
  //       to: '/base/forms',
  //     },,
  //     {
  //       _tag: 'CSidebarNavItem',
  //       name: 'Jumbotron',
  //       to: '/base/jumbotrons',
  //     },
  //     {
  //       _tag: 'CSidebarNavItem',
  //       name: 'List group',
  //       to: '/base/list-groups',
  //     },
  //     {
  //       _tag: 'CSidebarNavItem',
  //       name: 'Navs',
  //       to: '/base/navs',
  //     },
  //     {
  //       _tag: 'CSidebarNavItem',
  //       name: 'Navbars',
  //       to: '/base/navbars',
  //     },
  //     {
  //       _tag: 'CSidebarNavItem',
  //       name: 'Pagination',
  //       to: '/base/paginations',
  //     },
  //     {
  //       _tag: 'CSidebarNavItem',
  //       name: 'Popovers',
  //       to: '/base/popovers',
  //     },
  //     {
  //       _tag: 'CSidebarNavItem',
  //       name: 'Progress',
  //       to: '/base/progress-bar',
  //     },
  //     {
  //       _tag: 'CSidebarNavItem',
  //       name: 'Switches',
  //       to: '/base/switches',
  //     },
  //     {
  //       _tag: 'CSidebarNavItem',
  //       name: 'Tables',
  //       to: '/base/tables',
  //     },
  //     {
  //       _tag: 'CSidebarNavItem',
  //       name: 'Tabs',
  //       to: '/base/tabs',
  //     },
  //     {
  //       _tag: 'CSidebarNavItem',
  //       name: 'Tooltips',
  //       to: '/base/tooltips',
  //     },
  //   ],
  // },
  // {
  //   _tag: 'CSidebarNavDropdown',
  //   name: 'Notifications',
  //   route: '/notifications',
  //   icon: 'cil-bell',
  //   _children: [
  //     {
  //       _tag: 'CSidebarNavItem',
  //       name: 'Alerts',
  //       to: '/notifications/alerts',
  //     },
  //     {
  //       _tag: 'CSidebarNavItem',
  //       name: 'Badges',
  //       to: '/notifications/badges',
  //     },
  //     {
  //       _tag: 'CSidebarNavItem',
  //       name: 'Modal',
  //       to: '/notifications/modals',
  //     },
  //     {
  //       _tag: 'CSidebarNavItem',
  //       name: 'Toaster',
  //       to: '/notifications/toaster'
  //     }
  //   ]
  // },
  {
    _tag: 'CSidebarNavDivider'
  },
  
]

export default _nav
