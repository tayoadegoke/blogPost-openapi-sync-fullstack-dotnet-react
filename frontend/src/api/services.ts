// Wrapper services to maintain backward compatibility with the old API structure
import {
  getApiUsers,
  getApiUsersById,
  postApiUsers,
  putApiUsersById,
  deleteApiUsersById,
  getApiProducts,
  getApiProductsById,
  postApiProducts,
  putApiProductsById,
  deleteApiProductsById,
} from './sdk.gen';
import type { User, Product } from './types.gen';

export class UsersService {
  public static async getApiUsers(): Promise<Array<User>> {
    const response = await getApiUsers();
    return response.data as Array<User>;
  }

  public static async getApiUsers1(id: number): Promise<User> {
    const response = await getApiUsersById({ path: { id } });
    return response.data as User;
  }

  public static async postApiUsers(requestBody: User): Promise<User> {
    const response = await postApiUsers({ body: requestBody });
    return response.data as User;
  }

  public static async putApiUsers(id: number, requestBody: User): Promise<void> {
    await putApiUsersById({ path: { id }, body: requestBody });
  }

  public static async deleteApiUsers(id: number): Promise<void> {
    await deleteApiUsersById({ path: { id } });
  }
}

export class ProductsService {
  public static async getApiProducts(): Promise<Array<Product>> {
    const response = await getApiProducts();
    return response.data as Array<Product>;
  }

  public static async getApiProducts1(id: number): Promise<Product> {
    const response = await getApiProductsById({ path: { id } });
    return response.data as Product;
  }

  public static async postApiProducts(requestBody: Product): Promise<Product> {
    const response = await postApiProducts({ body: requestBody });
    return response.data as Product;
  }

  public static async putApiProducts(id: number, requestBody: Product): Promise<void> {
    await putApiProductsById({ path: { id }, body: requestBody });
  }

  public static async deleteApiProducts(id: number): Promise<void> {
    await deleteApiProductsById({ path: { id } });
  }
}
