import { Request, Response, NextFunction } from 'express'

interface AsyncFunction {
  (req: Request, res: Response): Promise<void>
}

const catchedAsync = (fn: AsyncFunction) => {
  return (req: Request, res: Response, next: NextFunction) => {
    fn(req, res).catch((error) => next(error))
  }
}

export default catchedAsync
