// const API_ROOT = "https://glacial-castle-79733.herokuapp.com"; //"http://localhost:8000";
const API_ROOT = "http://localhost:3000";
export const APIUrls = {
  login: () => `${API_ROOT}/v1/auth/login`,
  signup: () => `${API_ROOT}/v1/auth/register`,
  addProblemToServerDB: () => `${API_ROOT}/project/add-project`,
  getAllProblemsFromServerDB: () => ` ${API_ROOT}/v1/questions`,
  getCurrentProblemFromServerDB: (projectID) =>
    `${API_ROOT}/project/get-project/?projectID=${projectID}`,
  // get users in add new user component
  getUsersFromServerDB: (email) => {
    return `${API_ROOT}/user/get-users/?email=${email}`;
  },
  sendUsersSelectedToAddToProblem: () => {
    return `${API_ROOT}/project/add-users`;
  },
  sendIssueToAddToProblem: () => {
    return `${API_ROOT}/issue/add-issue`;
  },
  updateAssigneeOnIssue: () => {
    return `${API_ROOT}/issue/update-issue-assignee`;
  },
  deleteProblemFromServerDB: (projectID) => {
    return `${API_ROOT}/project/delete/?projectID=${projectID}`;
  },
  updateStatusOnIssue: () => {
    return `${API_ROOT}/issue/update-issue-status`;
  },
};
