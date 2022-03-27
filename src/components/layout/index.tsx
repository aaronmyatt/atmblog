/* https://tailwindui.com/components/application-ui/application-shells/stacked */

import * as React from "react";
import { Disclosure } from "@headlessui/react";
import { MenuIcon, XIcon } from "@heroicons/react/outline";
import { Link } from "gatsby";
import tw from "tailwind-styled-components";

const navigation = [
  { name: "Articles", href: "/" },
  { name: "About", href: "/about" },
];

const matchPath = (path: string) =>
  location.href.split("?").slice(0, 1).join("").endsWith(path);

const MobileNavLink = tw(Link)`
    ${(p) => (p.$active ? "bg-slate-800 text-white" : "text-slate-600")} 
    block px-3 py-2 rounded-md text-sm font-medium hover:bg-slate-700 hover:text-white
`;

const DesktopNavLink = tw(Link)`
    ${(p) => (p.$active ? "bg-slate-800 text-white" : "text-slate-600")}
    px-3 py-2 rounded-md text-base font-medium hover:bg-slate-700 hover:text-white
`;

function Layout({ children }) {
  const isSSR = typeof window === "undefined";

  return (
    <>
      <div className="min-h-full">
        <Disclosure as="nav" className="bg-slate-200">
          {({ open }) => (
            <>
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <Link to="/">
                        <span className="text-slate-600 border border-slate-500 p-2 font-bold text-xl">
                          ATM.
                        </span>
                      </Link>
                    </div>
                    <div className="hidden md:block">
                      <div className="ml-10 flex items-baseline space-x-4">
                        {navigation.map((item) => (
                          <DesktopNavLink
                            key={item.name}
                            to={item.href}
                            $active={!isSSR && matchPath(item.href)}
                            aria-current={
                              !isSSR &&
                              (matchPath(item.href) ? "page" : undefined)
                            }
                          >
                            {item.name}
                          </DesktopNavLink>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="-mr-2 flex md:hidden">
                    {/* Mobile menu button */}
                    <Disclosure.Button className="bg-slate-700 inline-flex items-center justify-center p-2 rounded-md text-slate-200 hover:text-white hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-800 focus:ring-white">
                      <span className="sr-only">Open main menu</span>
                      {open ? (
                        <XIcon className="block h-6 w-6" aria-hidden="true" />
                      ) : (
                        <MenuIcon
                          className="block h-6 w-6"
                          aria-hidden="true"
                        />
                      )}
                    </Disclosure.Button>
                  </div>
                </div>
              </div>

              <Disclosure.Panel className="md:hidden">
                <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                  {navigation.map((item) => (
                    <Disclosure.Button
                      as={MobileNavLink}
                      key={item.name}
                      to={item.href}
                      $active={!isSSR && matchPath(item.href)}
                      aria-current={
                        !isSSR && (matchPath(item.href) ? "page" : undefined)
                      }
                    >
                      {item.name}
                    </Disclosure.Button>
                  ))}
                </div>
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>

        <header className="bg-white shadow">
          <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold text-slate-900 capitalize">
              {(!isSSR && location.pathname.replace("/", "")) || "Articles"}
            </h1>
          </div>
        </header>
        <main>
          <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
            {children}
          </div>
        </main>
      </div>
    </>
  );
}

export default Layout;
