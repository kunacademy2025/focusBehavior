"use server";

import { ComponentType } from "react";
import dynamic from "next/dynamic";

import { getStrapiData } from "@/utils/";
import { DynamicZoneModel } from "@/models/dynamic.model";

const loadComponent = (componentName: string) => {
  try {
    const Component: ComponentType<{ options: any }> = dynamic(() =>
      import(`@/components/dynamic/${componentName}`).then((mod) => mod.default)
    );
    return Component;
  } catch (error) {
    console.log(`Failed to load component ${componentName}:`, error);
    const FallbackComponent = () => (
      <div>Component failed to load: {componentName}</div>
    );
    FallbackComponent.displayName = "FallbackComponent";
    return FallbackComponent;
  }
};

export async function DynamicZoneComponent({
  content,
}: {
  content: DynamicZoneModel[];
}) {
  const getComponentName = (component: string) => component.split(".")[1];

  return (
    content?.length > 0 &&
    (await Promise.all(
      content?.map((item: any, index: number) => {
        const { __component } = getStrapiData(item);
        const componentName = getComponentName(__component);

        const Component: ComponentType<{ options: any }> =
          loadComponent(componentName);

        return (
          <div key={index}>
            <Component options={item} />
          </div>
        );
      })
    ))
  );
}
