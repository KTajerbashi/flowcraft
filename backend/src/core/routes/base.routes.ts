import { Router } from 'express';
import { Document } from 'mongoose';
import { BaseController } from '../controllers/base.controller';

export class BaseRoutes<T extends Document> {

  protected readonly router: Router;

  constructor(
    protected readonly controller: BaseController<T>
  ) {

    this.router = Router();

    this.initializeRoutes();
  }

  protected initializeRoutes(): void {

    this.router.get(
      '/',
      this.controller.getAll
    );

    this.router.get(
      '/:id',
      this.controller.getById
    );

    this.router.post(
      '/',
      this.controller.create
    );

    this.router.put(
      '/:id',
      this.controller.update
    );

    this.router.delete(
      '/:id',
      this.controller.delete
    );
  }

  getRouter(): Router {
    return this.router;
  }
}