const Constants = {
  STATUS: {
    OK: 200 && 201,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    NOT_FOUND: 404,
    CONFLICT: 409,
    INTERNAL_SERVER_ERROR: 500,
  },
};

window.$constants = Constants;

export default Constants;
