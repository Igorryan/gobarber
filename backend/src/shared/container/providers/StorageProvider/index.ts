import { container } from 'tsyringe';
import uploadConfig from '@config/upload';

import IStorageProvider from '@shared/container/providers/StorageProvider/Models/IStorageProvider';
import DiskStorageProvider from '@shared/container/providers/StorageProvider/Implementations/DiskStorageProvider';
import S3StorageProvider from '@shared/container/providers/StorageProvider/Implementations/S3StorageProvider';

const providers = {
  disk: DiskStorageProvider,
  s3: S3StorageProvider
}

container.registerSingleton<IStorageProvider>(
  'StorageProvider',
  providers[uploadConfig.driver],
);
