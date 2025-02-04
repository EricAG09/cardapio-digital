import React, { useState } from 'react';
import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/react';
import { Bars3Icon, ShoppingCartIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { useCart } from '../../context/cartContext'; // Importando o contexto do carrinho
import Cart from '../carrinho/cart'; // Importando o componente Cart


const navigation = [
  { name: 'Home', href: '/', current: true },
  { name: 'Menu', href: '/menu', current: false },
  { name: 'Sobre', href: '/sobre', current: false },
  { name: 'Contato', href: '/contato', current: false },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

const Navbar = () => {
  const { cart } = useCart(); // Obtendo o estado do carrinho
  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0); // Calculando o total de itens
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
        <>
            <Disclosure as="nav" className="bg-fuchsia-500">
                <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
                    <div className="relative flex h-16 items-center justify-between">
                        <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                            <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                                <span className="sr-only">Abrir menu</span>
                                <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                                <XMarkIcon className="hidden h-6 w-6" aria-hidden="true" />
                            </DisclosureButton>
                        </div>
                        <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                            <div className="flex shrink-0 items-center">
                                <img
                                    alt="Your Company"
                                    src="https://tailwindui.com/plus/img/logos/mark.svg?color=indigo&shade=500"
                                    className="h-8 w-auto"
                                />
                            </div>
                            <div className="hidden sm:ml-6 sm:block">
                                <div className="flex space-x-4">
                                    {navigation.map((item) => (
                                        <a
                                            key={item.name}
                                            href={item.href}
                                            aria-current={item.current ? 'page' : undefined}
                                            className={classNames(
                                                item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                                                'rounded-md px-3 py-2 text-sm font-medium',
                                            )}
                                        >
                                            {item.name}
                                        </a>
                                    ))}
                                </div>
                            </div>
                        </div>
                        <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                            <button
                                type="button"
                                onClick={openModal}
                                className="relative rounded-md p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                            >
                                <span className="sr-only">Ver carrinho</span>
                                <ShoppingCartIcon className="h-6 w-6" aria-hidden="true" />
                                {totalItems > 0 && (
                                    <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-600 text-xs text-white">
                                        {totalItems}
                                    </span>
                                )}
                            </button>

                            {/* Modal */}
                            <Cart isOpen={isModalOpen} onClose={closeModal} />
                        </div>
                    </div>
                </div>

                <div className="sm:hidden">
                    <DisclosurePanel className="space-y-1 px-2 pb-3 pt-2">
                        {navigation.map((item) => (
                            <DisclosureButton key={item.name} as="a" href={item.href} className={classNames(
                                item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                                'block rounded-md px-3 py-2 text-base font-medium'
                            )}>
                                {item.name}
                            </DisclosureButton>
                        ))}
                    </DisclosurePanel>
                </div>
            </Disclosure>
        </>
    );
};

export default Navbar;