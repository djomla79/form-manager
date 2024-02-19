'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import classNames from 'classnames';
import { signIn, signOut, useSession } from 'next-auth/react';
import { usePathname, useRouter } from 'next/navigation';
import {
  UserPlusIcon,
  PhotoIcon,
  ChevronDoubleLeftIcon,
  ArrowRightEndOnRectangleIcon,
  ArrowLeftStartOnRectangleIcon,
} from '@heroicons/react/20/solid';
import { MenuItem, ActiveMenu } from '@/lib/types/sidebar-types';
import { MENU_ITEMS } from '@/lib/constants/sidebar';
import { Divider } from '@nextui-org/react';

const Sidebar = () => {
  const [toggleCollapse, setToggleCollapse] = useState(false);
  const [isCollapsible, setIsCollapsible] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const { status } = useSession();

  const activeMenu: ActiveMenu | undefined = useMemo(
    () => MENU_ITEMS.find(({ link }) => link === pathname),
    [pathname]
  );

  const wrapperClasses = classNames(
    'px-4 pt-8 pb-4 bg-primary-100 flex justify-between flex-col',
    { ['w-80']: !toggleCollapse, ['w-20']: toggleCollapse }
  );

  const collapseIconClasses = classNames(
    'p-4 rounded bg-light-lighter absolute right-0',
    { 'rotate-180': toggleCollapse }
  );

  const getNavItemClasses = (menu: MenuItem) => {
    return classNames(
      'flex items-center cursor-pointer hover:bg-primary-50 rounded w-full overflow-hidden whitespace-nowrap',
      { ['bg-primary-50']: activeMenu?.id === menu.id }
    );
  };

  const onMouseOver = () => {
    setIsCollapsible(!isCollapsible);
  };

  const handleSidebarToggle = () => {
    setToggleCollapse(!toggleCollapse);
  };

  return (
    <div
      className={wrapperClasses}
      onMouseEnter={onMouseOver}
      onMouseLeave={onMouseOver}
      style={{ transition: 'width 300ms cubic-bezier(0.2, 0, 0, 1) 0s' }}
    >
      <div className='flex flex-col'>
        <div className='flex items-center justify-between relative pl-3'>
          <div className='flex items-center pl-1 gap-4'>
            <PhotoIcon className='w-8' />
            <span
              className={classNames('text-lg font-medium text-text p-2', {
                hidden: toggleCollapse,
              })}
            >
              Logo Firme
            </span>
          </div>
          {isCollapsible && (
            <button
              className={collapseIconClasses}
              onClick={handleSidebarToggle}
            >
              <ChevronDoubleLeftIcon className='w-5' />
            </button>
          )}
        </div>
        <Divider />
        {status === 'authenticated' ? (
          <div className='flex flex-col items-start mt-6 px-3'>
            {MENU_ITEMS.map(({ icon: Icon, ...rest }, index) => {
              const { link, label } = rest;
              const classes = getNavItemClasses(rest);
              return (
                <div key={index} className={classes}>
                  <Link
                    className='flex p-1 items-center w-full h-full'
                    href={link}
                  >
                    <div className='w-5 mr-1'>
                      <Icon />
                    </div>
                    {!toggleCollapse && (
                      <span
                        className={classNames(
                          'text-md font-medium text-text-light'
                        )}
                      >
                        {label}
                      </span>
                    )}
                  </Link>
                </div>
              );
            })}
          </div>
        ) : (
          <>
            <div className='pt-2'>
              <Link
                className='flex px-3 mt-3 items-center w-full h-full'
                href='/auth/register'
              >
                <div className='w-5 mr-1'>
                  <UserPlusIcon className='w-5' />
                </div>
                {!toggleCollapse && (
                  <span
                    className={classNames(
                      'text-md font-medium text-text-light'
                    )}
                  >
                    Register
                  </span>
                )}
              </Link>
            </div>
            <div
              className='flex px-3 mt-3 items-center w-full h-full cursor-pointer'
              onClick={() => signIn()}
            >
              <div className='w-5 mr-1'>
                <ArrowRightEndOnRectangleIcon className='w-5' />
              </div>
              {!toggleCollapse && (
                <span
                  className={classNames('text-md font-medium text-text-light')}
                >
                  Login
                </span>
              )}
            </div>
          </>
        )}
      </div>

      <div
        className={`${getNavItemClasses({
          id: 0,
          label: '',
          link: '',
        })} px-3 py-4`}
      ></div>
      {status === 'authenticated' && (
        <div
          className='flex px-3 items-end w-full h-full cursor-pointer'
          onClick={() => {
            signOut({ redirect: false }).then(() => {
              router.push('/auth/login');
            });
          }}
        >
          <div className='w-5 mr-1'>
            <ArrowLeftStartOnRectangleIcon className='w-5' />
          </div>
          {!toggleCollapse && (
            <span className={classNames('text-md font-medium text-text-light')}>
              Logout
            </span>
          )}
        </div>
      )}
    </div>
  );
};

export default Sidebar;
