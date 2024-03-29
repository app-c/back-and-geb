import { CreateOrderPresencaService } from '@modules/presensa/services/CreateOrderPresençaService';
import { CreatePresencaService } from '@modules/presensa/services/CreatePresensaService';
import { GlobalPontsPresencaService } from '@modules/presensa/services/GlobalPontsPresencaService';
import { ListAllOrderPresensaService } from '@modules/presensa/services/ListAllOrderPresencaService';
import { ListPresencaUseraService } from '@modules/presensa/services/ListPresencaUserService';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

export class PresensaController {
   async create(req: Request, res: Response): Promise<Response> {
      const service = container.resolve(CreatePresencaService);
      const { user_id, nome } = req.body;

      const create = await service.execute({
         user_id,
         nome,
      });

      return res.json(create);
   }

   async createOrder(req: Request, res: Response): Promise<Response> {
      const service = container.resolve(CreateOrderPresencaService);
      const { user_id, nome } = req.body;

      const create = await service.execute({
         user_id,
         nome,
      });

      return res.json(create);
   }

   // async update(req: Request, res: Response): Promise<Response> {}

   async listAllOrder(req: Request, res: Response): Promise<Response> {
      const service = container.resolve(ListAllOrderPresensaService);

      const list = await service.execute();
      return res.json(list);
   }

   async listAllPresecaUser(req: Request, res: Response): Promise<Response> {
      const service = container.resolve(ListPresencaUseraService);
      const user_id = req.user.id;

      const list = await service.execute({ user_id });

      return res.json(list);
   }

   async rank(req: Request, res: Response): Promise<Response> {
      const service = container.resolve(GlobalPontsPresencaService);

      const list = await service.execute();

      return res.json(list);
   }

   // async rank(req: Request, res: Response): Promise<Response> {}
   // async rank(req: Request, res: Response): Promise<Response> {}
   // async rank(req: Request, res: Response): Promise<Response> {}
}
