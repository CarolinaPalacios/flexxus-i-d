import { Article } from "@prisma/client";
import { prisma } from "../../prisma";
import { CreateArticleDto, UpdateArticleDto } from "../../dto/articles";

const getAll = async (
  page: number,
  limit: number,
  name?: string,
  active?: string
) => {
  const offset = (page - 1) * limit;

  const parsedActive =
    active === "true" ? true : active === "false" ? false : undefined;

  let where = {};
  if (name && active !== undefined) {
    where = {
      AND: [{ name: { equals: name } }, { active: parsedActive }],
    };
  } else if (name) {
    where = { name: { contains: name } };
  } else if (active !== undefined) {
    where = { active: parsedActive };
  }

  const articles = await prisma.article.findMany({
    where,
    skip: offset,
    take: limit,
  });

  const total = await prisma.article.count({ where });
  const totalPages = Math.ceil(total / limit);

  return { articles, total, page, totalPages };
};

const getOne = async (id: string): Promise<Article | null> => {
  return await prisma.article.findUnique({ where: { id } });
};

const create = async (article: CreateArticleDto): Promise<Article> => {
  return await prisma.article.create({
    data: {
      name: article.name,
      brand: article.brand,
      active: true,
    },
  });
};

const update = async (
  id: string,
  article: UpdateArticleDto
): Promise<Article | null> => {
  const existing = await getOne(id);

  if (!existing) return null;

  const updated = await prisma.article.update({
    where: { id },
    data: {
      ...article,
      updatedAt: new Date(),
    },
  });

  return updated;
};

const remove = async (id: string) => {
  const existing = await getOne(id);

  if (!existing) return;

  const deleted = await prisma.article.update({
    where: { id },
    data: { active: false },
  });

  return deleted;
};

export default { getAll, getOne, create, update, remove };
