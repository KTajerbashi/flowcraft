import { Request, Response } from 'express';
import { Document } from 'mongoose';
import { BaseService } from '../services/base.service';

export class BaseController<T extends Document> {

  constructor(
    protected readonly service: BaseService<T>
  ) {}

  getAll = async (
    req: Request,
    res: Response
  ): Promise<void> => {

    try {

      const data = await this.service.getAll();

      res.status(200).json({
        success: true,
        data
      });

    } catch (error) {

      res.status(500).json({
        success: false,
        message: 'Internal server error.'
      });
    }
  };

  getById = async (
    req: Request,
    res: Response
  ): Promise<void> => {

    try {

      const data = await this.service.getById(
        req.params.id
      );

      if (!data) {

        res.status(404).json({
          success: false,
          message: 'Record not found.'
        });

        return;
      }

      res.status(200).json({
        success: true,
        data
      });

    } catch (error) {

      res.status(500).json({
        success: false,
        message: 'Internal server error.'
      });
    }
  };

  create = async (
    req: Request,
    res: Response
  ): Promise<void> => {

    try {

      const data = await this.service.create(
        req.body
      );

      res.status(201).json({
        success: true,
        data
      });

    } catch (error) {

      res.status(500).json({
        success: false,
        message: 'Internal server error.'
      });
    }
  };

  update = async (
    req: Request,
    res: Response
  ): Promise<void> => {

    try {

      const data = await this.service.update(
        req.params.id,
        req.body
      );

      if (!data) {

        res.status(404).json({
          success: false,
          message: 'Record not found.'
        });

        return;
      }

      res.status(200).json({
        success: true,
        data
      });

    } catch (error) {

      res.status(500).json({
        success: false,
        message: 'Internal server error.'
      });
    }
  };

  delete = async (
    req: Request,
    res: Response
  ): Promise<void> => {

    try {

      const data = await this.service.delete(
        req.params.id
      );

      if (!data) {

        res.status(404).json({
          success: false,
          message: 'Record not found.'
        });

        return;
      }

      res.status(200).json({
        success: true,
        data
      });

    } catch (error) {

      res.status(500).json({
        success: false,
        message: 'Internal server error.'
      });
    }
  };
}