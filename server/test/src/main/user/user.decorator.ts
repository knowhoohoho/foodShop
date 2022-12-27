import {createParamDecorator, ExecutionContext} from '@nestjs/common'

export  const CurrentUser = createParamDecorator(
     async (data: unknown, ctx : ExecutionContext) => {
          const request = await ctx.switchToHttp().getRequest();
          return request.body.email ?? null;
      }
)