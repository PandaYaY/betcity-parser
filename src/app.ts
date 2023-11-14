import { container, singleton } from "tsyringe";
import { serviceStaticTypes as SST } from "./staticTypes";
import { Configuration } from "./configuration";
import { DataBasePool } from "./dataBasePool";
import { Scrapper } from "./betsityApi";

@singleton()
export class Application {
  constructor(private readonly config: Configuration) {}

  async init() {
    await this.config.start();
    this.initDbs();
  }

  async main() {
    await this.init();

    const scrapper = container.resolve(Scrapper);
    await scrapper.start();
  }

  private initDbs() {
    const bookOddsDb = new DataBasePool(this.config.bookOddsDbConfiguration);
    container.registerInstance(SST.BookOddsDb, bookOddsDb);

    const oddsScanDb = new DataBasePool(this.config.oddsScanDbConfiguration);
    container.registerInstance(SST.OddsScanDb, oddsScanDb);
  }
}
