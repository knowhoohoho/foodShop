import { AuthGuard } from "@nestjs/passport";


export class GuardJwt extends AuthGuard('jwt') {}