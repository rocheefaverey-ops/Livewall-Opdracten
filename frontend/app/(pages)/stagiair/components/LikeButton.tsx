"use client";

import { useState } from "react";

export default function LikeButton() {
  const [likes, setLikes] = useState(0);
  const [liked, setLiked] = useState(false);

  function handleClick() {
    if (liked) {
      setLikes(likes - 1);
    } else {
      setLikes(likes + 1);
    }
    setLiked(!liked);
  }

  return (
    <button
      onClick={handleClick}
      className={`flex items-center gap-2 px-4 py-2 rounded-full transition-colors ${
        liked ? "bg-red-100 text-red-600" : "bg-gray-100 text-gray-600"
      } hover:scale-105 transition-transform`}
    >
      {liked ? "❤️" : "🤍"} {likes} {likes === 1 ? "like" : "likes"}
    </button>
  );
}