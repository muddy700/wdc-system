import { faker } from "@faker-js/faker";
import {
  IStakeholder,
  Stakeholder,
} from "../../stakeholders/stakeholder.model";
import { getAttachment } from "../../projects/seeder";
import { Commitment, ICommitment } from "../commitment.model";
import { ProjectPhase } from "../../projectPhases/projectPhase.model";

export const seedCommitments = async (countPerStakeholder: number) => {
  try {
    const stakeholders = await Stakeholder.find();

    stakeholders.forEach(async (stakeholder) => {
      const stakeholderCommitments = await Commitment.countDocuments({
        actor: stakeholder._id,
        project: stakeholder.project,
      });

      if (stakeholderCommitments < countPerStakeholder) {
        const missingCommitments = countPerStakeholder - stakeholderCommitments;

        await createCommitments(stakeholder, missingCommitments);
      }
    });

    // Other stuffs
  } catch (e) {
    return errorResponse(e.message);
  }
};

const createCommitments = async (stakeholder: IStakeholder, count: number) => {
  try {
    const commitments: Array<ICommitment> = await getCommitmentsPayload(
      stakeholder,
      count
    );

    commitments.forEach(async (commitment) => {
      await Commitment.create(commitment);

      console.log(`Created commitment for stakeholder: ${stakeholder.name}`);
    });
  } catch (e) {
    return errorResponse(e.message);
  }
};

const getCommitmentsPayload = async (
  stakeholder: IStakeholder,
  count: number
) => {
  const commitmentsList: Array<ICommitment> = [];
  const status = ["New", "Inprogress", "Completed", "Overdue"];

  const projectPhases = await ProjectPhase.find({
    project: stakeholder.project,
  });

  for (let i = 0; i < count; i++) {
    const data: ICommitment = {
      attachments: [
        getAttachment("pdf"),
        getAttachment("audio"),
        getAttachment("image"),
      ],

      actor: stakeholder._id,
      onModel: "Stakeholder",
      comments: getComments(5),
      project: stakeholder.project,
      endDate: faker.date.future(),
      startDate: faker.date.past(1),
      status: getRandomElement(status),
      activity: faker.lorem.sentences(2),
      //   completedOn: faker.date.future(),
      projectPhase: getRandomElement(projectPhases)._id,
    } as unknown as ICommitment;

    commitmentsList.push(data);
  }

  return commitmentsList;
};

const getRandomElement = (itemList: Array<any>) => {
  const randomInt: number = faker.datatype.number(itemList.length - 1);

  return itemList[randomInt];
};

const getComments = (count: number) => {
  const commentsList = [];

  for (let i = 0; i < count; i++) {
    const commentBody = {
      message: faker.lorem.sentences(2),
      authorName: faker.name.findName(),
    };

    commentsList.push(commentBody);
  }

  return commentsList;
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
