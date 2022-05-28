import { hasOTPExpired, verifyEmail, verifyOtp } from "./otp.service";

describe('CHECKS OTP VALIDITY', () => {
    it('Test ivalid OTP', () => {
        const body: any = { phoneNumber: '255713122995', otp: 8090 };
        expect(verifyOtp(body)).toEqual(true);
    });

    it('Verify Email', () => {
        const body: any = { phoneNumber: 'gabrielpatrickmushi@gmail.com', otp: 8090 };
        expect(verifyEmail(body)).toEqual(true);
    });

    it('OTP has expired', () => {
        expect(hasOTPExpired(new Date('2021-03-13 05:26:31.5'))).toEqual(true);
    });

    it('OTP has not expired', () => {
        expect(hasOTPExpired(new Date(Date.now()))).toEqual(false);
    });
});