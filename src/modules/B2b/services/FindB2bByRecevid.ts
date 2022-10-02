import { IUsersRepository } from '@modules/users/repositories/IUsersRespository';
import { B2b } from '@prisma/client';
import ICacheProvider from '@shared/container/providers/model/ICacheProvider';
import { Err } from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';

import { IB2bRepository } from '../repositories/IB2bRepository';

@injectable()
export class FindB2bByRecevid {
   constructor(
      @inject('PrismaB2b')
      private b2bRepository: IB2bRepository,

      @inject('Cache')
      private cache: ICacheProvider,
   ) {}

   async execute(id: string): Promise<B2b[]> {
      let find = await this.cache.recover<B2b[]>(`b2bReci:${id}`);

      if (!find) {
         find = await this.b2bRepository.findB2bByRecevidId(id);

         await this.cache.save(`b2bReci:${id}`, find);
         console.log('passou no banco');
      }

      if (!find) {
         throw new Err('usuário nao encontrado');
      }

      return find;
   }
}
