import axios, { AxiosError } from "axios";
import { Request, Response } from "express";
import { response } from "../utils";

const getAll = async (req: Request, res: Response) => {
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const { name, active }: { name?: string; active?: boolean } = req.query;

  if (name && active) {
    const { data } = await axios.get(
      `http://database:3003/articles?page=${page}&limit=${limit}&name=${name}&active=${active}`
    );

    const { articles, total, page: p, totalPages } = data.data;

    return response(res, 200, {
      articles,
      total,
      page: p,
      totalPages,
    });
  } else if (name) {
    const { data } = await axios.get(
      `http://database:3003/articles?page=${page}&limit=${limit}&name=${name}`
    );

    const { articles, total, page: p, totalPages } = data.data;

    return response(res, 200, {
      articles,
      total,
      page: p,
      totalPages,
    });
  } else if (active) {
    const { data } = await axios.get(
      `http://database:3003/articles?page=${page}&limit=${limit}&active=${active}`
    );

    const { articles, total, page: p, totalPages } = data.data;

    return response(res, 200, {
      articles,
      total,
      page: p,
      totalPages,
    });
  } else {
    const { data } = await axios.get(
      `http://database:3003/articles?page=${page}&limit=${limit}`
    );

    const { articles, total, page: p, totalPages } = data.data;

    return response(res, 200, {
      articles,
      total,
      page: p,
      totalPages,
    });
  }
};

const getOne = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const { data } = await axios.get(`http://database:3003/articles/${id}`);

    return response(res, 200, data.data);
  } catch (error) {
    if (error instanceof AxiosError) {
      return response(
        res,
        error.response?.status || 500,
        error.response?.data.data
      );
    }
  }
};

const create = async (req: Request, res: Response) => {
  const { name, brand }: { name: string; brand: string } = req.body;

  try {
    const { data } = await axios.post(`http://database:3003/articles`, {
      name,
      brand,
    });

    return response(res, 201, data.data);
  } catch (error) {
    if (error instanceof AxiosError) {
      return response(
        res,
        error.response?.status || 500,
        error.response?.data.data
      );
    }
  }
};

const update = async (req: Request, res: Response) => {
  const { id } = req.params;
  const {
    name,
    brand,
    active,
  }: { name?: string; brand?: string; active?: boolean } = req.body;

  try {
    const { data } = await axios.put(`http://database:3003/articles/${id}`, {
      name,
      brand,
      active,
    });

    if (data) {
      return response(res, 200, data.data);
    } else {
      return response(res, 404, {
        error: true,
        message: "Article not found",
      });
    }
  } catch (error) {
    if (error instanceof AxiosError) {
      return response(
        res,
        error.response?.status || 500,
        error.response?.data.data
      );
    }
  }
};

const remove = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    await axios.delete(`http://database:3003/articles/${id}`);

    return response(res, 204, null);
  } catch (error) {
    if (error instanceof AxiosError) {
      return response(
        res,
        error.response?.status || 500,
        error.response?.data.data
      );
    }
  }
};

export default { getAll, getOne, create, update, remove };
