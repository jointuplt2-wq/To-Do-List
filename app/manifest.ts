import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'My To-Do List',
    short_name: '할 일',
    description: '오늘 할 일을 빠르게 정리하세요',
    start_url: '/',
    display: 'standalone',
    background_color: '#0d1020',
    theme_color: '#312e81',
    orientation: 'portrait',
    icons: [
      {
        src: '/icon.svg',
        sizes: 'any',
        type: 'image/svg+xml',
        purpose: 'any',
      },
      {
        src: '/icon.svg',
        sizes: 'any',
        type: 'image/svg+xml',
        purpose: 'maskable',
      },
    ],
  }
}
