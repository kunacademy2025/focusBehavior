import {
  Disclosure,
  DisclosureButton,
  Transition,
  DisclosurePanel,
} from "@headlessui/react";
import { MinusIcon, PlusIcon } from "@heroicons/react/24/outline";
import { RenderIcon } from ".";
import { cn } from "@/utils";
import { SingleMenuItem } from "./single-menu-item";

export const DisclosureMenu = ({ subItem }: any) => (
  <Disclosure>
    {({ open }) => (
      <div
        className={cn(
          "flex flex-col transition-all duration-300",
          open ? "bg-veryLightGray rounded-xl" : "bg-white"
        )}
      >
        <DisclosureButton className="group relative flex justify-between items-center gap-x-1 p-2 text-sm font-medium transition-all duration-300 hover:bg-veryLightGray">
          <div className="flex items-center gap-x-2">
            {subItem.icon && <RenderIcon icon={subItem.icon} />}
            {subItem.title}
          </div>
          {open ? (
            <MinusIcon className="w-5 h-5" />
          ) : (
            <PlusIcon className="w-5 h-5" />
          )}
        </DisclosureButton>
        <Transition
          show={open}
          enter="transition ease-out duration-300"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-200"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <DisclosurePanel>
            {subItem.subLinks.map((option: any, idx: number) => (
              <SingleMenuItem key={idx} subItem={option} />
            ))}
          </DisclosurePanel>
        </Transition>
      </div>
    )}
  </Disclosure>
);
