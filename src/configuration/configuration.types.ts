import { Configurator, DefaultTypeParser } from "configurator-watcher";

export interface IConfigOptions {
  BETCITY_API_URL: string;
  // Db
  BOOK_ODDS_HOST: string;
  BOOK_ODDS_PORT: number;
  BOOK_ODDS_USER: string;
  BOOK_ODDS_PASSWORD: string;
  BOOK_ODDS_DATABASE: string;
  ODDS_SCAN_HOST: string;
  ODDS_SCAN_PORT: number;
  ODDS_SCAN_USER: string;
  ODDS_SCAN_PASSWORD: string;
  ODDS_SCAN_DATABASE: string;
  PROXIES: string[];
}

export type BetcityConfigurator = Configurator<
  IConfigOptions,
  DefaultTypeParser
>;
