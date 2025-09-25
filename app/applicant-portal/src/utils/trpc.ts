import { createTRPCReact } from '@trpc/react-query';
import type {AppRouter } from '../../../api/src/core/_app';

/** 
 *  The critical entry point for connection between the backedn and frontend. This should be seperated from the rest of the app logic to avoid calls outside of the client. 
 **/
export const trpc = createTRPCReact<AppRouter>();
