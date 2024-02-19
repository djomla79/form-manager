import React from 'react';

export type MenuItem = {
  id: number;
  label: string;
  link: string;
};

export type ActiveMenu = {
  id: number;
  label: string;
  icon: React.ForwardRefExoticComponent<
    Omit<React.SVGProps<SVGSVGElement>, 'ref'> & {
      title?: string | undefined;
      titleId?: string | undefined;
    } & React.RefAttributes<SVGSVGElement>
  >;
  link: string;
};
