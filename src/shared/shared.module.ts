import { Global, Module, Provider } from "@nestjs/common";
import { ApiConfigService } from "./services/api-config.service";
import { PrismaService } from "./services/prisma.service";

const providers: Provider[] = [
	ApiConfigService, 
	PrismaService,
]

@Global()
@Module({
	providers:[...providers],
	exports: [...providers],
})

export class SharedModule {}