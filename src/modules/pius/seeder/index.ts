import { faker } from "@faker-js/faker";
import { IPiu, Piu } from "../piu.model";

export const seedTestingPius = async (count: number) => {
  try {
    const pius: Array<IPiu> = [];
    const piuCount: number = await Piu.countDocuments();

    if (piuCount >= count) {
      console.log("You have: " + piuCount + " PIUs.");

      return true;
    }

    for (let i = 0; i < count; i++) {
      //Create random objects depending on count-value

      const piuInfo: IPiu = {
        address: getAddress(),
        location: getLocation(),
        contactPerson: getPerson(),
        email: faker.internet.email(),

        sectors: ["Education", "Health"],
        vision: faker.lorem.sentence(10),
        websiteLink: faker.internet.url(),
        mission: faker.lorem.sentences(5),

        yearFound: faker.random.numeric(4),
        abbreviation: faker.random.alpha(2),
        logo: faker.image.business(300, 300, true),
        registeredName: faker.company.catchPhrase(),

        socialMedias: [
          { name: "Twitter", url: faker.internet.url() },
          { name: "LinkedIn", url: faker.internet.url() },
          { name: "Instagram", url: faker.internet.url() },
        ],

        branches: [
          { address: getAddress(), location: getLocation() },
          { address: getAddress(), location: getLocation() },
        ],

        phoneNumber: faker.phone.phoneNumber("2557########"),
        registrationNumber: `TZ-PIU-2022-${faker.random.numeric(4)}`,
      } as unknown as IPiu;

      pius.push(piuInfo);
    }

    pius.forEach(async (piu) => {
      await createPiu(piu);
    });
  } catch (e) {
    return errorResponse(e);
  }
};

const createPiu = async (data: IPiu) => {
  try {
    const piuExist = await Piu.countDocuments({
      registeredName: data.registeredName,
      registrationNumber: data.registrationNumber,
    });

    if (!piuExist) {
      await Piu.create(data);

      console.log("Created Piu: " + data.registeredName + ".");
    }
  } catch (e) {
    return errorResponse(e);
  }
};

export const getLocation = () => {
  return {
    name: faker.address.streetAddress(true),
    latitude: faker.address.latitude(10, -10, 3),
    longitude: faker.address.longitude(10, -10, 3),
  };
};

export const getAddress = () => {
  return {
    region: faker.address.cityName(),
    country: faker.address.country(),
    district: faker.address.stateAbbr(),
    street: faker.address.streetAddress(),
    postalCode: faker.address.streetAddress(true),
  };
};

export const getPerson = () => {
  return {
    disability: "none",
    name: faker.name.findName(),
    email: faker.internet.email(),
    position: faker.name.jobType(),
    gender: faker.name.gender(true),
    description: faker.lorem.sentences(5),
    physicalAddress: faker.address.streetAddress(true),
    phoneNumber: faker.phone.phoneNumber("2557########"),
  };
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
