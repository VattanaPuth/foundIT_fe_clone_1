import Image from "next/image";
import React, { useState } from "react";

interface BlockedUser {
  name: string;
  alt?: string;
  blockedDate: string;
  imageUrl?: string;
}

const SettingRightSide6Com3: React.FC = () => {
  const [blockedUsers, setBlockedUsers] = useState<BlockedUser[]>([
    {
      name: "Marcus Peterson",
      blockedDate: "Jan 28, 2025",
      imageUrl:
        "https://i.pinimg.com/736x/08/8c/39/088c393fc97c51b94fb2426dbfa1a465.jpg",
    },
    {
      name: "Lisa Anderson",
      blockedDate: "Jan 15, 2025",
      imageUrl:
        "https://i.pinimg.com/736x/08/8c/39/088c393fc97c51b94fb2426dbfa1a465.jpg",
    },
    {
      name: "David Martinez",

      blockedDate: "Dec 22, 2024",
      imageUrl:
        "https://i.pinimg.com/736x/08/8c/39/088c393fc97c51b94fb2426dbfa1a465.jpg",
    },
    {
      name: "Rachel Kim",
      blockedDate: "Dec 8, 2024",
      imageUrl:
        "https://i.pinimg.com/736x/08/8c/39/088c393fc97c51b94fb2426dbfa1a465.jpg",
    },
    {
      name: "James Foster",
      blockedDate: "Nov 30, 2024",
      imageUrl:
        "https://i.pinimg.com/736x/08/8c/39/088c393fc97c51b94fb2426dbfa1a465.jpg",
    },
  ]);

  const [showModal, setShowModal] = useState<boolean>(false);
  const [userToUnblock, setUserToUnblock] = useState<number | null>(null);

  const handleUnblock = (index: number) => {
    const updatedBlockedUsers = blockedUsers.filter((_, i) => i !== index);
    setBlockedUsers(updatedBlockedUsers);
    setShowModal(false); // Close the modal after unblocking
  };

  const openModal = (index: number) => {
    setUserToUnblock(index);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setUserToUnblock(null);
  };

  return (
    <div className="w-full px-6 py-8 space-y-6 rounded-2xl shadow-md bg-white mt-3 border border-gray-200">
      <div className="-space-y-3">
        <div>
          <p className="text-2xl">Blocked Users</p>
        </div>
        <div className="text-lg text-gray-500">
          Manage users you have blocked. They will not be able to contact you or
          see your job posts.
        </div>
      </div>

      <div className="space-y-4">
        {blockedUsers.map((user, index) => (
          <div
            key={index}
            className="flex items-center justify-between p-4 border rounded-xl border-gray-300"
          >
            <div className="flex items-center space-x-4">
              <div className="flex-shrink-0">
                <div
                  className={`w-12 h-12 rounded-full bg-gray-300 ${user.imageUrl ? "" : "flex items-center justify-center"}`}
                >
                  {user.imageUrl ? (
                    <Image
                      src={user.imageUrl}
                      alt={user.name[0]}
                      className="w-full h-full rounded-full object-center"
                      width={48}
                      height={48}
                    />
                  ) : (
                    <span className="text-white">{user.name[0]}</span> // Default avatar with the first letter of the name
                  )}
                </div>
              </div>
              <div className="space-y-1">
                <div className="text-lg">{user.name}</div>
                <div className="text-sm text-gray-500">
                  Blocked on {user.blockedDate}
                </div>
              </div>
            </div>
            <div
              onClick={() => openModal(index)} // Trigger the modal on unblock click
              className="cursor-pointer text-sm text-gray-600 hover:text-red-600"
            >
              Unblock
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {showModal && userToUnblock !== null && (
        <div className="fixed inset-0 z-50 flex justify-center items-center bg-black bg-opacity-50">
          <div className="w-full max-w-lg bg-white rounded-xl p-8 shadow-lg">
            {/* Modal Content */}
            <div className="text-center mb-8">
              <div className="text-lg font-semibold text-gray-800 mb-2">
                Unblock {blockedUsers[userToUnblock].name}?
              </div>
              <div className="text-sm text-gray-500 mb-4">
                This user will be able to contact you, apply to your jobs, and
                see your job posts again. You can always block them again later.
              </div>

              {/* Modal buttons */}
              <div className="flex justify-center gap-4">
                <div
                  onClick={closeModal}
                  className="py-2 px-4 border border-gray-300 rounded-2xl text-gray-600 cursor-pointer"
                >
                  Cancel
                </div>
                <div
                  onClick={() => handleUnblock(userToUnblock)}
                  className="py-2 px-4 bg-[#00BC7D] text-white rounded-2xl cursor-pointer"
                >
                  Unblock User
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SettingRightSide6Com3;
