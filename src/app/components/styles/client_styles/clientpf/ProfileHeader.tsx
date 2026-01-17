import { MapPin, Star } from "lucide-react";
import Image from "next/image";

export default function ProfileHeader() {
  return (
    <section className="flex items-start gap-6 py-8">
      <Image
        src="/profile.jpg"
        alt="Profile"
        className="w-20 h-20 rounded-full object-cover"
        width={80}
        height={80}
      />

      <div className="flex-1">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold">Cardi B</h1>
            <p className="text-gray-500 text-sm">
              Hiring Manager · TechFlow Studios
            </p>
          </div>

          <p className="text-md text-green-600 font-medium flex items-center gap-1">
            <svg
              width="20"
              height="20"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M8 2H3.33333C2.97971 2 2.64057 2.14048 2.39052 2.39052C2.14048 2.64057 2 2.97971 2 3.33333V12.6667C2 13.0203 2.14048 13.3594 2.39052 13.6095C2.64057 13.8595 2.97971 14 3.33333 14H12.6667C13.0203 14 13.3594 13.8595 13.6095 13.6095C13.8595 13.3594 14 13.0203 14 12.6667V8"
                stroke="#009966"
                stroke-width="1.33333"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M12.2494 1.75015C12.5146 1.48493 12.8743 1.33594 13.2494 1.33594C13.6245 1.33594 13.9842 1.48493 14.2494 1.75015C14.5146 2.01537 14.6636 2.37508 14.6636 2.75015C14.6636 3.12522 14.5146 3.48493 14.2494 3.75015L8.24075 9.75948C8.08244 9.91765 7.88688 10.0334 7.67208 10.0962L5.75674 10.6562C5.69938 10.6729 5.63857 10.6739 5.58068 10.6591C5.5228 10.6442 5.46996 10.6141 5.42771 10.5719C5.38546 10.5296 5.35534 10.4768 5.34051 10.4189C5.32568 10.361 5.32668 10.3002 5.34341 10.2428L5.90341 8.32748C5.96643 8.11285 6.08243 7.91752 6.24075 7.75948L12.2494 1.75015Z"
                stroke="#009966"
                stroke-width="1.33333"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
            Edit Profile
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-4 mt-2 text-sm text-gray-500">
          <span className="flex items-center gap-1">
            <MapPin className="w-4 h-4" /> Cambodia
          </span>
          <span>• PST (GMT-8)</span>

          <span className="text-gray-500 flex gap-0.5    items-center">
            <svg
              className="align-middle w-4 h-4"
              viewBox="0 0 14 14"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clip-path="url(#clip0_1565_20155)">
                <path
                  d="M7 3.5V7L9.33333 8.16667"
                  stroke="#717182"
                  stroke-width="1.16667"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M6.99935 12.8337C10.221 12.8337 12.8327 10.222 12.8327 7.00033C12.8327 3.77866 10.221 1.16699 6.99935 1.16699C3.77769 1.16699 1.16602 3.77866 1.16602 7.00033C1.16602 10.222 3.77769 12.8337 6.99935 12.8337Z"
                  stroke="#717182"
                  stroke-width="1.16667"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </g>
              <defs>
                <clipPath id="clip0_1565_20155">
                  <rect width="14" height="14" fill="white" />
                </clipPath>
              </defs>
            </svg>
            Active today
          </span>
        </div>

        <div className="flex flex-wrap gap-2 mt-4">
          <span className="px-3 py-1 text-xs bg-green-50 text-green-600 rounded-full">
            Payment verified
          </span>
          <span className="px-3 py-1 text-xs bg-gray-100 rounded-full">
            $50k+ spent
          </span>
          <span className="px-3 py-1 text-xs bg-gray-100 rounded-full flex items-center gap-1">
            <svg
              className=""
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clip-path="url(#clip0_1565_20172)">
                <path
                  d="M8 10.5V9.5C8 8.96957 7.78929 8.46086 7.41421 8.08579C7.03914 7.71071 6.53043 7.5 6 7.5H3C2.46957 7.5 1.96086 7.71071 1.58579 8.08579C1.21071 8.46086 1 8.96957 1 9.5V10.5"
                  stroke="#1A1A1A"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M8 1.56445C8.42888 1.67564 8.8087 1.92609 9.07984 2.27648C9.35098 2.62688 9.4981 3.0574 9.4981 3.50045C9.4981 3.94351 9.35098 4.37402 9.07984 4.72442C8.8087 5.07482 8.42888 5.32527 8 5.43645"
                  stroke="#1A1A1A"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M11 10.5004V9.50043C10.9997 9.05729 10.8522 8.62682 10.5807 8.27659C10.3092 7.92636 9.92906 7.67621 9.5 7.56543"
                  stroke="#1A1A1A"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M4.5 5.5C5.60457 5.5 6.5 4.60457 6.5 3.5C6.5 2.39543 5.60457 1.5 4.5 1.5C3.39543 1.5 2.5 2.39543 2.5 3.5C2.5 4.60457 3.39543 5.5 4.5 5.5Z"
                  stroke="#1A1A1A"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </g>
              <defs>
                <clipPath id="clip0_1565_20172">
                  <rect width="12" height="12" fill="white" />
                </clipPath>
              </defs>
            </svg>
            127 hires
          </span>
          <span className="px-3 py-1 text-xs bg-gray-100 rounded-full flex items-center gap-1">
            <Star className="w-3 h-3 text-yellow-500" /> 4.8 avg
          </span>
          <span className="px-3 py-1 text-xs bg-gray-100 rounded-full flex">
            <svg
              className="align-middle w-3 h-4"
              viewBox="0 0 14 14"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clip-path="url(#clip0_1565_20155)">
                <path
                  d="M7 3.5V7L9.33333 8.16667"
                  stroke="#1A1A1A"
                  stroke-width="1.16667"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M6.99935 12.8337C10.221 12.8337 12.8327 10.222 12.8327 7.00033C12.8327 3.77866 10.221 1.16699 6.99935 1.16699C3.77769 1.16699 1.16602 3.77866 1.16602 7.00033C1.16602 10.222 3.77769 12.8337 6.99935 12.8337Z"
                  stroke="#1A1A1A"
                  stroke-width="1.16667"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </g>
              <defs>
                <clipPath id="clip0_1565_20155">
                  <rect width="14" height="14" fill="white" />
                </clipPath>
              </defs>
            </svg>
            &lt;24h response
          </span>
        </div>
      </div>
    </section>
  );
}
