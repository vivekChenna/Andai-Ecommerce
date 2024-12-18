'use client';

import clsx from 'clsx';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

const FooterMenuItem = ({ item }) => {
  const pathname = usePathname();
  const [active, setActive] = useState(pathname === item.path);

  useEffect(() => {
    setActive(pathname === item.path);
  }, [pathname, item.path]);

  return (
    <li>
      <Link
        href={item.path}
        className={clsx(
          'block p-2 text-lg underline-offset-4 text-black hover:underline md:inline-block md:text-sm rounded transition-all duration-300 ease-in-out',
          {
            ' text-black  dark:text-blue-700': active
          }
        )}
      >
        {item.title}
      </Link>
    </li>
  );
};

export default function FooterMenu({ menu }) {
  if (!menu.length) return null;

  return (
    <nav>
      <ul>
        {menu.map((item) => {
          return <FooterMenuItem key={item.title} item={item} />;
        })}
      </ul>
    </nav>
  );
}
