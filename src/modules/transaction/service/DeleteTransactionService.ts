import { Err } from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';

import { ITransactionRepository } from '../repositories/ITransactionRespository';

interface Props {
   id: string;
}

@injectable()
export class DeleteTransactionService {
   constructor(
      @inject('PrismaTransaction')
      private transactionRepository: ITransactionRepository,
   ) {}

   async execute({ id }: Props): Promise<void> {
      const transaction = await this.transactionRepository.findTransactionById(
         id,
      );

      if (!transaction) {
         throw new Err('transação nao encontrada');
      }

      await this.transactionRepository.delete(transaction.id);
   }
}
