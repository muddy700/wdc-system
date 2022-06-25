import { faker } from "@faker-js/faker";
import { House, IHouse } from "../house.model";

export const seedHouses = async (numberOfHouses: number) => {
  try {
    const totalHouses = await House.countDocuments();

    if (totalHouses < numberOfHouses) {
      const missingHouses = numberOfHouses - totalHouses;
      const payloads = getHousePaylod(missingHouses);

      payloads.forEach(async (payload) => {
        await House.create(payload);

        console.log(`Created House with No: ${payload.identificationNumber}`);
      });
    }
  } catch (e) {
    return errorResponse(e.message);
  }
};

const getHousePaylod = (count: number) => {
  const housesList: Array<IHouse> = [];

  for (let i = 0; i < count; i++) {
    // Create dummy objects depending on count value

    const houseInfo: IHouse = {
      owner: {
        fullName: faker.name.findName(),
        gender: getRandomElement(["M", "F", "M"]),
        email: faker.internet.email().toLowerCase(),
        phoneNumber: faker.phone.phoneNumber("2557########"),
      },

      identificationNumber: `TZ-H-${faker.datatype.number(200)}`,
    } as unknown as IHouse;

    housesList.push(houseInfo);
  }

  return housesList;
};

const getRandomElement = (itemList: Array<any>) => {
  const randomInt: number = faker.datatype.number(itemList.length - 1);

  return itemList[randomInt];
};

export const errorResponse = (error: any) => {
  //Formatting Response

  return {
    data: null,
    success: false,
    message: "Operation failed!.",
    developerMessage: error.message,
    userMessage: "Oops... Something went wrong, contact the admin...",
  };
};
