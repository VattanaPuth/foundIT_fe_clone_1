import type React from "react";
import { IconBell } from "@/app/components/styles/admin/Icon";
import { ImCoinDollar } from "react-icons/im";
import { IconMessage } from "../application/icons";


// example: replace with your actual svg component imports


export type NotificationType =
  | "contract"
  | "application"
  | "payment"
  | "review"
  | "milestone"
  | "invite"
  | "message"
  | "offer"
  | "proposal"
  | "project";

export type NotificationItem = {
  id: string;
  type: NotificationType;
  title: string;
  description?: string;
  meta?: string;
  timeAgo: string;
  isUnread: boolean;
  actionLabel?: string;
  actionRoute?: string;
  tags?: string[];
  amountTag?: string;

  // ✅ for seller/profile rows
  avatarSrc?: string; // leave "" for now, you can paste later
  avatarAlt?: string;
};


export function handleKeyboardActivate(
  e: React.KeyboardEvent,
  onActivate: () => void
) {
  if (e.key === "Enter" || e.key === " ") {
    e.preventDefault();
    onActivate();
  }
}

export function getTypeIcon(
  type: NotificationType,
  variant: "client" | "seller" = "client"
): { bg: string; icon: React.ReactNode;} {
  switch (type) {
    case "contract":
      return {
        bg: "bg-green-100",
       icon: (
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M14.5331 6.66764C14.8376 8.16183 14.6206 9.71525 13.9183 11.0688C13.2161 12.4224 12.071 13.4943 10.6741 14.1058C9.27718 14.7174 7.71284 14.8315 6.24196 14.4292C4.77107 14.0269 3.48255 13.1326 2.59127 11.8952C1.7 10.6579 1.25984 9.15246 1.3442 7.62989C1.42856 6.10733 2.03234 4.6597 3.05486 3.52842C4.07737 2.39714 5.45681 1.65059 6.96313 1.41327C8.46946 1.17595 10.0116 1.46221 11.3324 2.2243" stroke="#00A63E" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M6 7.33464L8 9.33464L14.6667 2.66797" stroke="#00A63E" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
</svg>

        ),
      };

    case "application":
      return {
        bg: "bg-blue-100",
        icon:(<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_1565_36581)">
<path d="M6.8457 14C6.96273 14.2027 7.13105 14.371 7.33373 14.488C7.53642 14.605 7.76633 14.6666 8.00037 14.6666C8.23441 14.6666 8.46432 14.605 8.66701 14.488C8.86969 14.371 9.03801 14.2027 9.15504 14" stroke="#155DFC" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M2.17418 10.216C2.08709 10.3115 2.02962 10.4302 2.00875 10.5577C1.98788 10.6852 2.00453 10.8161 2.05665 10.9343C2.10878 11.0525 2.19414 11.1531 2.30235 11.2237C2.41056 11.2943 2.53697 11.3319 2.66618 11.332H13.3328C13.462 11.3321 13.5885 11.2946 13.6968 11.2241C13.805 11.1536 13.8905 11.0532 13.9428 10.935C13.995 10.8169 14.0118 10.6861 13.9911 10.5586C13.9704 10.431 13.9131 10.3123 13.8262 10.2167C12.9395 9.3027 11.9995 8.33136 11.9995 5.33203C11.9995 4.27117 11.5781 3.25375 10.8279 2.5036C10.0778 1.75346 9.06038 1.33203 7.99951 1.33203C6.93865 1.33203 5.92123 1.75346 5.17109 2.5036C4.42094 3.25375 3.99951 4.27117 3.99951 5.33203C3.99951 8.33136 3.05885 9.3027 2.17418 10.216Z" stroke="#155DFC" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
</g>
<defs>
<clipPath id="clip0_1565_36581">
<rect width="16" height="16" fill="white"/>
</clipPath>
</defs>
</svg>
),
      };

    case "payment":
      return {
        bg: "bg-green-100",
        icon: <ImCoinDollar className="h-4 w-4 text-green-700" />,
      };

    case "review":
      return {
        bg: "bg-blue-100",
        icon: (<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_1565_36581)">
<path d="M6.8457 14C6.96273 14.2027 7.13105 14.371 7.33373 14.488C7.53642 14.605 7.76633 14.6666 8.00037 14.6666C8.23441 14.6666 8.46432 14.605 8.66701 14.488C8.86969 14.371 9.03801 14.2027 9.15504 14" stroke="#155DFC" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M2.17418 10.216C2.08709 10.3115 2.02962 10.4302 2.00875 10.5577C1.98788 10.6852 2.00453 10.8161 2.05665 10.9343C2.10878 11.0525 2.19414 11.1531 2.30235 11.2237C2.41056 11.2943 2.53697 11.3319 2.66618 11.332H13.3328C13.462 11.3321 13.5885 11.2946 13.6968 11.2241C13.805 11.1536 13.8905 11.0532 13.9428 10.935C13.995 10.8169 14.0118 10.6861 13.9911 10.5586C13.9704 10.431 13.9131 10.3123 13.8262 10.2167C12.9395 9.3027 11.9995 8.33136 11.9995 5.33203C11.9995 4.27117 11.5781 3.25375 10.8279 2.5036C10.0778 1.75346 9.06038 1.33203 7.99951 1.33203C6.93865 1.33203 5.92123 1.75346 5.17109 2.5036C4.42094 3.25375 3.99951 4.27117 3.99951 5.33203C3.99951 8.33136 3.05885 9.3027 2.17418 10.216Z" stroke="#155DFC" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
</g>
<defs>
<clipPath id="clip0_1565_36581">
<rect width="16" height="16" fill="white"/>
</clipPath>
</defs>
</svg>
),
      };

    case "milestone":
      return {
        bg: "bg-blue-100",
        icon: (<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_1565_36581)">
<path d="M6.8457 14C6.96273 14.2027 7.13105 14.371 7.33373 14.488C7.53642 14.605 7.76633 14.6666 8.00037 14.6666C8.23441 14.6666 8.46432 14.605 8.66701 14.488C8.86969 14.371 9.03801 14.2027 9.15504 14" stroke="#155DFC" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M2.17418 10.216C2.08709 10.3115 2.02962 10.4302 2.00875 10.5577C1.98788 10.6852 2.00453 10.8161 2.05665 10.9343C2.10878 11.0525 2.19414 11.1531 2.30235 11.2237C2.41056 11.2943 2.53697 11.3319 2.66618 11.332H13.3328C13.462 11.3321 13.5885 11.2946 13.6968 11.2241C13.805 11.1536 13.8905 11.0532 13.9428 10.935C13.995 10.8169 14.0118 10.6861 13.9911 10.5586C13.9704 10.431 13.9131 10.3123 13.8262 10.2167C12.9395 9.3027 11.9995 8.33136 11.9995 5.33203C11.9995 4.27117 11.5781 3.25375 10.8279 2.5036C10.0778 1.75346 9.06038 1.33203 7.99951 1.33203C6.93865 1.33203 5.92123 1.75346 5.17109 2.5036C4.42094 3.25375 3.99951 4.27117 3.99951 5.33203C3.99951 8.33136 3.05885 9.3027 2.17418 10.216Z" stroke="#155DFC" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
</g>
<defs>
<clipPath id="clip0_1565_36581">
<rect width="16" height="16" fill="white"/>
</clipPath>
</defs>
</svg>
),
      };

    case "invite":
      return {
        bg: "bg-blue-100",
        icon: (<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_1565_36581)">
<path d="M6.8457 14C6.96273 14.2027 7.13105 14.371 7.33373 14.488C7.53642 14.605 7.76633 14.6666 8.00037 14.6666C8.23441 14.6666 8.46432 14.605 8.66701 14.488C8.86969 14.371 9.03801 14.2027 9.15504 14" stroke="#155DFC" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M2.17418 10.216C2.08709 10.3115 2.02962 10.4302 2.00875 10.5577C1.98788 10.6852 2.00453 10.8161 2.05665 10.9343C2.10878 11.0525 2.19414 11.1531 2.30235 11.2237C2.41056 11.2943 2.53697 11.3319 2.66618 11.332H13.3328C13.462 11.3321 13.5885 11.2946 13.6968 11.2241C13.805 11.1536 13.8905 11.0532 13.9428 10.935C13.995 10.8169 14.0118 10.6861 13.9911 10.5586C13.9704 10.431 13.9131 10.3123 13.8262 10.2167C12.9395 9.3027 11.9995 8.33136 11.9995 5.33203C11.9995 4.27117 11.5781 3.25375 10.8279 2.5036C10.0778 1.75346 9.06038 1.33203 7.99951 1.33203C6.93865 1.33203 5.92123 1.75346 5.17109 2.5036C4.42094 3.25375 3.99951 4.27117 3.99951 5.33203C3.99951 8.33136 3.05885 9.3027 2.17418 10.216Z" stroke="#155DFC" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
</g>
<defs>
<clipPath id="clip0_1565_36581">
<rect width="16" height="16" fill="white"/>
</clipPath>
</defs>
</svg>
),
      };

    case "message":
      return {
        bg: "bg-blue-100",
        icon: (<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_1565_36676)">
<path d="M14.6673 11.3333C14.6673 11.687 14.5268 12.0261 14.2768 12.2761C14.0267 12.5262 13.6876 12.6667 13.334 12.6667H4.55265C4.19906 12.6667 3.85997 12.8073 3.60998 13.0573L2.14198 14.5253C2.07579 14.5915 1.99145 14.6366 1.89964 14.6548C1.80783 14.6731 1.71267 14.6637 1.62619 14.6279C1.53971 14.5921 1.46579 14.5314 1.41377 14.4536C1.36176 14.3758 1.334 14.2843 1.33398 14.1907V3.33333C1.33398 2.97971 1.47446 2.64057 1.72451 2.39052C1.97456 2.14048 2.3137 2 2.66732 2H13.334C13.6876 2 14.0267 2.14048 14.2768 2.39052C14.5268 2.64057 14.6673 2.97971 14.6673 3.33333V11.3333Z" stroke="#155DFC" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
</g>
<defs>
<clipPath id="clip0_1565_36676">
<rect width="16" height="16" fill="white"/>
</clipPath>
</defs>
</svg>
),
        
      };

    case "offer":
      if (variant === "seller") {
        return {
          bg: "bg-orange-100",
          icon: (<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_2381_24360)">
<path d="M8 1.33203V14.6654" stroke="#E17100" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M11.3333 3.33203H6.33333C5.71449 3.33203 5.121 3.57786 4.68342 4.01545C4.24583 4.45303 4 5.04653 4 5.66536C4 6.2842 4.24583 6.8777 4.68342 7.31528C5.121 7.75286 5.71449 7.9987 6.33333 7.9987H9.66667C10.2855 7.9987 10.879 8.24453 11.3166 8.68212C11.7542 9.1197 12 9.71319 12 10.332C12 10.9509 11.7542 11.5444 11.3166 11.9819C10.879 12.4195 10.2855 12.6654 9.66667 12.6654H4" stroke="#E17100" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
</g>
<defs>
<clipPath id="clip0_2381_24360">
<rect width="16" height="16" fill="white"/>
</clipPath>
</defs>
</svg>
),
        };
      }
      return {
        bg: "bg-green-100",
        icon: (<svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M0 16C0 7.16344 7.16344 0 16 0C24.8366 0 32 7.16344 32 16C32 24.8366 24.8366 32 16 32C7.16344 32 0 24.8366 0 16Z" fill="#D0FAE5"/>
<path d="M22.6673 12.668L16.6733 16.486C16.4699 16.6041 16.2389 16.6663 16.0037 16.6663C15.7684 16.6663 15.5374 16.6041 15.334 16.486L9.33398 12.668" stroke="#009966" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M21.334 10.668H10.6673C9.93094 10.668 9.33398 11.2649 9.33398 12.0013V20.0013C9.33398 20.7377 9.93094 21.3346 10.6673 21.3346H21.334C22.0704 21.3346 22.6673 20.7377 22.6673 20.0013V12.0013C22.6673 11.2649 22.0704 10.668 21.334 10.668Z" stroke="#009966" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
),
      };

    case "proposal":
      return {
        bg: "bg-blue-100",
        icon: (<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M10.6673 13.332V2.66536C10.6673 2.31174 10.5268 1.9726 10.2768 1.72256C10.0267 1.47251 9.68761 1.33203 9.33398 1.33203H6.66732C6.3137 1.33203 5.97456 1.47251 5.72451 1.72256C5.47446 1.9726 5.33398 2.31174 5.33398 2.66536V13.332" stroke="#155DFC" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M13.334 4H2.66732C1.93094 4 1.33398 4.59695 1.33398 5.33333V12C1.33398 12.7364 1.93094 13.3333 2.66732 13.3333H13.334C14.0704 13.3333 14.6673 12.7364 14.6673 12V5.33333C14.6673 4.59695 14.0704 4 13.334 4Z" stroke="#155DFC" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
),
      };

    case "project":
    default:
      return {
        bg: "bg-blue-100",
        icon: (<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_1565_36728)">
<path d="M8 1.33203V14.6654" stroke="#00A63E" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M11.3333 3.33203H6.33333C5.71449 3.33203 5.121 3.57786 4.68342 4.01545C4.24583 4.45303 4 5.04653 4 5.66536C4 6.2842 4.24583 6.8777 4.68342 7.31528C5.121 7.75286 5.71449 7.9987 6.33333 7.9987H9.66667C10.2855 7.9987 10.879 8.24453 11.3166 8.68212C11.7542 9.1197 12 9.71319 12 10.332C12 10.9509 11.7542 11.5444 11.3166 11.9819C10.879 12.4195 10.2855 12.6654 9.66667 12.6654H4" stroke="#00A63E" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
</g>
<defs>
<clipPath id="clip0_1565_36728">
<rect width="16" height="16" fill="white"/>
</clipPath>
</defs>
</svg>
),
      };
  }
}

