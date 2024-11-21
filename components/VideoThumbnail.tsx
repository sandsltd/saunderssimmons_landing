'use client'

import Image from 'next/image'

export default function VideoThumbnail() {
  return (
    <div className="relative w-full aspect-video">
      <Image
        src="/sands_logo.png"
        alt="Video Thumbnail"
        fill
        className="object-contain"
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      />
    </div>
  )
} 