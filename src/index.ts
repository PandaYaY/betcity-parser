import "reflect-metadata";
import { Application } from "./app";
import { container } from "tsyringe";

const app = container.resolve(Application);

app
  .main()
  .then(() => console.log("started"))
  .catch((err) => {
    console.log(`ERROR: ${err}, stack: ${err.stack}`);
    process.exit(5);
  });
