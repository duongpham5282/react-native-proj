import { action } from 'actions/action-creator';

// TODO: Sorry or that. Quick fix. Good solution - rewrite ALL this s after juniors without code review
export const EXPORT_PDF_ACTION_TYPE = 'EXPORT_PDF';

export default action(EXPORT_PDF_ACTION_TYPE);
export const SUCCESS = 'Success';
export const FAILED = 'Failed';
export const LOADING = 'Loading';
