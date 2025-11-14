import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from '@headlessui/react';
import { Bars3Icon, XMarkIcon, UserCircleIcon } from '@heroicons/react/24/outline';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../store/slices/userSlice';
import { classNames } from '../utils/tailwind';

const navigation = [
  { name: 'Homepage', href: '/' },
  { name: 'Products', href: '/products' },
  { name: 'Favorite', href: '/favorites' }, 
];


export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const loggedIn = useSelector((state) => state.user.loggedIn);

  const isActive = (href) => location.pathname === href;

  const handleAuthClick = () => {
    if (loggedIn) {
      dispatch(logout());
      navigate('/');
    } else {
      navigate('/login');
    }
  };

  return (
    <Disclosure as="nav" className="relative bg-white border-b border-emerald-100 shadow-sm">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          {/* Mobile menu button */}
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            <DisclosureButton className="group inline-flex items-center justify-center rounded-md p-2 text-emerald-700 hover:bg-emerald-50 hover:text-emerald-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400">
              <span className="sr-only">Open main menu</span>
              <Bars3Icon aria-hidden="true" className="block size-6 group-data-open:hidden" />
              <XMarkIcon aria-hidden="true" className="hidden size-6 group-data-open:block" />
            </DisclosureButton>
          </div>

          {/* Logo + nav links */}
          <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
            {/* Logo */}
            <div className="flex shrink-0 items-center">
              <div className="inline-flex items-center rounded-full bg-emerald-100 px-3 py-1">
                <span className="text-lg mr-1.5">💊</span>
                <span className="text-sm font-semibold text-emerald-800">PharmaStore</span>
              </div>
            </div>

            {/* Desktop nav */}
            <div className="hidden sm:ml-6 sm:block">
              <div className="flex space-x-2">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    aria-current={isActive(item.href) ? 'page' : undefined}
                    className={classNames(
                      isActive(item.href)
                        ? 'bg-emerald-100 text-emerald-800'
                        : 'text-slate-600 hover:bg-emerald-50 hover:text-emerald-800',
                      'rounded-md px-3 py-2 text-sm font-medium transition-colors',
                    )}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Profile menu */}
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            <Menu as="div" className="relative ml-3">
              <MenuButton className="relative flex rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:ring-offset-2 focus-visible:ring-offset-white">
                <span className="sr-only">Open user menu</span>
                <UserCircleIcon className="size-9 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200" />
              </MenuButton>

              <MenuItems
                transition
                className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black/5 focus:outline-none data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in"
              >
                <MenuItem>
                  <span className="block px-4 py-2 text-sm text-slate-500">
                    {loggedIn ? 'Autentificat' : 'Vizitator'}
                  </span>
                </MenuItem>
                <MenuItem>
                  <button
                    onClick={handleAuthClick}
                    className="block w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-emerald-50 data-focus:bg-emerald-50 data-focus:outline-hidden"
                  >
                    {loggedIn ? 'Delogare' : 'Autentificare'}
                  </button>
                </MenuItem>
              </MenuItems>
            </Menu>
          </div>
        </div>
      </div>

      {/* Mobile nav */}
      <DisclosurePanel className="sm:hidden border-t border-emerald-100 bg-white">
        <div className="space-y-1 px-2 pt-2 pb-3">
          {navigation.map((item) => (
            <DisclosureButton
              key={item.name}
              as={Link}
              to={item.href}
              aria-current={isActive(item.href) ? 'page' : undefined}
              className={classNames(
                isActive(item.href)
                  ? 'bg-emerald-100 text-emerald-800'
                  : 'text-slate-600 hover:bg-emerald-50 hover:text-emerald-800',
                'block rounded-md px-3 py-2 text-base font-medium',
              )}
            >
              {item.name}
            </DisclosureButton>
          ))}
        </div>
      </DisclosurePanel>
    </Disclosure>
  );
}
