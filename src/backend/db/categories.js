import { v4 as uuid } from 'uuid';

/**
 * Category Database can be added here.
 * You can add category of your wish with different attributes
 * */

export const categories = [
  {
    _id: uuid(),
    categoryName: 'Gold',
    description: 'The ultimate investment in luxury and beauty',
    imageUrl:
      'http://www.fashionteria.com/wp-content/uploads/2021/04/gold-jewelry.jpg',
  },
  {
    _id: uuid(),
    categoryName: 'Silver',
    description: 'A precious metal that is both beautiful and affordable',
    imageUrl:
      'https://blog.brilliance.com/wp-content/uploads/2016/07/jewelery.jpg',
  },
];
