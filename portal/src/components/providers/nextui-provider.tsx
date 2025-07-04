"use client"
import {NextUIProvider} from '@nextui-org/react'

export function NextuiProvider({children}: { children: React.ReactNode }) {
  return <NextUIProvider>{children}</NextUIProvider>;
}
