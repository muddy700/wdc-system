import { IUser, User } from "./user.model";
// import { ClientSession, Types } from "mongoose";

// export const createUserWithDBTransaction = async (
//   body: IUser,
//   session: ClientSession
// ) => {
//   let user = (await User.create([body], { session }))[0];

//   return user.populate("role").execPopulate();
// };

export const createUser = async (body: IUser) => {
  try {
    let user = await User.create(body);

    return user.populate("role piu project").execPopulate();
  } catch (e) {
    throw new Error(e.message);
  }
};

export const getUsers = async (
  offset: number,
  perPage: number,
  searchQuery: string,
  role: string = ""
) => {
  try {
    let condition: any = {};

    const search = new RegExp(".*" + searchQuery + ".*", "i");

    if (role !== undefined && role !== "") {
      condition.role = role;
    }

    if (searchQuery !== undefined && searchQuery !== "") {
      condition.$or = [
        { semifullName: { $regex: search } },
        { fullName: { $regex: search } },
        { phoneNumber: { $regex: search } },
      ];
    }

    const users = await User.aggregate([
      {
        $lookup: {
          from: "roles",
          localField: "role",
          foreignField: "_id",
          as: "role",
        },
      },
      {
        $addFields: {
          semifullName: { $concat: ["$firstName", " ", "$lastName"] },
          fullName: {
            $concat: ["$firstName", " ", "$middleName", " ", "$lastName"],
          },
        },
      },
      {
        $unwind: {
          path: "$role",
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $match: {
          ...condition,
        },
      },
      { $sort: { firstName: -1 } },
      {
        $facet: {
          metadata: [{ $count: "total" }],
          data: [{ $skip: offset }, { $limit: perPage }],
        },
      },
    ]);

    if (users[0].data.length === 0) {
      return { users: [], count: 0 };
    }

    return { data: users[0].data, totalRows: users[0].metadata[0].total };
  } catch (e) {
    throw new Error(e.message);
  }
};

export const getUser = async (userId: string) => {
  try {
    const user = await User.findOne({ _id: userId }).populate("role");

    return user;
  } catch (e) {
    throw new Error(e.message);
  }
};

export const deleteUser = async (userId: string) => {
  try {
    const user = await User.deleteOne({ _id: userId });

    return user;
  } catch (e) {
    throw new Error(e.message);
  }
};

export const updateUser = async (userId: string, body: IUser) => {
  try {
    let hasPasswordChanged = false;
    const { password } = body;

    if (password !== undefined) {
      hasPasswordChanged = true;
    }

    const user = await User.findOneAndUpdate(
      { _id: userId },
      { ...body },
      { new: true }
    ).populate("role");

    if (hasPasswordChanged && user) {
      await user.changePassword(password);
    }

    return user;
  } catch (e) {
    throw new Error(e.message);
  }
};

// export const updateUserWithSession = async (
//   userId: string,
//   body: IUser,
//   session: ClientSession
// ) => {
//   const user = await User.findOneAndUpdate(
//     { _id: userId },
//     { ...body },
//     { new: true, session }
//   ).populate("role");

//   return user;
// };

// export const getUserByPhoneNumber = async (phoneNumber: string, type: any) => {
//   try {
//     const userType: any = { type };

//     if (Array.isArray(type)) {
//       userType.type = { $in: type };
//     }

//     const user = await User.findOne({ phoneNumber, ...userType });

//     return user;
//   } catch (e) {
//     throw new Error(e.message);
//   }
// };

export const getUserByEmail = async (email: string) => {
  return User.findOne({ email }).populate([
    {
      path: "role ",
      populate: { path: "permissions" },
    },
  ]);
};

export const changeUserStatus = (userId: string, body: any) => {
  return User.findOneAndUpdate({ _id: userId }, { ...body }, { new: true });
};

export const newUsers = async (
  startDate: Date,
  endDate: Date,
  country: string
) => {
  try {
    let condition: any = {};

    if (country !== undefined && country !== "") {
      condition.country = country;
    }

    const newUsers = await User.find({
      ...condition,
      //   type: USER_TYPES.USER,
      createdAt: { $gt: endDate, $lte: startDate },
    }).sort({ createdAt: -1 });

    return newUsers;
  } catch (e) {
    throw new Error(e.message);
  }
};

export const userCount = (fromDate: Date, toDate: Date, country: string) => {
  toDate = new Date(toDate);

  return User.countDocuments({
    // type: USER_TYPES.USER,
    country,
    createdAt: {
      $gte: fromDate,
      $lte: new Date(toDate.setDate(toDate.getDate() + 1)),
    },
  });
};
