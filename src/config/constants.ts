interface IConstants {
  APP_NAME: any;
  PORT: any;
  NODE_ENV: any;
  APP_BASE_URL: any;
  DATABASE_URL: any;
  TEST_DB_URL: any;
  JWT_SECRET: any;
  AUTHORIZATION_SCHEME: any;
  PERPAGE: any;
  EMAIL_URL: any;
  EMAIL_SENDER: any;
  //   OTP_EXPIRATION_TIME: any;
  //   SMS_URL: any;
  //   SMS_SENDER_ID: any;
  //   AWS_BUCKET_NAME: any;
  //   AWS_FOLDER_NAME: any;
  //   AWS_REGION: any;
  //   AWS_ACCESS_KEY: any;
  //   AWS_SECRECT_ACCESS_KEY: any;
}

export const constants: IConstants = {
  /** Application name from .env */
  APP_NAME: process.env.APP_NAME || "SE-GRMS",

  /** Application port from .env */
  PORT: process.env.NODE_ENV === "test" ? 4000 : process.env.PORT || 3000,

  /** Application environment from .env */
  NODE_ENV: process.env.NODE_ENV,

  /** Application base url from .env */
  APP_BASE_URL: process.env.APP_BASE_URL,

  /** Database url from .env*/
  DATABASE_URL: process.env.DATABASE_URL,

  /** Database used on testing environment */
  TEST_DB_URL:
    process.env.TEST_DB_URL || "mongodb://localhost:27017/se_grms_test_db",

  /** Jwt secret from .env */
  JWT_SECRET: process.env.JWT_SECRET || "kakakuona",

  /** Authorization scheme for jwt */
  AUTHORIZATION_SCHEME: process.env.AUTHORIZATION_SCHEME || "Bearer",

  /** Perpage number from .env */
  PERPAGE: (process.env.PERPAGE as unknown as number) || 15,

  /** Email url from .env */
  EMAIL_URL: process.env.EMAIL_URL,

  /** Email sender from .env */
  EMAIL_SENDER: process.env.EMAIL_SENDER,

  /** Otp expiration time from .env */
  //   OTP_EXPIRATION_TIME: process.env.OTP_EXPIRATION_TIME || 10,

  /** Sms url from .env */
  //   SMS_URL: process.env.SMS_URL,

  /** Sms sender id from .env */
  //   SMS_SENDER_ID: process.env.SMS_SENDER_ID,

  //   AWS_BUCKET_NAME: process.env.AWS_BUCKET_NAME,
  //   AWS_FOLDER_NAME: process.env.AWS_FOLDER_NAME,
  //   AWS_REGION: process.env.AWS_REGION,
  //   AWS_ACCESS_KEY: process.env.AWS_ACCESS_KEY,
  //   AWS_SECRECT_ACCESS_KEY: process.env.AWS_SECRECT_ACCESS_KEY,
};
