import axiosInstance from "./axiosInstance";

export const updateUserProfile = async (profileUrl) => {
  return axiosInstance.post("/user", {
    profileUrl,
  });
};
export const uploadUserImage = async (image) => {};
