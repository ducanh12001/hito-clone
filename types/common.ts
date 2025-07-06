import { StaticImageData } from 'next/image';
import { IconProps } from '@/types/icon';

export type ActionResult<TData = undefined> =
  | { success: true; data?: TData }
  | { success: false; errors: Record<string, string> }
  | null
  | undefined;

export interface TabOption<T extends string = string> {
  id: T;
  label: string;
  icon: IconType;
}

export interface PathTabOption<T extends string = string> extends TabOption<T> {
  path: string;
}

export type IconType = React.ComponentType<IconProps>;

export type ImageType = string | StaticImageData;
