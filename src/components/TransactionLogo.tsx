import { type SVGProps } from "react";

export const TransactionLogo = (props: SVGProps<SVGSVGElement>) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={48}
      height={48}
      fill="none"
      {...props}
    >
      <rect width={48} height={48} fill={props.color} rx={24} />
      <path
        stroke="#fff"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="m23.997 33.6 8.314-4.8v-9.6l-8.314-4.8-8.313 4.8v9.6l8.313 4.8Zm0 0v-9m0 0-7.8-4.8m7.8 4.8 7.8-4.8"
      />
    </svg>
  );
};
