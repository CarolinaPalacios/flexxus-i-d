import { Request, Response } from "express";
import service from "../../services/articles";
import { response } from "../../utils";

const getAll = async (req: Request, res: Response) => {
  const { name, active }: { name?: string; active?: string } = req.query;
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;

  const articles = await service.getAll(page, limit, name, active);

  return response(res, 200, articles);
};

const getOne = async (req: Request, res: Response) => {
  const { id } = req.params;

  const article = await service.getOne(id);

  if (article) {
    return response(res, 200, article);
  } else {
    return response(res, 404, {
      error: true,
      message: "Article not found",
    });
  }
};

const create = async (req: Request, res: Response) => {
  const { name, brand } = req.body;
  if (!name || !brand) {
    return response(res, 400, {
      error: true,
      message: "Name and brand are required",
    });
  }
  try {
    const article = await service.create(req.body);
    return response(res, 201, article);
  } catch (error) {
    if (error instanceof Error) {
      return response(res, 400, {
        error: true,
        message: error.message,
      });
    }
  }
};

const update = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const article = await service.update(id, req.body);
    if (article) {
      return response(res, 200, article);
    }

    return response(res, 404, {
      error: true,
      message: "Article not found",
    });
  } catch (error) {
    if (error instanceof Error) {
      return response(res, 400, {
        error: true,
        message: error.message,
      });
    }
  }
};

const remove = async (req: Request, res: Response) => {
  const { id } = req.params;

  const article = await service.remove(id);

  if (article) {
    return response(res, 204, null);
  }

  return response(res, 404, {
    error: true,
    message: "Article not found",
  });
};

export default { getAll, getOne, create, update, remove };
