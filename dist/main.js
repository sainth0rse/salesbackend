"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
async function bootstrap() {
    const logger = new common_1.Logger('Bootstrap');
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.useLogger(logger);
    const config = new swagger_1.DocumentBuilder()
        .setTitle('SalesStep API')
        .setDescription('API documentation for SalesStep application')
        .setVersion('1.0')
        .addBearerAuth()
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, config);
    swagger_1.SwaggerModule.setup('api', app, document);
    await app.listen(3000);
    logger.log('Application is running on: http://localhost:3000');
    logger.log('API documentation available on: http://localhost:3000/api');
}
bootstrap().catch((err) => {
    console.error('Application failed to start:', err);
    process.exit(1);
});
//# sourceMappingURL=main.js.map