import { Response } from 'miragejs';
import { formatDate, requiresAuth } from '../utils/authUtils';
import { v4 as uuid } from 'uuid';
/**
 * All the routes related to Address are present here.
 * These are private routes.
 * Client needs to add "authorization" header with JWT token in it to access it.
 * */

/**
 * This handler handles getting all addresses from user.
 * send GET Request at /api/user/addresses
 * */

export const getAllAddressesHandler = function (schema, request) {
  const userId = requiresAuth.call(this, request);
  if (!userId) {
    new Response(
      404,
      {},
      {
        errors: ['The email you entered is not Registered. Not Found error'],
      }
    );
  }
  const userAddresses = schema.users.findBy({ _id: userId }).address;
  return new Response(200, {}, { address: userAddresses });
};

/**
 * This handler handles adding an address to user.
 * send POST Request at /api/user/address
 * body contains { address }
 * */

export const addNewAddressHandler = function (schema, request) {
  const userId = requiresAuth.call(this, request);
  try {
    if (!userId) {
      new Response(
        404,
        {},
        {
          errors: ['The email you entered is not Registered. Not Found error'],
        }
      );
    }
    const userAddress = schema.users.findBy({
      _id: userId,
    }).address;
    const { address } = JSON.parse(request.requestBody);
    userAddress.push({
      ...address,
      _id: uuid(),
      createdAt: formatDate(),
      updatedAt: formatDate(),
    });
    this.db.users.update(
      {
        _id: userId,
      },
      {
        address: userAddress,
      }
    );
    return new Response(
      201,
      {},
      {
        address: userAddress,
      }
    );
  } catch (error) {
    return new Response(
      500,
      {},
      {
        error,
      }
    );
  }
};

/**
 * This handler handles removing an address from user.
 * send DELETE Request at /api/user/address/:addressId
 *
 * */

export const removeAddressHandler = function (schema, request) {
  const userId = requiresAuth.call(this, request);
  try {
    if (!userId) {
      new Response(
        404,
        {},
        {
          errors: ['The email you entered is not Registered. Not Found error'],
        }
      );
    }
    let userAddress = schema.users.findBy({
      _id: userId,
    }).address;

    const addressId = request.params.addressId;

    userAddress = userAddress.filter(item => item._id !== addressId);
    this.db.users.update(
      {
        _id: userId,
      },
      {
        address: userAddress,
      }
    );
    return new Response(
      200,
      {},
      {
        address: userAddress,
      }
    );
  } catch (error) {
    return new Response(
      500,
      {},
      {
        error,
      }
    );
  }
};

export const updateAddressHandler = function (schema, request) {
  const addressId = request.params.addressId;
  const userId = requiresAuth.call(this, request);
  try {
    if (!userId) {
      new Response(
        404,
        {},
        {
          errors: ['The email you entered is not Registered. Not Found error'],
        }
      );
    }
    const userAddress = schema.users.findBy({
      _id: userId,
    }).address;

    const {
      address: { name, street, city, state, country, zipCode, mobile },
    } = JSON.parse(request.requestBody);

    userAddress.forEach(address => {
      if (address._id === addressId) {
        address.name = name;
        address.street = street;
        address.city = city;
        address.state = state;
        address.country = country;
        address.zipCode = zipCode;
        address.mobile = mobile;
        address.updatedAt = formatDate();
      }
    });
    this.db.users.update(
      {
        _id: userId,
      },
      {
        address: userAddress,
      }
    );
    return new Response(
      200,
      {},
      {
        address: userAddress,
      }
    );
  } catch (error) {
    return new Response(
      500,
      {},
      {
        error,
      }
    );
  }
};
