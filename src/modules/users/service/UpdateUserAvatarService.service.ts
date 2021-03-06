import { Err } from '@shared/errors/AppError';
import IStorageProvider from '@shared/StorageProvider/models/IStorageProviders';
import { inject, injectable } from 'tsyringe';

import { PrismaClient, User } from '.prisma/client';

import { IUsersRepository } from '../repositories/IUsersRespository';

interface IUsers {
   avatar: string;
}
@injectable()
export class UpdateUserAvatarService {
   constructor(
      @inject('PrismaUser')
      private userRepository: IUsersRepository,

      @inject('Storage')
      private storage: IStorageProvider,
   ) {}

   async execute({ avatar }: IUsers): Promise<any> {
      await this.storage.deleteFile(avatar, 'avatar');
      const res = await this.storage.saveFile(avatar, 'avatar');
      const url = `https://geb-app.s3.us-east-2.amazonaws.com/avatar/${res}`;
      return url;
   }
}
