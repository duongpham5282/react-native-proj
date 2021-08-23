export const HTTP_404_ERROR = 'HTTP_404_ERROR';
export const HTTP_401_ERROR = 'HTTP_401_ERROR';
export const HTTP_403_ERROR = 'HTTP_403_ERROR';
export const HTTP_500_ERROR = 'HTTP_500_ERROR';
export const HTTP_OTHER_ERROR = 'HTTP_OTHER_ERROR';

export function HTTP500Error(message) {
  this.message = message;
  this.name = 'Internal Server Error';
  this.status = 500;
}

export function HTTP403Error(message) {
  this.message = message;
  this.name = 'Access denied';
  this.status = 403;
}

export function HTTP401Error(message) {
  this.message = message;
  this.name = 'Login required';
  this.status = 401;
}

// Usage
// throw new HTTP401Error('No token');
