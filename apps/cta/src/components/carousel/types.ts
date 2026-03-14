import { ElementType, ReactNode } from "react";

export interface SlideData {
  id: number;
  icon: ElementType;
  headline: string;
  subline: string;
  body: ReactNode | null;
}
