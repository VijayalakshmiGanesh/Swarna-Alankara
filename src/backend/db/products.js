import { v4 as uuid } from 'uuid';

/**
 * Product Database can be added here.
 * You can add products of your wish with different attributes
 * */

export const products = [
  {
    _id: uuid(),
    title: 'Classic gold chain with flower pendant',
    subCategory: 'Chains',
    weight: 6.25,
    categoryName: 'Gold',
    imageURL:
      'https://images.pexels.com/photos/12145316/pexels-photo-12145316.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    price: 40119,
    rating: 3.9,
  },
  {
    _id: uuid(),
    title: 'Elegant gold chain with sun pendant',
    subCategory: 'Chains',
    weight: 8.17,
    categoryName: 'Gold',
    imageURL:
      'https://images.pexels.com/photos/13325937/pexels-photo-13325937.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    price: 50906,
    rating: 5,
  },
  {
    _id: uuid(),
    title: 'Double classic gold chain with star pendant',
    subCategory: 'Chains',
    weight: 12,
    categoryName: 'Gold',
    imageURL:
      'https://images.pexels.com/photos/13325931/pexels-photo-13325931.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    price: 75615,
    rating: 4.35,
  },
  {
    _id: uuid(),
    title: 'Flower shaped stone silver chain',
    subCategory: 'Chains',
    weight: 11.25,
    categoryName: 'Silver',
    imageURL:
      'https://images.pexels.com/photos/10983780/pexels-photo-10983780.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    price: 1476,
    rating: 3,
  },
  {
    _id: uuid(),
    title: 'Silver diamond pendant chain',
    subCategory: 'Chains',
    weight: 12.17,
    categoryName: 'Silver',
    imageURL:
      'https://images.pexels.com/photos/5370650/pexels-photo-5370650.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    price: 1504,
    rating: 4.65,
  },
  {
    _id: uuid(),
    title: 'Silver Heart dollar chain',
    subCategory: 'Chains',
    weight: 7.15,
    categoryName: 'Silver',
    imageURL:
      'https://images.pexels.com/photos/9924688/pexels-photo-9924688.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    price: 1042,
    rating: 3.87,
  },
  {
    _id: uuid(),
    title: 'Dual colored loop earring',
    subCategory: 'Earrings',
    weight: 2.25,
    categoryName: 'Gold',
    imageURL:
      'https://images.pexels.com/photos/3266700/pexels-photo-3266700.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    price: 15109,
    rating: 4.12,
  },
  {
    _id: uuid(),
    title: 'Three layered semi-hoop earring',
    subCategory: 'Earrings',
    weight: 3,
    categoryName: 'Gold',
    imageURL:
      'https://images.pexels.com/photos/12144991/pexels-photo-12144991.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    price: 19395,
    rating: 4.9,
  },
  {
    _id: uuid(),
    title: 'Semi-hoop with U stones drop earrings',
    subCategory: 'Earrings',
    weight: 6,
    categoryName: 'Gold',
    imageURL:
      'https://images.pexels.com/photos/12144840/pexels-photo-12144840.jpeg',
    price: 38504,
    rating: 3.45,
  },
  {
    _id: uuid(),
    title: 'Gold twisted hoop earrings',
    subCategory: 'Earrings',
    weight: 4.35,
    categoryName: 'Gold',
    imageURL:
      'https://images.pexels.com/photos/12144805/pexels-photo-12144805.jpeg?auto=compress&cs=tinysrgb&w=600',
    price: 29075,
    rating: 4.4,
  },
  {
    _id: uuid(),
    title: 'Single stone silver earrings',
    subCategory: 'Earrings',
    weight: 3,
    categoryName: 'Silver',
    imageURL:
      'https://images.pexels.com/photos/5370657/pexels-photo-5370657.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    price: 490,
    rating: 5,
  },
  {
    _id: uuid(),
    title: 'Color stone silver earrings (Set of 4)',
    subCategory: 'Earrings',
    weight: 12.5,
    categoryName: 'Silver',
    imageURL:
      'https://images.pexels.com/photos/5370641/pexels-photo-5370641.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    price: 1960,
    rating: 4,
  },
  {
    _id: uuid(),
    title: 'Sapphire silver earring',
    subCategory: 'Earrings',
    weight: 4,
    categoryName: 'Silver',
    imageURL:
      'https://images.pexels.com/photos/5370643/pexels-photo-5370643.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    price: 570,
    rating: 3.8,
  },
  {
    _id: uuid(),
    title: 'Three layered gold ring',
    subCategory: 'Ring',
    weight: 3.5,
    categoryName: 'Gold',
    imageURL: '../../assests/ring_gold_1.jpg',
    price: 22252,
    rating: 4.2,
  },
  {
    _id: uuid(),
    title: 'Elegant gold ring',
    subCategory: 'Ring',
    weight: 2.65,
    categoryName: 'Gold',
    imageURL:
      'https://images.pexels.com/photos/9420321/pexels-photo-9420321.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    price: 17395,
    rating: 4.7,
  },
  {
    _id: uuid(),
    title: 'Traditional cut modeled ring',
    subCategory: 'Ring',
    weight: 4,
    categoryName: 'Gold',
    imageURL: '../../assests/ring_gold_3.jpg',
    price: 27074,
    rating: 3.95,
  },
  {
    _id: uuid(),
    title: 'Dazzling silver ring',
    subCategory: 'Ring',
    weight: 4.65,
    categoryName: 'Silver',
    imageURL:
      'https://images.pexels.com/photos/5442468/pexels-photo-5442468.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    price: 615,
    rating: 4.95,
  },
  {
    _id: uuid(),
    title: 'Lovely floral ring',
    subCategory: 'Ring',
    weight: 4,
    categoryName: 'Silver',
    imageURL:
      'https://images.pexels.com/photos/14466158/pexels-photo-14466158.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    price: 570,
    rating: 3.15,
  },
  {
    _id: uuid(),
    title: 'Magnificient three stone ring',
    subCategory: 'Ring',
    weight: 3.95,
    categoryName: 'Silver',
    imageURL:
      'https://images.pexels.com/photos/12427694/pexels-photo-12427694.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    price: 560,
    rating: 3.5,
  },
];
