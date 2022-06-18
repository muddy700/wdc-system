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

const getRandomElement = (itemList: Array<any>) => {
  const randomInt: number = faker.datatype.number(itemList.length - 1);

  return itemList[randomInt];
};

export const getLocation = () => {
  return getRandomElement(locations);
};

const locations = [
  {
    latitude: "-6.0466821",
    longitude: "35.3387334",
    name: "Makulu, Dodoma Region, Tanzania",
  },
  {
    latitude: "-1.502866",
    longitude: "33.80181186393872",
    name: "Musoma Airport, Musoma, Tanzania",
  },
  {
    latitude: "-3.2052704",
    longitude: "33.5144048",
    name: "Isaka  - Mwanza SGR, construction, Tanzania",
  },
  {
    latitude: "-6.7942651000000005",
    longitude: "39.21490247742334",
    name: "Ubungo Plaza Limited, Dar es Salaam, Tanzania",
  },
  {
    latitude: "-2.5813613",
    longitude: "32.9178316",
    name: "Nyegezi Corner, bus_station, Mwanza, Tanzania",
  },
  {
    latitude: "-6.9148094",
    longitude: "39.2689121",
    name: "Moringe, Viwandani Street, Dar es Salaam, Tanzania",
  },
  {
    latitude: "-8.7994919",
    longitude: "39.3491502",
    name: "Kilwa-Nangurukuru Road, secondary, Nangurukuru, Tanzania",
  },
];

const getMedias = () => {
  return [
    {
      name: "Email",
      value: faker.internet.email().toLowerCase(),
    },
    {
      name: "Phone",
      value: faker.phone.phoneNumber("2557########"),
    },
    {
      name: "Whatsapp",
      value: faker.phone.phoneNumber("2557########"),
    },
  ];
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
    communicationMedias: getMedias(),
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
