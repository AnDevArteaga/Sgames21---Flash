import React from 'react'
import { User2 } from 'lucide-react'

const ProfileButton = ({ onClick }) => (
  <div onClick={onClick} className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center cursor-pointer">
    <User2 size={20} />
  </div>
);

export default ProfileButton
