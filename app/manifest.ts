import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'My To-Do List',
    short_name: 'My To-Do List',
    description: '카테고리, 태그, 마감일, 우선순위를 지원하는 할 일 앱',
    start_url: '/',
    display: 'standalone',
    background_color: '#0d1020',
    theme_color: '#4f46e5',
    icons: [
      {
        src: '/icon-192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/icon-512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'maskable',
      },
    ],
  }
}
