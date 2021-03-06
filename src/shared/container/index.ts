import { IPostsRepository } from '@modules/posts/repositories/IPostRepositoty';
import { PostRepository } from '@modules/posts/repositories/PostRepository';
import { IUsersRepository } from '@modules/users/repositories/IUsersRespository';
import { UsersRespository } from '@modules/users/repositories/UsersRespository';
import { DiskStorageProvider } from '@shared/StorageProvider/implementations/DiskStorageProvider';
import { S3Storage } from '@shared/StorageProvider/implementations/S3Storage';
import IStorageProvider from '@shared/StorageProvider/models/IStorageProviders';
import { container } from 'tsyringe';

import { ConsumoRepository } from '../../modules/consumo/repositories/ConsumoRepository';
import { IConsumoRepository } from '../../modules/consumo/repositories/IConsumoRepository';
import { IPresencaRespository } from '../../modules/presensa/repositories/IPresen├žaRepository';
import { PresencaRepository } from '../../modules/presensa/repositories/Presen├žaRepository';
import { ITransactionRepository } from '../../modules/transaction/repositories/ITransactionRespository';
import { TransactionRepository } from '../../modules/transaction/repositories/TransactionRepository';

// const providers = {
//    disk: DiskStorageProvider,
//    s3: S3StoreageProvider,
// };

container.registerSingleton<IUsersRepository>('PrismaUser', UsersRespository);
container.registerSingleton<IPostsRepository>('PrismaPost', PostRepository);
container.registerSingleton<IConsumoRepository>(
   'PrismaConsumo',
   ConsumoRepository,
);
container.registerSingleton<ITransactionRepository>(
   'PrismaTransaction',
   TransactionRepository,
);

container.registerSingleton<IStorageProvider>('Storage', S3Storage);

container.registerSingleton<IPresencaRespository>(
   'Presenca',
   PresencaRepository,
);
