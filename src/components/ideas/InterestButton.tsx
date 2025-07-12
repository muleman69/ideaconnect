'use client';

import { useState } from 'react';
import { Heart } from 'lucide-react';

interface InterestButtonProps {
  isInterested: boolean;
  onToggle: () => void;
}

export default function InterestButton({ isInterested, onToggle }: InterestButtonProps) {
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    setLoading(true);
    try {
      await onToggle();
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleClick}
      disabled={loading}
      className={`flex items-center gap-2 px-4 py-2 rounded-md font-medium transition-colors ${
        isInterested
          ? 'bg-red-100 text-red-700 hover:bg-red-200'
          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
      } disabled:opacity-50 disabled:cursor-not-allowed`}
    >
      <Heart 
        className={`h-4 w-4 ${isInterested ? 'fill-red-500 text-red-500' : ''}`} 
      />
      {loading ? 'Loading...' : isInterested ? 'Interested' : 'Raise Hand'}
    </button>
  );
}