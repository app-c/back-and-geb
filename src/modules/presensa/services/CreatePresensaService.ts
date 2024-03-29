/* eslint-disable consistent-return */
/* eslint-disable array-callback-return */
import { Presenca } from '@prisma/client';
import ICacheProvider from '@shared/container/providers/model/ICacheProvider';
import { Err } from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';

import { IPresencaRespository } from '../repositories/IPresençaRepository';

interface IProps {
   user_id: string;
   nome: string;
}

@injectable()
export class CreatePresencaService {
   constructor(
      @inject('Presenca')
      private presencaRepository: IPresencaRespository,

      @inject('Cache')
      private cache: ICacheProvider,
   ) {}

   async execute({ user_id, nome }: IProps): Promise<Presenca> {
      const find = await this.presencaRepository.listOrderWithId(user_id);

      if (!find) {
         throw new Err('Não há orderm de presença para validar');
      }

      if (find) {
         const del = await this.presencaRepository.deleteOrderPresenca(find.id);
         console.log(del);
      }
      const create = await this.presencaRepository.create({
         user_id,
         nome,
      });

      await this.cache.invalidate('orderPresenca');
      await this.cache.invalidatePrefix('orderPresenca');

      return create;
   }
}
