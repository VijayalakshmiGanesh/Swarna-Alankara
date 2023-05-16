import { v4 as uuid } from "uuid";

/**
 * Category Database can be added here.
 * You can add category of your wish with different attributes
 * */

export const categories = [
  {
    _id: uuid(),
    categoryName: "Gold",
    description:
      "The ultimate investment in luxury and beauty",
  },
  {
    _id: uuid(),
    categoryName: "Silver",
    description:
      "A precious metal that is both beautiful and affordable",
  },
  
];
