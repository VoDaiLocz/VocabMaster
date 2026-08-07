import { memo } from 'react'
import { NavLink } from 'react-router-dom'
import { Home, BookOpen, FolderOpen, Settings } from 'lucide-react'

const MOBILE_NAV_ITEMS = [
  { to: '/', icon: Home, label: 'Home' },
  { to: '/learn', icon: BookOpen, label: 'Learn' },
  { to: '/decks', icon: FolderOpen, label: 'Decks' },
  { to: '/settings', icon: Settings, label: 'Settings' },
]

export const MobileNav = memo(function MobileNav() {
  return (
    <div className='md:hidden fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 flex justify-around items-center p-2 pb-safe z-50 shadow-glass backdrop-blur-md bg-white/80 dark:bg-gray-900/80'>
      {MOBILE_NAV_ITEMS.map(({ to, icon: Icon, label }) => (
        <NavLink
          key={to}
          to={to}
          className={({ isActive }) =>
            `flex flex-col items-center justify-center w-16 p-2 rounded-xl transition-all duration-300 ${
              isActive
                ? 'text-primary-600 dark:text-primary-400'
                : 'text-gray-500 hover:text-gray-900 dark:hover:text-gray-100'
            }`
          }
        >
          {({ isActive }) => (
            <>
              <Icon
                size={24}
                className={`mb-1 ${isActive ? 'stroke-[2.5px]' : 'stroke-[1.5px]'}`}
              />
              <span
                className={`text-[10px] font-medium ${isActive ? 'opacity-100' : 'opacity-70'}`}
              >
                {label}
              </span>
            </>
          )}
        </NavLink>
      ))}
    </div>
  )
})
