import React from 'react';
import { Twitter, Linkedin, Github, Instagram } from 'lucide-react';

// Define the props interface
interface UserProfileCardProps {
  name: string;
  title: string;
  imageSrc: string;
  twitterUrl?: string;
  linkedinUrl?: string;
  githubUrl?: string;
  instagramUrl?: string;
}

const UserProfileCard: React.FC<UserProfileCardProps> = ({
  name,
  title,
  imageSrc,
  twitterUrl,
  linkedinUrl,
  githubUrl,
  instagramUrl
}) => {
  return (
    <div className="relative w-5/6 h-50 rounded-lg shadow-xl overflow-hidden group">
      {/* Image container */}
      <div className="w-full h-full">
        <img 
          src={imageSrc} 
          alt={name}
          className="w-full h-full object-cover"
        />
      </div>
      
      {/* Sliding content - appears from right side */}
      <div className="absolute inset-0 bg-green-100 bg-opacity-90 transform translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-in-out">
        <div className="p-6 h-full flex flex-col justify-center">
          {/* User details */}
          <h2 className="text-2xl font-bold text-gray-800 mb-2">{name}</h2>
          <p className="text-gray-600 mb-6">{title}</p>
          
          {/* Social media icons */}
          <div className="flex space-x-4">
            {twitterUrl && (
              <a href={twitterUrl} target="_blank" rel="noopener noreferrer" className="text-gray-700 hover:text-blue-500 transition-colors">
                <Twitter size={20} />
              </a>
            )}
            {linkedinUrl && (
              <a href={linkedinUrl} target="_blank" rel="noopener noreferrer" className="text-gray-700 hover:text-blue-700 transition-colors">
                <Linkedin size={20} />
              </a>
            )}
            {githubUrl && (
              <a href={githubUrl} target="_blank" rel="noopener noreferrer" className="text-gray-700 hover:text-gray-900 transition-colors">
                <Github size={20} />
              </a>
            )}
            {instagramUrl && (
              <a href={instagramUrl} target="_blank" rel="noopener noreferrer" className="text-gray-700 hover:text-pink-600 transition-colors">
                <Instagram size={20} />
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfileCard;