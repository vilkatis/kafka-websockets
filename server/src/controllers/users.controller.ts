import { Body, JsonController, Param, Post } from 'routing-controllers';
import { UsersService } from '../services';
import { Container } from 'typedi';
import { AddProductRequest } from '../validation';

@JsonController('/users')
export class UsersController {
  private _usersService: UsersService;

  constructor() {
    this._usersService = Container.get(UsersService);
  }

  @Post('/:userId/products')
  public async addProduct(@Param('userId') userId: string, @Body() request: AddProductRequest): Promise<unknown> {
    console.log(`Controller: add product for userId ${userId}`, request);
    await this._usersService.addProduct(userId, request.productName);
    return { status: 'success' };
  }
}
