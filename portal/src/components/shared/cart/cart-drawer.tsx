"use client";

import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { FaRegTrashAlt } from "react-icons/fa";
import { Button } from "@nextui-org/react";
import { CustomImage } from "@/components/controls";

const products = [
  {
    id: 1,
    name: "Cash Flow & Budgeting For Smes And Startups",
    href: "#",
    price: "1500",
    quantity: 1,
  },
  {
    id: 2,
    name: "Leadership And Team Building",
    href: "#",
    price: "1300",
    quantity: 1,
  },
  // More products...
];

export const CartDrawer = ({
  isOpen,
  setOpen,
}: {
  isOpen: boolean;
  setOpen: (open: boolean) => void;
}) => {
  return (
    <Dialog open={isOpen} onClose={setOpen} className="relative z-50">
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-black bg-opacity-60 cursor-pointer transition-opacity duration-500 ease-in-out data-[closed]:opacity-0"
      />

      <div className="fixed inset-0 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
            <DialogPanel
              transition
              className="pointer-events-auto w-screen max-w-md transform transition duration-500 ease-in-out data-[closed]:translate-x-full sm:duration-700"
            >
              <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
                  <div className="flex items-start justify-between">
                    <DialogTitle className="text-3xl text-primary">
                      Your cart
                    </DialogTitle>
                    <div className="ltr:ml-3 rtl:mr-3 flex h-7 items-center">
                      <button
                        type="button"
                        onClick={() => setOpen(false)}
                        className="relative -m-2 p-2 text-gray-400 hover:text-gray-500"
                      >
                        <span className="absolute -inset-0.5" />
                        <span className="sr-only">Close panel</span>
                        <XMarkIcon aria-hidden="true" className="h-6 w-6" />
                      </button>
                    </div>
                  </div>

                  <div className="mt-8">
                    <div className="flow-root">
                      <ul role="list" className="-my-6 ">
                        {products.map((product) => (
                          <li
                            key={product.id}
                            className="bg-veryLightGray rounded-2xl my-4 overflow-hidden"
                          >
                            <div className="relative h-24 w-full flex-shrink-0 overflow-hidden">
                              {/* <CustomImage
                                src={image}
                                alt="image"
                                width={1000}
                                height={1000}
                                className="h-full object-cover"
                              /> */}
                              <Button
                                isIconOnly
                                className="absolute top-1 right-1 bg-black bg-opacity-50 backdrop-blur-md rounded-full text-white"
                              >
                                <FaRegTrashAlt className="w-4 h-4" />
                              </Button>
                            </div>

                            <div className="my-4 px-4 flex flex-1 flex-col">
                              <h3>
                                <Link
                                  href="#"
                                  className="text-secondary text-sm hover:text-primary transition-all duration-300"
                                >
                                  {product.name}
                                </Link>
                              </h3>
                              <div className="grid grid-cols-2 gap-x-6 my-2">
                                <div className="flex flex-col">
                                  <span className="text-sm text-primary">
                                    Dates
                                  </span>
                                  <ul className="text-sm text-mediumGray list-none whitespace-nowrap">
                                    <li>Mon, May 31, 2024</li>
                                    <li>Tue, Jun 1, 2024</li>
                                  </ul>
                                </div>
                                <div className="grid grid-cols-2 gap-x-6 my-2">
                                  <div className="flex flex-col">
                                    <span className="text-sm text-primary">
                                      Times
                                    </span>
                                    <ul className="text-sm text-mediumGray list-none whitespace-nowrap">
                                      <li>2:00 pm - 3:00 pm</li>
                                    </ul>
                                  </div>
                                </div>
                              </div>
                              <div className="flex items-center justify-between text-primary">
                                <span>
                                  <Link href="#" className="text-sm underline">
                                    Learn more
                                  </Link>
                                </span>
                                <span className="text-lg">
                                  AED {product.price}
                                </span>
                              </div>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="border-t border-gray-200 px-4 py-4 sm:px-6">
                  <div className="flex flex-col gap-y-2 text-base">
                    <div className="flex justify-between">
                      <p className="text-primary">Subtotal</p>
                      <p className="text-secondary">AED 2800.00</p>
                    </div>
                    <div className="flex justify-between">
                      <p className="text-primary">Tax</p>
                      <p className="text-secondary">AED 150.00</p>
                    </div>
                  </div>
                </div>
                <div className="border-t border-gray-200 px-4 py-4 sm:px-6">
                  <div className="flex justify-between text-base">
                    <p className="text-secondary text-xl font-black">
                      Grand Total
                    </p>
                    <p className="text-secondary">AED 2950.00</p>
                  </div>
                </div>
                <div className="flex items gap-x-4  px-4 py-6 sm:px-6">
                  <Button className="bg-secondary text-white w-full rounded-lg">
                    Clear cart
                  </Button>
                  <Button
                    className="bg-primary text-white w-full rounded-lg"
                    onClick={() => setOpen(false)}
                  >
                    Checkout
                  </Button>
                </div>
              </div>
            </DialogPanel>
          </div>
        </div>
      </div>
    </Dialog>
  );
};
