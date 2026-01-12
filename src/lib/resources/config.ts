export const RESOURCES_CONFIG = {
  zopucast: {
    youtubePlaylistId: 'PLs4wt-PwfpmmmQMF2e9AX-qgpuA7vpvHK',
    spotifyShowId: '3XffmyRMTbXeGPCMZjedun',
    spotifyUrl: 'https://open.spotify.com/show/3XffmyRMTbXeGPCMZjedun',
    youtubePlaylistUrl: 'https://www.youtube.com/playlist?list=PLs4wt-PwfpmmmQMF2e9AX-qgpuA7vpvHK',
  },
  webinars: {
    // Você compartilhou um link de live/vídeo. Para ingestão automática (RSS), precisamos do playlist_id.
    seedVideos: ['zPj2fRTHnok'],
    youtubeUrl: 'https://www.youtube.com/live/zPj2fRTHnok',
  },
  metodologias: {
    // Vídeos soltos no canal — começamos com curadoria manual.
    youtubeUrl: 'https://www.youtube.com',
  },
} as const
