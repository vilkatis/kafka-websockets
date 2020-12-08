import { from } from 'env-var';
import { Service } from 'typedi';

/**
 * Process env service injection.
 */
export const ENV = Service(() => {
  return from(process.env);
});
