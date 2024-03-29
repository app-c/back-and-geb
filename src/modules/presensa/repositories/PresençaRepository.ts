import { Presenca } from '@prisma/client';
import { IPresencaDto } from '@shared/dtos';

import { OrderPresenca, PrismaClient } from '.prisma/client';

import { IPresencaRespository } from './IPresençaRepository';

export class PresencaRepository implements IPresencaRespository {
   prisma = new PrismaClient();

   async create(data: IPresencaDto): Promise<Presenca> {
      const create = await this.prisma.presenca.create({
         data: {
            user_id: data.user_id,
         },
      });

      return create;
   }

   async create_order(data: IPresencaDto): Promise<OrderPresenca> {
      const create = await this.prisma.orderPresenca.create({
         data: {
            nome: data.nome,
            user_id: data.user_id,
         },
      });

      return create;
   }

   async listOrderWithId(user_id: string): Promise<null | OrderPresenca> {
      const list = await this.prisma.orderPresenca.findFirst({
         where: { user_id },
      });

      return list;
   }

   async listAllOrder(): Promise<OrderPresenca[]> {
      const list = await this.prisma.orderPresenca.findMany();
      return list;
   }

   async listAllPresenseWithUserId(user_id: string): Promise<Presenca[]> {
      const list = await this.prisma.presenca.findMany({ where: { user_id } });
      return list;
   }

   async deleteOrderPresenca(id: string): Promise<OrderPresenca> {
      const del = await this.prisma.orderPresenca.delete({ where: { id } });
      return del;
   }

   async listAllPresenca(): Promise<Presenca[]> {
      const list = await this.prisma.presenca.findMany();
      return list;
   }

   // async update(id: string, presenca: boolean): Promise<Presenca> {
   //    const up = await this.prisma.presenca.update({
   //       where: { id },
   //       data: {
   //          presenca,
   //       },
   //    });

   //    return up;
   // }

   // async list(user_id: string): Promise<Presenca[]> {
   //    const criate = await this.prisma.presenca.findMany({
   //       where: { user_id },
   //       include: { user: true },
   //    });

   //    return criate;
   // }

   // async listAll(): Promise<Presenca[]> {
   //    const criate = await this.prisma.presenca.findMany({
   //       include: { user: true },
   //    });

   //    return criate;
   // }
}
