import { Pool } from "pg";

export class DataBasePool extends Pool {
  async none(query: string, values: any[] = []): Promise<void> {
    await this.query(query, values);
  }

  async one(query: string, values: any[] = []): Promise<any> {
    const result = await this.query(query, values);
    if (result.rows.length !== 1) {
      throw Error(`Must returns one row, but returns ${result.rows.length}`);
    }
    return result.rows[0];
  }

  async any(query: string, values: any[] = []): Promise<any[]> {
    const result = await this.query(query, values);
    return result.rows;
  }
}
