import { Module } from '@nestjs/common';
import { DEFAULT_DATABASE_TOKEN } from './database.interface';
import {
  ConfigurableModuleClass,
  OPTIONS_TYPE,
} from './database.module-definition';
import { databaseProvider, dynamicDatabaseProvider } from './database.provider';

@Module({})
export class DatabaseModule extends ConfigurableModuleClass {
  static register(options: typeof OPTIONS_TYPE) {
    const definition = super.register(options);

    let provider = databaseProvider();

    const connection = options.connection;

    if (connection) {
      const parts = connection.split(':');

      if (
        parts.length >= 2 &&
        ['sqlite', 'mysql', 'pgsql'].indexOf(parts[1]) !== -1
      ) {
        provider = dynamicDatabaseProvider(connection);
      }
    }

    definition.providers = definition.providers
      ? [...definition.providers, provider]
      : [provider];
    definition.exports = definition.exports
      ? [...definition.exports, connection ?? DEFAULT_DATABASE_TOKEN]
      : [connection ?? DEFAULT_DATABASE_TOKEN];

    return {
      global: options.global,
      ...definition,
    };
  }
}
