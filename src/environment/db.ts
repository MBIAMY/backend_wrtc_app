import {DataSourceOptions} from "typeorm/data-source/DataSourceOptions";
import {TextMessageEntity} from "../domain/entity/text-message-entity";
import {UserEntity} from "../domain/entity/user-entity";

export const dbDatasourceOptions: DataSourceOptions = {
    // TODO: replace with your database configuration in the fields bellow:
       //localhost 127.0.0.1
    type: "mysql",
    host: "mysql://root:oTsDpWBniRbAfomXFoKJxvCxGLPUtqCC@metro.proxy.rlwy.net:26847/railway",
    port: 3306,
    username: "root",
    password: "oTsDpWBniRbAfomXFoKJxvCxGLPUtqCC",
    database: "railway",

    // No need to change this fields bellow
    synchronize: true,
    logging: false,
    charset : 'utf8mb4',
    entities: [TextMessageEntity, UserEntity],
    migrations: [],
    subscribers: [],
}
