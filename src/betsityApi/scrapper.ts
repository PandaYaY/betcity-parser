import { singleton } from "tsyringe";
import { Configuration } from "../configuration";
import { HttpsProxyAgent } from "https-proxy-agent";
import fetch from "node-fetch";

@singleton()
export class Scrapper {
  private apiUrl: string;
  private cookie: string;
  constructor(private readonly config: Configuration) {
    this.apiUrl = this.config.betCityApiUrl;
  }

  async start() {
    await this.getCookie();
    console.log(this.cookie);
    // this.getData();
  }

  private async getCookie() {
    const proxy = this.getRandomProxy();
    const proxyAgent = new HttpsProxyAgent(proxy);
    const response = await fetch(
      "https://betcity.ru/",
      {
        method: "get",
        agent: proxyAgent,
      }
    );

    const newCookie = response.headers.get('set-cookie');
    this.cookie = newCookie;
  }

  private async getData() {
    const headers = {
      cookie: this.cookie,
      accept: "application/json, text/plain, */*",
      "accept-encoding": "gzip, deflate, br",
      "accept-language": "ru,en;q=0.9",
      "content-type": "application/x-www-form-urlencoded",
      origin: "https://betcity.ru",
      Referer: "https://betcity.ru/",
      "sec-ch-ua":
        '"Chromium";v="116", "Not)A;Brand";v="24", "YaBrowser";v="23"',
      "sec-ch-ua-mobile": "?0",
      "sec-ch-ua-platform": '"Windows"',
      "sec-fetch-dest": "empty",
      "sec-fetch-mode": "cors",
      "sec-fetch-site": "same-site",
      "user-agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 Safari/537.36",
    };

    const proxyAgent = new HttpsProxyAgent("http://10.1.8.31:31243");

    const response = await fetch(
      this.apiUrl,
      // "https://api.myip.com",
      {
        method: "get",
        agent: proxyAgent,
        headers: headers,
        
      }
    );

    const res = await response.text();
    console.log(res);
  }

  private getRandomProxy(): string {
    const proxies = this.config.proxies;
    const index = Math.floor(Math.random() * (proxies.length - 1));
    return proxies[index];
  }
}
