import { AppDataSource } from "./data/data-source/db-datasouce";
import {authController, controllers, initializeControllers} from "./domain/controllers-and-services";
import {verifyJwtAccessToken} from "./utils/jwt-utils";
import {AsklessServer} from "askless";
import * as dotenv from "dotenv";
import * as express from "express";


dotenv.config();

AppDataSource.initialize().then(async () => {
    const server = new AsklessServer<number>();

    initializeControllers(server);

    // initializing all controllersAndServices
    for (let controller of controllers()) {
        controller.initializeRoutes(server);
    }

    const wsPort:number = Number(process.env.WS_PORT || 3000);
    server.init({
        wsOptions: { port: wsPort, },
        debugLogs: false,
        sendInternalErrorsToClient: false,
        requestTimeoutInMs: 7 * 1000,
        authenticate: async (credential, accept, reject) : Promise<void> => {
            if (credential && credential["accessToken"]) {
                const result = verifyJwtAccessToken(credential["accessToken"]);
                if (!result.valid) {
                    reject({credentialErrorCode: "EXPIRED_ACCESS_TOKEN"});
                    return;
                }
                accept.asAuthenticatedUser({ userId: result.userId,  });
                return;
            }

            reject({credentialErrorCode: "MISSING_CREDENTIAL"});
        },
    });

    server.start();
    console.log("WebSocket started on "+server.localUrl);

    // HTTP health-check server
    const app = express();
    app.get('/health', (_req, res) => {
        res.status(200).json({ status: 'ok', time: new Date().toISOString() });
    });
    const httpPort:number = Number(process.env.HTTP_PORT || 3001);
    app.listen(httpPort, () => console.log(`Healthcheck listening on http://localhost:${httpPort}/health`));

}).catch(databaseError => console.log(databaseError))
