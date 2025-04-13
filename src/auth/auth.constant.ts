import { SetMetadata } from '@nestjs/common';
import { AdminCallback, AuthCallback, SelfHandleCallback } from './auth.type';

export const IS_PUBLIC_KEY = 'isPublic';
export const IS_ROLE_DEPENDENT = 'isRoleDependent';

export const SELF = new SelfHandleCallback();
export const ADMIN = new AdminCallback();

export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);
export const RoleDependent = (callback: AuthCallback) =>
  SetMetadata(IS_ROLE_DEPENDENT, callback);
