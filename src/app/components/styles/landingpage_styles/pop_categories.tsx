import * as React from "react";

type Icon = React.FC<React.SVGProps<SVGSVGElement>>;

type Category = {
  label: string;
  icon: Icon;
  bubbleBg: string;   
  bubbleRing: string; 
  text: string;       
};

export default function PopularCategories() {
  const items: Category[] = [
    { label: "Logo Design", icon: PaletteIcon, bubbleBg: "bg-pink-100", bubbleRing: "ring-pink-50", text: "text-pink-600" },
    { label: "Web Dev", icon: CodeIcon, bubbleBg: "bg-blue-100", bubbleRing: "ring-blue-50", text: "text-blue-600" },
    { label: "Mobile App", icon: PhoneIcon, bubbleBg: "bg-indigo-100", bubbleRing: "ring-indigo-50", text: "text-indigo-600" },
    { label: "Video", icon: VideoIcon, bubbleBg: "bg-rose-100", bubbleRing: "ring-rose-50", text: "text-rose-600" },
    { label: "3D", icon: CubeIcon, bubbleBg: "bg-orange-100", bubbleRing: "ring-orange-50", text: "text-orange-600" },
    { label: "Data", icon: DatabaseIcon, bubbleBg: "bg-cyan-100", bubbleRing: "ring-cyan-50", text: "text-cyan-600" },
    { label: "Templates", icon: TemplateIcon, bubbleBg: "bg-fuchsia-100", bubbleRing: "ring-fuchsia-50", text: "text-fuchsia-600" },

    { label: "AI", icon: NetworkIcon, bubbleBg: "bg-amber-100", bubbleRing: "ring-amber-50", text: "text-amber-600" },
    { label: "Writing", icon: DocIcon, bubbleBg: "bg-emerald-100", bubbleRing: "ring-emerald-50", text: "text-emerald-600" },
    { label: "Marketing", icon: ChartUpIcon, bubbleBg: "bg-sky-100", bubbleRing: "ring-sky-50", text: "text-sky-600" },
    { label: "Translation", icon: TranslateIcon, bubbleBg: "bg-teal-100", bubbleRing: "ring-teal-50", text: "text-teal-600" },
    { label: "UI Kits", icon: GridIcon, bubbleBg: "bg-violet-100", bubbleRing: "ring-violet-50", text: "text-violet-600" },
    { label: "SEO", icon: GlobeIcon, bubbleBg: "bg-blue-100", bubbleRing: "ring-blue-50", text: "text-blue-600" },
    { label: "Illustration", icon: PencilIcon, bubbleBg: "bg-green-100", bubbleRing: "ring-green-50", text: "text-green-600" },
  ];

  return (
    <section className="bg-white">
      <div className="w-full mt-96 pt-56
                      sm:w-full sm:px-6 sm:py-12 sm:mt-[560px] 
                      md:mx-auto md:w-full md:px-6 md:py-12 md:mt-6
                      lg:mx-auto lg:w-full lg:px-6 lg:py-12 lg:mt-6
                      xl:mx-auto xl:w-full xl:px-6 xl:py-12 xl:mt-6
      ">
        <p className="text-center text-3xl sm:text-4xl font-semibold text-gray-900">
          Popular categories
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 xl:grid-cols-7 gap-y-10 gap-x-6 mt-16">
          {items.map(({ label, icon: Icon, bubbleBg, bubbleRing, text }) => (
            <button
              key={label}
              type="button"
              className="group flex flex-col items-center text-center focus:outline-none"
            >
              <span
                className={[
                  "inline-flex h-12 w-12 items-center justify-center rounded-xl",
                  "ring-8", bubbleRing, bubbleBg, text,
                  "shadow-sm transition group-hover:scale-[1.03]"
                ].join(" ")}
                aria-hidden="true"
              >
                <Icon className="h-6 w-6" />
              </span>
              <span className="mt-3 text-sm text-gray-800">{label}</span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

const PaletteIcon: Icon = () => (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M1 11C1 16.5228 5.47715 21 11 21C12.6569 21 14 19.6569 14 18V17.5C14 17.0356 14 16.8034 14.0257 16.6084C14.2029 15.2622 15.2622 14.2029 16.6084 14.0257C16.8034 14 17.0356 14 17.5 14H18C19.6569 14 21 12.6569 21 11C21 5.47715 16.5228 1 11 1C5.47715 1 1 5.47715 1 11Z" stroke="#E60076" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M6 12C6.55228 12 7 11.5523 7 11C7 10.4477 6.55228 10 6 10C5.44772 10 5 10.4477 5 11C5 11.5523 5.44772 12 6 12Z" stroke="#E60076" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M15 8C15.5523 8 16 7.55228 16 7C16 6.44772 15.5523 6 15 6C14.4477 6 14 6.44772 14 7C14 7.55228 14.4477 8 15 8Z" stroke="#E60076" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M9 7C9.55228 7 10 6.55228 10 6C10 5.44772 9.55228 5 9 5C8.44772 5 8 5.44772 8 6C8 6.55228 8.44772 7 9 7Z" stroke="#E60076" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
);

const CodeIcon: Icon = () => (
    <svg width="18" height="12" viewBox="0 0 18 12" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M6 1L1 6L6 11M12 1L17 6L12 11" stroke="#155DFC" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
);

const PhoneIcon: Icon = () => (
    <svg width="16" height="22" viewBox="0 0 16 22" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M8 16.5H8.01M4.2 21H11.8C12.9201 21 13.4802 21 13.908 20.782C14.2843 20.5903 14.5903 20.2843 14.782 19.908C15 19.4802 15 18.9201 15 17.8V4.2C15 3.07989 15 2.51984 14.782 2.09202C14.5903 1.71569 14.2843 1.40973 13.908 1.21799C13.4802 1 12.9201 1 11.8 1H4.2C3.0799 1 2.51984 1 2.09202 1.21799C1.71569 1.40973 1.40973 1.71569 1.21799 2.09202C1 2.51984 1 3.0799 1 4.2V17.8C1 18.9201 1 19.4802 1.21799 19.908C1.40973 20.2843 1.71569 20.5903 2.09202 20.782C2.51984 21 3.07989 21 4.2 21ZM8.5 16.5C8.5 16.7761 8.27614 17 8 17C7.72386 17 7.5 16.7761 7.5 16.5C7.5 16.2239 7.72386 16 8 16C8.27614 16 8.5 16.2239 8.5 16.5Z" stroke="#9810FA" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
);

const VideoIcon: Icon = () => (
    <svg width="22" height="16" viewBox="0 0 22 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M21 4.93137C21 4.32555 21 4.02265 20.8802 3.88238C20.7763 3.76068 20.6203 3.69609 20.4608 3.70865C20.2769 3.72312 20.0627 3.93731 19.6343 4.36569L16 8L19.6343 11.6343C20.0627 12.0627 20.2769 12.2769 20.4608 12.2914C20.6203 12.3039 20.7763 12.2393 20.8802 12.1176C21 11.9774 21 11.6744 21 11.0686V4.93137Z" stroke="#E7000B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M1 5.8C1 4.11984 1 3.27976 1.32698 2.63803C1.6146 2.07354 2.07354 1.6146 2.63803 1.32698C3.27976 1 4.11984 1 5.8 1H11.2C12.8802 1 13.7202 1 14.362 1.32698C14.9265 1.6146 15.3854 2.07354 15.673 2.63803C16 3.27976 16 4.11984 16 5.8V10.2C16 11.8802 16 12.7202 15.673 13.362C15.3854 13.9265 14.9265 14.3854 14.362 14.673C13.7202 15 12.8802 15 11.2 15H5.8C4.11984 15 3.27976 15 2.63803 14.673C2.07354 14.3854 1.6146 13.9265 1.32698 13.362C1 12.7202 1 11.8802 1 10.2V5.8Z" stroke="#E7000B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
);

const CubeIcon: Icon = () => (
    <svg width="20" height="22" viewBox="0 0 20 22" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M18.5 6.27783L9.99997 11.0001M9.99997 11.0001L1.49997 6.27783M9.99997 11.0001L10 20.5001M19 15.0586V6.94153C19 6.59889 19 6.42757 18.9495 6.27477C18.9049 6.13959 18.8318 6.01551 18.7354 5.91082C18.6263 5.79248 18.4766 5.70928 18.177 5.54288L10.777 1.43177C10.4934 1.27421 10.3516 1.19543 10.2015 1.16454C10.0685 1.13721 9.93146 1.13721 9.79855 1.16454C9.64838 1.19543 9.50658 1.27421 9.22297 1.43177L1.82297 5.54288C1.52345 5.70928 1.37369 5.79248 1.26463 5.91082C1.16816 6.01551 1.09515 6.13959 1.05048 6.27477C1 6.42757 1 6.59889 1 6.94153V15.0586C1 15.4013 1 15.5726 1.05048 15.7254C1.09515 15.8606 1.16816 15.9847 1.26463 16.0893C1.37369 16.2077 1.52345 16.2909 1.82297 16.4573L9.22297 20.5684C9.50658 20.726 9.64838 20.8047 9.79855 20.8356C9.93146 20.863 10.0685 20.863 10.2015 20.8356C10.3516 20.8047 10.4934 20.726 10.777 20.5684L18.177 16.4573C18.4766 16.2909 18.6263 16.2077 18.7354 16.0893C18.8318 15.9847 18.9049 15.8606 18.9495 15.7254C19 15.5726 19 15.4013 19 15.0586Z" stroke="#F54900" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>

);

const DatabaseIcon: Icon = () => (
    <svg width="20" height="22" viewBox="0 0 20 22" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M19 4C19 5.65685 14.9706 7 10 7C5.02944 7 1 5.65685 1 4M19 4C19 2.34315 14.9706 1 10 1C5.02944 1 1 2.34315 1 4M19 4V18C19 19.66 15 21 10 21C5 21 1 19.66 1 18V4M19 11C19 12.66 15 14 10 14C5 14 1 12.66 1 11" stroke="#0092B8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>

);

const TemplateIcon: Icon = () => (
    <svg width="18" height="22" viewBox="0 0 18 22" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M11 1.26953V5.40007C11 5.96012 11 6.24015 11.109 6.45406C11.2049 6.64222 11.3578 6.7952 11.546 6.89108C11.7599 7.00007 12.0399 7.00007 12.6 7.00007H16.7305M11 16.5L13.5 14L11 11.5M7 11.5L4.5 14L7 16.5M17 8.98822V16.2C17 17.8802 17 18.7202 16.673 19.362C16.3854 19.9265 15.9265 20.3854 15.362 20.673C14.7202 21 13.8802 21 12.2 21H5.8C4.11984 21 3.27976 21 2.63803 20.673C2.07354 20.3854 1.6146 19.9265 1.32698 19.362C1 18.7202 1 17.8802 1 16.2V5.8C1 4.11984 1 3.27976 1.32698 2.63803C1.6146 2.07354 2.07354 1.6146 2.63803 1.32698C3.27976 1 4.11984 1 5.8 1H9.01178C9.74555 1 10.1124 1 10.4577 1.08289C10.7638 1.15638 11.0564 1.27759 11.3249 1.44208C11.6276 1.6276 11.887 1.88703 12.4059 2.40589L15.5941 5.59411C16.113 6.11297 16.3724 6.3724 16.5579 6.67515C16.7224 6.94356 16.8436 7.2362 16.9171 7.5423C17 7.88757 17 8.25445 17 8.98822Z" stroke="#D08700" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
);

const NetworkIcon: Icon = () => (
    <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M11.017 3.61522C11.0598 3.38583 11.1815 3.17864 11.3611 3.02954C11.5406 2.88044 11.7666 2.79883 12 2.79883C12.2333 2.79883 12.4593 2.88044 12.6389 3.02954C12.8184 3.17864 12.9401 3.38583 12.983 3.61522L14.034 9.17322C14.1086 9.56837 14.3006 9.93184 14.585 10.2162C14.8693 10.5005 15.2328 10.6926 15.628 10.7672L21.186 11.8182C21.4153 11.8611 21.6225 11.9828 21.7716 12.1623C21.9207 12.3418 22.0023 12.5679 22.0023 12.8012C22.0023 13.0346 21.9207 13.2606 21.7716 13.4401C21.6225 13.6196 21.4153 13.7414 21.186 13.7842L15.628 14.8352C15.2328 14.9099 14.8693 15.1019 14.585 15.3863C14.3006 15.6706 14.1086 16.0341 14.034 16.4292L12.983 21.9872C12.9401 22.2166 12.8184 22.4238 12.6389 22.5729C12.4593 22.722 12.2333 22.8036 12 22.8036C11.7666 22.8036 11.5406 22.722 11.3611 22.5729C11.1815 22.4238 11.0598 22.2166 11.017 21.9872L9.96595 16.4292C9.89131 16.0341 9.69928 15.6706 9.41492 15.3863C9.13057 15.1019 8.7671 14.9099 8.37195 14.8352L2.81395 13.7842C2.58456 13.7414 2.37737 13.6196 2.22827 13.4401C2.07917 13.2606 1.99756 13.0346 1.99756 12.8012C1.99756 12.5679 2.07917 12.3418 2.22827 12.1623C2.37737 11.9828 2.58456 11.8611 2.81395 11.8182L8.37195 10.7672C8.7671 10.6926 9.13057 10.5005 9.41492 10.2162C9.69928 9.93184 9.89131 9.56837 9.96595 9.17322L11.017 3.61522Z" stroke="#C800DE" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M20 2.80078V6.80078" stroke="#C800DE" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M22 4.80078H18" stroke="#C800DE" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M4 22.8008C5.10457 22.8008 6 21.9054 6 20.8008C6 19.6962 5.10457 18.8008 4 18.8008C2.89543 18.8008 2 19.6962 2 20.8008C2 21.9054 2.89543 22.8008 4 22.8008Z" stroke="#00A63E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
);

const DocIcon: Icon = () => (
    <svg width="18" height="22" viewBox="0 0 18 22" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M11 1.26953V5.40007C11 5.96012 11 6.24015 11.109 6.45406C11.2049 6.64222 11.3578 6.7952 11.546 6.89108C11.7599 7.00007 12.0399 7.00007 12.6 7.00007H16.7305M13 12H5M13 16H5M7 8H5M11 1H5.8C4.11984 1 3.27976 1 2.63803 1.32698C2.07354 1.6146 1.6146 2.07354 1.32698 2.63803C1 3.27976 1 4.11984 1 5.8V16.2C1 17.8802 1 18.7202 1.32698 19.362C1.6146 19.9265 2.07354 20.3854 2.63803 20.673C3.27976 21 4.11984 21 5.8 21H12.2C13.8802 21 14.7202 21 15.362 20.673C15.9265 20.3854 16.3854 19.9265 16.673 19.362C17 18.7202 17 17.8802 17 16.2V7L11 1Z" stroke="#00A63E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
);

const ChartUpIcon: Icon = () => (
    <svg width="23" height="12" viewBox="0 0 23 12" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M21.6562 1L13.1562 9.5L8.15625 4.5L1.65625 11" stroke="#4F39F6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
);

const TranslateIcon: Icon = () => (
    <svg width="22" height="20" viewBox="0 0 22 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M11.913 15H19.087M11.913 15L10 19M11.913 15L14.7783 9.00902C15.0092 8.52627 15.1246 8.2849 15.2826 8.20862C15.4199 8.14228 15.5801 8.14228 15.7174 8.20862C15.8754 8.2849 15.9908 8.52627 16.2217 9.00902L19.087 15M19.087 15L21 19M1 3H7M7 3H10.5M7 3V1M10.5 3H13M10.5 3C10.0039 5.95729 8.85259 8.63618 7.16555 10.8844M9 12C8.38747 11.7248 7.76265 11.3421 7.16555 10.8844M7.16555 10.8844C5.81302 9.84776 4.60276 8.42664 4 7M7.16555 10.8844C5.56086 13.0229 3.47143 14.7718 1 16" stroke="#009689" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
);

const GridIcon: Icon = () => (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M1 7H19M7 7L7 19M5.8 1H14.2C15.8802 1 16.7202 1 17.362 1.32698C17.9265 1.6146 18.3854 2.07354 18.673 2.63803C19 3.27976 19 4.11984 19 5.8V14.2C19 15.8802 19 16.7202 18.673 17.362C18.3854 17.9265 17.9265 18.3854 17.362 18.673C16.7202 19 15.8802 19 14.2 19H5.8C4.11984 19 3.27976 19 2.63803 18.673C2.07354 18.3854 1.6146 17.9265 1.32698 17.362C1 16.7202 1 15.8802 1 14.2V5.8C1 4.11984 1 3.27976 1.32698 2.63803C1.6146 2.07354 2.07354 1.6146 2.63803 1.32698C3.27976 1 4.11984 1 5.8 1Z" stroke="#7F22FE" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
);

const GlobeIcon: Icon = () => (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M1 11H21M1 11C1 16.5228 5.47715 21 11 21M1 11C1 5.47715 5.47715 1 11 1M21 11C21 16.5228 16.5228 21 11 21M21 11C21 5.47715 16.5228 1 11 1M11 1C13.5013 3.73835 14.9228 7.29203 15 11C14.9228 14.708 13.5013 18.2616 11 21M11 1C8.49872 3.73835 7.07725 7.29203 7 11C7.07725 14.708 8.49872 18.2616 11 21" stroke="#0084D1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
);

const PencilIcon: Icon = () => (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M17 9L13 5M1.5 20.5L4.88437 20.124C5.29786 20.078 5.5046 20.055 5.69785 19.9925C5.86929 19.937 6.03245 19.8586 6.18289 19.7594C6.35245 19.6475 6.49955 19.5005 6.79373 19.2063L20 6C21.1046 4.89543 21.1046 3.10457 20 2C18.8955 0.895428 17.1046 0.895427 16 2L2.79373 15.2063C2.49955 15.5005 2.35246 15.6475 2.24064 15.8171C2.14143 15.9676 2.06301 16.1307 2.00751 16.3022C1.94496 16.4954 1.92198 16.7021 1.87604 17.1156L1.5 20.5Z" stroke="#009966" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
);
