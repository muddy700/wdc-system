
export const generateOTP = () => {
    const otp = Math.floor(1000 + Math.random() * 9000);
    return otp;
}

export const getDateDiffInDays = (lowerDate: Date, upperDate: Date) => {
    lowerDate = new Date(lowerDate);
    upperDate = new Date(upperDate);

    const differenceInTime = upperDate.getTime() - lowerDate.getTime();
    const differenceInDays = differenceInTime / (1000 * 3600 * 24);

    return Math.floor(differenceInDays);
}

export const parseTill = (till: string) => {
    let parsedTill: any = {};

    const tills: Array<string> = till.split('-');
    const length = tills.length;
    parsedTill.count = length;

    if (length === 3) {
        parsedTill.staffTill = tills[2];
    }
    if (length >= 2) {
        parsedTill.vendorBranchTill = `${tills[0]}-${tills[1]}`;
    }

    return parsedTill;
}

export const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat().format(amount)
}