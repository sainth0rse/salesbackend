"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const common_1 = require("@nestjs/common");
async function bootstrap() {
    const logger = new common_1.Logger('Bootstrap');
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.useLogger(logger);
    await app.listen(3000);
    logger.log('Application is running on: http://localhost:3000');
}
bootstrap().catch((err) => {
    console.error('Application failed to start:', err);
    process.exit(1);
});
//# sourceMappingURL=main.js.map