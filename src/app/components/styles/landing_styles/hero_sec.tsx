interface VideoCardProps {
  src: string;
  types: string;
  onType: string;
  positionType: string;
  author: string;
  price: number;
  rate: number;
}

interface HeroSectionProps {
    title?: string;
}

const truncateText = (text:string): string => {
    return text.length <= 20 ? text : text.slice(0,17) + '...';
}

const VideoCard: React.FC<VideoCardProps> = ({src, types, onType, positionType, author, price, rate}) => {
    return (
        <div className="w-52 h-96 bg-gray-500/25 mt-12 rounded-3xl overflow-hidden relative shadow-gray-900">
            <video src={src} autoPlay playsInline loop muted className="absolute object-cover w-full h-full rounded-3xl z-10"></video>
            <div className="relative z-10 h-full flex flex-col bg-black/35">
                <div className="grid grid-rows-[40%_60%]">           
                    <div className="pl-4 pt-4 w-fit">
                        <p className="bg-[#000000CC] px-3 py-1 rounded-xl text-white">{types}</p>
                    </div>
                    <div className="pl-4 pt-20">
                        <div>
                            <p className="text-white text-xl font-bold">{truncateText(onType)}</p>
                            <p className="text-white text-lg opacity-80">{truncateText(positionType)}</p>
                            <p className="text-white text-md italic opacity-60">by {truncateText(author)}</p>
                        </div>
                        <div className="flex items-center justify-between pr-4">
                            <span className="text-white">${price.toFixed(2)}</span>
                            <span className="text-white">⭐ {rate.toFixed(1)}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}


export default function HeroSection (
    {
    title = "Find experts. Shop templates. Start selling.", 
    }: HeroSectionProps) {

    const elems = [
        {
            src: "/video/v1.mp4",
            types: "Template",
            onType: "Website Portfolio",
            positionType: "UI/UX Design",
            author: "Jane Doe",
            price: 29.99,
            rate: 4.8,
        },
        {
            src: "/video/v2.mp4",
            types: "Tutorial",
            onType: "React Animation",
            positionType: "Frontend Dev",
            author: "John Smith",
            price: 49.99,
            rate: 4.9,
        },
        {
            src: "/video/v3.mp4",
            types: "Preset",
            onType: "Video LUT Pack",
            positionType: "Film Editing",
            author: "Emily Ray",
            price: 19.99,
            rate: 4.6,
        },
        {
            src: "/video/v4.mp4", 
            types: "Asset Pack",
            onType: "3D Elements",
            positionType: "Motion Graphics",
            author: "Alex K",
            price: 39.99,
            rate: 4.7,
        },
    ];
    
    return (
        <section className="grid grid-cols-[50%_50%] gap-4 px-6 ">
            {/* Left section */}
            <div className="pt-44 ">
                <p className="text-7xl font-bold pl-6 pr-2">{title}</p>
                <div className="pl-6 pt-28">
                    <p className="text-gray-700 text-2xl">Hire talent, buy ready-made assets, or list your work—securely in one place.</p>
                    {/* optional */}
                    <div className="flex items-center gap-x-3 pt-8">
                        <div className="flex items-center w-56 px-10 gap-x-3 border-2 rounded-2xl hover:cursor-pointer">
                            <svg width="22" height="20" viewBox="0 0 22 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M7 19V5C7 4.07003 7 3.60504 7.10222 3.22354C7.37962 2.18827 8.18827 1.37962 9.22354 1.10222C9.60504 1 10.07 1 11 1C11.93 1 12.395 1 12.7765 1.10222C13.8117 1.37962 14.6204 2.18827 14.8978 3.22354C15 3.60504 15 4.07003 15 5V19M4.2 19H17.8C18.9201 19 19.4802 19 19.908 18.782C20.2843 18.5903 20.5903 18.2843 20.782 17.908C21 17.4802 21 16.9201 21 15.8V8.2C21 7.07989 21 6.51984 20.782 6.09202C20.5903 5.71569 20.2843 5.40973 19.908 5.21799C19.4802 5 18.9201 5 17.8 5H4.2C3.07989 5 2.51984 5 2.09202 5.21799C1.71569 5.40973 1.40973 5.71569 1.21799 6.09202C1 6.51984 1 7.07989 1 8.2V15.8C1 16.9201 1 17.4802 1.21799 17.908C1.40973 18.2843 1.71569 18.5903 2.09202 18.782C2.51984 19 3.0799 19 4.2 19Z" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                            <p className="pt-[19px] text-xl">Hire talent</p>
                        </div>
                        <div className="flex items-center w-56 px-10 gap-x-3 border-2 rounded-2xl hover:cursor-pointer">
                            <svg width="20" height="22" viewBox="0 0 20 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M3.52 1.64L1.96 3.72C1.65102 4.13198 1.49652 4.33797 1.50011 4.51039C1.50323 4.66044 1.57358 4.80115 1.69175 4.89368C1.82754 5 2.08503 5 2.6 5H17.4C17.915 5 18.1725 5 18.3083 4.89368C18.4264 4.80115 18.4968 4.66044 18.4999 4.51039C18.5035 4.33797 18.349 4.13198 18.04 3.72L16.48 1.64M3.52 1.64C3.696 1.40533 3.784 1.288 3.89552 1.20338C3.9943 1.12842 4.10616 1.0725 4.22539 1.03845C4.36 1 4.50667 1 4.8 1H15.2C15.4933 1 15.64 1 15.7746 1.03845C15.8938 1.0725 16.0057 1.12842 16.1045 1.20338C16.216 1.288 16.304 1.40533 16.48 1.64M3.52 1.64L1.64 4.14666C1.40254 4.46328 1.28381 4.62159 1.1995 4.79592C1.12469 4.95062 1.07012 5.11431 1.03715 5.28296C1 5.47301 1 5.6709 1 6.06666L1 17.8C1 18.9201 1 19.4802 1.21799 19.908C1.40973 20.2843 1.71569 20.5903 2.09202 20.782C2.51984 21 3.07989 21 4.2 21L15.8 21C16.9201 21 17.4802 21 17.908 20.782C18.2843 20.5903 18.5903 20.2843 18.782 19.908C19 19.4802 19 18.9201 19 17.8V6.06667C19 5.6709 19 5.47301 18.9628 5.28296C18.9299 5.11431 18.8753 4.95062 18.8005 4.79592C18.7162 4.62159 18.5975 4.46328 18.36 4.14667L16.48 1.64M14 9C14 10.0609 13.5786 11.0783 12.8284 11.8284C12.0783 12.5786 11.0609 13 10 13C8.93913 13 7.92172 12.5786 7.17157 11.8284C6.42143 11.0783 6 10.0609 6 9" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                            <p className="pt-[19px] text-xl">Find work </p>
                        </div>
                        <div className="flex items-center w-56 px-10 gap-x-3 border-2 rounded-2xl hover:cursor-pointer">
                            <svg width="22" height="21" viewBox="0 0 22 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M8 20V12.6C8 12.0399 8 11.7599 8.109 11.546C8.20487 11.3578 8.35785 11.2049 8.54601 11.109C8.75993 11 9.03995 11 9.6 11H12.4C12.9601 11 13.2401 11 13.454 11.109C13.6422 11.2049 13.7951 11.3578 13.891 11.546C14 11.7599 14 12.0399 14 12.6V20M1 8.5L10.04 1.72C10.3843 1.46181 10.5564 1.33271 10.7454 1.28294C10.9123 1.23902 11.0877 1.23902 11.2546 1.28295C11.4436 1.33271 11.6157 1.46181 11.96 1.72L21 8.5M3 7V16.8C3 17.9201 3 18.4802 3.21799 18.908C3.40974 19.2843 3.7157 19.5903 4.09202 19.782C4.51985 20 5.0799 20 6.2 20H15.8C16.9201 20 17.4802 20 17.908 19.782C18.2843 19.5903 18.5903 19.2843 18.782 18.908C19 18.4802 19 17.9201 19 16.8V7L12.92 2.44C12.2315 1.92361 11.8872 1.66542 11.5091 1.56589C11.1754 1.47804 10.8246 1.47804 10.4909 1.56589C10.1128 1.66542 9.76852 1.92361 9.08 2.44L3 7Z" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                            <p className="pt-[19px] text-xl">Sell work</p>
                        </div>
                    </div>
                    {/* search */}
                    <div className="flex items-center gap-x-2 mt-7 rounded-2xl pl-2 bg-gray-200 border-2 border-gray-200">
                        <svg className="ml-4" width="24" height="24" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M19 19L15.5001 15.5M18 9.5C18 14.1944 14.1944 18 9.5 18C4.80558 18 1 14.1944 1 9.5C1 4.80558 4.80558 1 9.5 1C14.1944 1 18 4.80558 18 9.5Z" stroke="gray" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        <input type='text' className='w-full p-3 text-black rounded-xl outline-none border-none focus:ring-0'  placeholder="Search skills, projects, or services..."></input>
                    </div>
                    {/* trend */}
                    <div>
                        <p className="text-[#6A7282] pt-4 text-lg pl-1">Trending</p>
                        <div className="flex items-center gap-x-3">
                            {["UI Components", "Templates", "Illustrations", "Stock Photos", "Fonts", "Code Snippets"].map((a,i)=>(
                                <div key={i} className="rounded-xl w-fit bg-[#ECEEF2] px-3 py-2">
                                    {a}
                                </div>
                            ))}
                        </div>
                    </div>
                    {/* Optional */}
                    <div className="flex items-center gap-x-3 pt-8">
                        {["Post a Job", "Open a Shop", "Browse Projects"].map((label) => (
                            <div
                                key={label}
                                className="flex items-center w-48 rounded-xl justify-center gap-x-3 py-2 border-2 border-gray-200 focus:outline-none">
                                <span className="text-xl">{label}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Right section */}
            <div className="grid grid-cols-4 gap-x-4 pr-4 justify-between">
                {elems.map((i, index) => (
                    <VideoCard key={index} {...i} />
                ))}
                
                <div className="w-2xl h-96 mt-6 rounded-2xl overflow-hidden relative">
                    <video src="video/header.mp4" autoPlay playsInline loop muted className="absolute object-cover w-full h-full rounded-2xl z-10"></video>         
                    <div className="relative z-10 h-full bg-black/35">
                        {[{types:"CASE", onType: "Brand Redesign for Fintech",positionType: "Digital Marketing",author:"Nora K." , price: 29.99, rate: 4.8,}].map((v,i)=>(
                            <div key={i} className="grid grid-rows-[40%_60%]">  
                                <div className="pl-4 pt-4 w-fit">
                                    <p className="bg-[#000000CC] px-3 py-1 rounded-xl text-white">{v.types}</p>
                                </div>
                                <div className="pl-4 pt-20">
                                    <div>
                                        <p className="text-white text-xl font-bold">{truncateText(v.onType)}</p>
                                        <p className="text-white text-lg opacity-80">{truncateText(v.positionType)}</p>
                                        <p className="text-white text-md italic opacity-60">by {truncateText(v.author)}</p>
                                    </div>
                                    <div className="flex items-center justify-between pr-4">
                                        <span className="text-white">${v.price.toFixed(2)}</span>
                                        <span className="text-white">⭐ {v.rate.toFixed(1)}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
};
