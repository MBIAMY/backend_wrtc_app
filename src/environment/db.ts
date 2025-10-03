import {DataSourceOptions} from "typeorm/data-source/DataSourceOptions";
import {TextMessageEntity} from "../domain/entity/text-message-entity";
import {UserEntity} from "../domain/entity/user-entity";

export const dbDatasourceOptions: DataSourceOptions = {
    type: "mysql",
    host: "metro.proxy.rlwy.net", // ✅ seulement l’hôte
    port: 26847, // ✅ récupéré de l’URL
    username: "root",
    password: "oTsDpWBniRbAfomXFoKJxvCxGLPUtqCC",
    database: "railway",

    synchronize: true,
    logging: false,
    charset: "utf8mb4",
    entities: [TextMessageEntity, UserEntity],
    migrations: [],
    subscribers: [],
};
