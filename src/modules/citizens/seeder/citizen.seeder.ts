import { faker } from "@faker-js/faker";
import { Citizen, ICitizen } from "../citizen.model";
import { House, IHouse } from "../../houses/house.model";

const dob = [
  "1992-11-22",
  "1995-02-19",
  "1989-03-06",
  "1991-06-10",
  "1970-10-27",
  "1978-09-7",
  "1993-01-1",
  "1972-09-12",
  "2001-07-29",
  "1999-02-16",
  "1986-06-20",
  "1960-11-17",
  "1998-06-17",
  "1990-03-21",
];

const disabilities = [
  "None",
  "None",
  "None",
  "None",
  "vision Impairment",
  " physical disability",
  "acquired brain injury",
  "intellectual disabilitsy",
  "deaf or hard of hearing",
  "mental health conditions",
  "autism spectrum disorder",
];

const maritalStatuses = [
  "Single",
  "Married",
  "Widowed",
  "Divorced",
  "Separated",
];

const streets = [
  "Aroma",
  "Mnarani",
  "Kimanga",
  "Mawenzi",
  "Machimbo",
  "Viwandani",
];

export const seedCitizens = async (citizensPerHouse: number) => {
  try {
    const houses = await House.find();

    houses.forEach(async (house) => {
      const citizenCount = await Citizen.countDocuments({ house: house._id });

      if (citizenCount < citizensPerHouse) {
        const missingCitizens = citizensPerHouse - citizenCount;

        const citizenPayload: Array<ICitizen> = getCitizenPayload(
          missingCitizens,
          house
        );

        citizenPayload.forEach(async (payload) => {
          await Citizen.create(payload);

          console.log(
            `Created Citizen: ${payload.firstName} ${payload.lastName}`
          );
        });
      }
    });

    // Do other stuff
  } catch (e) {
    return errorResponse(e.message);
  }
};

const getCitizenPayload = (count: number, house: IHouse) => {
  const citizenList: Array<ICitizen> = [];

  for (let i = 0; i < count; i++) {
    // Create dummy data depending on count value

    const citizenInfo: ICitizen = {
      house: house._id,
      district: "Ilala",
      region: "Dar es salaam",
      dob: getRandomElement(dob),
      title: faker.name.jobTitle(),
      lastName: faker.name.lastName(),
      firstName: faker.name.firstName(),
      street: getRandomElement(streets),
      middleName: faker.name.middleName(),
      gender: getRandomElement(["M", "F", "M"]),
      disability: getRandomElement(disabilities),
      email: faker.internet.email().toLowerCase(),
      maritalStatus: getRandomElement(maritalStatuses),
      phoneNumber: faker.phone.phoneNumber("2557########"),
      religion: getRandomElement(["Muslim", "Christian", "Others"]),
    } as unknown as ICitizen;

    citizenList.push(citizenInfo);
  }

  return citizenList;
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
