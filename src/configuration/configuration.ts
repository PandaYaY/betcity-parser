import {
  Configurator,
  DefaultTypeParser,
  DotEnvFileProvider,
  IConfiguratorOptions,
} from "configurator-watcher";
import { BetcityConfigurator, IConfigOptions } from "./configuration.types";
import { autoInjectable, singleton } from "tsyringe";
import { PoolConfig } from "pg";

@singleton()
@autoInjectable()
export class Configuration {
  public serviceName = "betcity-parser";
  private envConfigurator: BetcityConfigurator;

  constructor() {
    const confEnv: IConfiguratorOptions<IConfigOptions> = {
      providers: [new DotEnvFileProvider<IConfigOptions>({ path: ".env" })],
      parser: new DefaultTypeParser(),
    };
    this.envConfigurator = new Configurator<IConfigOptions, DefaultTypeParser>(
      confEnv
    );
  }

  async start(): Promise<void> {
    await this.envConfigurator.start();
  }

  get betCityApiUrl(): string {
    return this.envConfigurator.getConfigValue<string>(
      "BETCITY_API_URL",
      "string"
    );
  }

  get proxies(): string[] {
    return this.envConfigurator.getConfigValue<string[]>(
      "PROXIES",
      "strArray"
    );
  }

  private get oddsScanHost(): string {
    return this.envConfigurator.getConfigValue<string>(
      "ODDS_SCAN_HOST",
      "string"
    );
  }
  private get oddsScanPort(): number {
    return this.envConfigurator.getConfigValue(
      "ODDS_SCAN_PORT",
      "integer",
      5432
    );
  }
  private get oddsScanUser(): string {
    return this.envConfigurator.getConfigValue<string>(
      "ODDS_SCAN_USER",
      "string"
    );
  }
  private get oddsScanPassword(): string {
    return this.envConfigurator.getConfigValue<string>(
      "ODDS_SCAN_PASSWORD",
      "string"
    );
  }
  private get oddsScanDatabase(): string {
    return this.envConfigurator.getConfigValue<string>(
      "ODDS_SCAN_DATABASE",
      "string"
    );
  }

  get oddsScanDbConfiguration(): PoolConfig {
    return {
      host: this.oddsScanHost,
      port: this.oddsScanPort,
      user: this.oddsScanUser,
      password: this.oddsScanPassword,
      database: this.oddsScanDatabase,
      min: 1,
      max: 4,
      idleTimeoutMillis: 0,
      application_name: this.serviceName,
    };
  }

  private get bookOddsHost(): string {
    return this.envConfigurator.getConfigValue<string>(
      "BOOK_ODDS_HOST",
      "string"
    );
  }
  private get bookOddsPort(): number {
    return this.envConfigurator.getConfigValue(
      "BOOK_ODDS_PORT",
      "integer",
      5432
    );
  }
  private get bookOddsUser(): string {
    return this.envConfigurator.getConfigValue<string>(
      "BOOK_ODDS_USER",
      "string"
    );
  }
  private get bookOddsPassword(): string {
    return this.envConfigurator.getConfigValue<string>(
      "BOOK_ODDS_PASSWORD",
      "string"
    );
  }
  private get bookOddsDatabase(): string {
    return this.envConfigurator.getConfigValue<string>(
      "BOOK_ODDS_DATABASE",
      "string"
    );
  }

  get bookOddsDbConfiguration(): PoolConfig {
    return {
      host: this.bookOddsHost,
      port: this.bookOddsPort,
      user: this.bookOddsUser,
      password: this.bookOddsPassword,
      database: this.bookOddsDatabase,
      min: 1,
      max: 4,
      idleTimeoutMillis: 0,
      application_name: this.serviceName,
    };
  }
}
