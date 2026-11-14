export interface Album {
  title: string;
  artist: string;
  image: string;
}

export interface AlbumGroup {
  title: string;
  items: Album[];
}

/** Songs listed on /music */
export const albumGroups: AlbumGroup[] = [
  {
    title: 'My current rotation',
    items: [
      { title: 'Black', artist: 'Pearl Jam', image: 'UGklnVBITLn3rKPlE5xCGHqbNc.jpg' },
      { title: 'Break Stuff', artist: 'Limp Bizkit', image: 'pLTbfc5MKAN0l8WZKPUYKsS0ooU.jpg' },
      { title: "Don't Look Back in Anger", artist: 'Oasis', image: 'J2AhhggSJX09rCZQRsytaZW4G4.png' },
      { title: 'Never Fade Away', artist: 'SAMURAI', image: 'sbStHUp3aiBMyCvGwK6h7XWr1o.webp' },
      { title: 'Sundown', artist: 'Gordon Lightfoot', image: 'vEX8Z6Jt2XedItERHSjEb5FI8E.jpg' },
      { title: 'The Emptiness Machine', artist: 'Linkin Park', image: '9YknR1gzV6JiRWxV6SFgeqPB7u8.jpg' },
    ],
  },
  {
    title: 'My favourite songs',
    items: [
      { title: 'Bohemian Rhapsody', artist: 'Queen', image: 'T0hIblJrmWl0aP3wNCMTNLWVTA.png' },
      { title: 'Radio Ga Ga', artist: 'Queen', image: 'UaHRnghBb0WzR4HhfXGYbORZVsA.jpg' },
      { title: 'Stairway to Heaven', artist: 'Led Zeppelin', image: 'uAVNArH5EX3uJKe0AIHHqB6kr6U.jpg' },
      { title: 'Hot for Teacher', artist: 'Van Halen', image: 'yYz30ZS9xKN4JuHii1ecRzqBbUk.jpg' },
      { title: '21st Century Breakdown', artist: 'Green Day', image: 's96Es9DHbH8hqurRKiXGtd5w.jpg' },
      { title: 'Even Flow', artist: 'Pearl Jam', image: 'UGklnVBITLn3rKPlE5xCGHqbNc.jpg' },
    ],
  },
];
