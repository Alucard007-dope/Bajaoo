import { Product } from './types';

export const PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'CD-60S Dreadnought Acoustic Guitar',
    brand: 'Fender',
    price: 16499,
    originalPrice: 18999,
    rating: 4.8,
    reviews: 1240,
    image: 'https://picsum.photos/seed/guitar1/600/600',
    category: 'Acoustic Guitars',
    isTopSeller: true,
    description: 'The CD-60S is one of our most popular models and is ideal for players looking for a high-quality affordable dreadnought with great tone and excellent playability.',
    specs: {
      'Body Material': 'Solid Spruce Top with Mahogany Back and Sides',
      'Neck Finish': 'Gloss',
      'Scale Length': '25.3" (643 mm)',
      'Fingerboard': 'Walnut',
      'Number of Frets': '20'
    }
  },
  {
    id: '2',
    name: 'V50NJP-BK Acoustic Jam Pack',
    brand: 'Ibanez',
    price: 9499,
    originalPrice: 11000,
    rating: 4.5,
    reviews: 482,
    image: 'https://picsum.photos/seed/guitar2/600/600',
    category: 'Acoustic Guitars',
    description: 'The Ibanez V50 Jam Pack includes everything you need to start playing acoustic guitar: a V50 acoustic guitar, a gig bag, a tuner, a strap, and picks.'
  },
  {
    id: '3',
    name: 'F310 Full Size Steel String Guitar',
    brand: 'Yamaha',
    price: 10299,
    originalPrice: 12490,
    rating: 4.9,
    reviews: 2105,
    image: 'https://picsum.photos/seed/guitar3/600/600',
    category: 'Acoustic Guitars',
    isSale: true
  },
  {
    id: '4',
    name: 'PR-4E Acoustic-Electric Pack',
    brand: 'Epiphone',
    price: 22999,
    originalPrice: 25000,
    rating: 4.6,
    reviews: 156,
    image: 'https://picsum.photos/seed/guitar4/600/600',
    category: 'Acoustic Guitars'
  },
  {
    id: '5',
    name: 'AD810 Standard Series Dreadnought',
    brand: 'Cort',
    price: 8990,
    originalPrice: 10500,
    rating: 4.7,
    reviews: 220,
    image: 'https://picsum.photos/seed/guitar5/600/600',
    category: 'Acoustic Guitars'
  },
  {
    id: '6',
    name: 'FA-115 Dreadnought Acoustic Pack',
    brand: 'Fender',
    price: 12999,
    originalPrice: 15000,
    rating: 4.8,
    reviews: 312,
    image: 'https://picsum.photos/seed/guitar6/600/600',
    category: 'Acoustic Guitars'
  }
];

export const CATEGORIES = [
  { name: 'Electric Guitars', icon: '🎸' },
  { name: 'Drums & Percussion', icon: '🥁' },
  { name: 'Keyboards', icon: '🎹' },
  { name: 'Pro Audio', icon: '🎙️' },
  { name: 'Accessories', icon: '🔌' },
  { name: 'Monitors', icon: '🔊' }
];
