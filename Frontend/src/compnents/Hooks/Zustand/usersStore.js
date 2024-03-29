import { create } from "zustand";

const useStore = create((set) => ({
  //set checkboxRatioNotifierDisplay
  checkboxRatioNotifierDisplay: "",

  setCheckboxRatioNotifierDisplay: (updatedCheckboxRatioNotifierDisplay) =>
    set((state) => ({
      checkboxRatioNotifierDisplay: updatedCheckboxRatioNotifierDisplay,
    })),

  //set Menu Icon Closing on scroll landing page
  isMenuIconShowing: true,

  setIsMenuIconShowing: (updatedisMenuIconShowing) =>
    set((state) => ({ isMenuIconShowing: updatedisMenuIconShowing })),

  //set Means of execution
  meansOfExceution: false,

  setMeansOfExceution: (updatedmeansOfExceution) =>
    set((state) => ({ meansOfExceution: updatedmeansOfExceution })),

  //set textareaValue
  textAreaValue: "",

  setTextAreaValue: (updatedTextArea) =>
    set((state) => ({ textAreaValue: updatedTextArea })),

  //set extension login details from server
  extensionLoginDetailsFromServer: "",

  setExtensionLoginDetailsFromServer: (updatedExtensionDetails) =>
    set((state) => ({
      extensionLoginDetailsFromServer: updatedExtensionDetails,
    })),

  //set timeInterval
  timeInterval: 1,

  setTimeInterval: (updatedTimeInterval) =>
    set((state) => ({ timeInterval: updatedTimeInterval })),

  //set TimeIntervalRef
  timeIntervalRef: "",

  setTimeIntervalRef: (updatedTimeIntervalRef) =>
    set((state) => ({ timeIntervalRef: updatedTimeIntervalRef })),

  //set ExecutionErrorBtnRefEl
  executionErrorBtn: "",

  setExecutionErrorBtn: (updatedExecutionErrorBtn) =>
    set((state) => ({ executionErrorBtn: updatedExecutionErrorBtn })),

  //set credits no
  creditsFromServer: "",

  setCreditsFromServer: (fetchedCredits) =>
    set((state) => ({ creditsFromServer: fetchedCredits })),

  //change members and boards names while being added
  userDetails: "",

  setuserDetails: (updatedDetails) =>
    set((state) => ({ userDetails: updatedDetails })),

  //change boards names while being added
  sectionName: "",

  setSectionName: (updatedSectionName) =>
    set((state) => ({ sectionName: updatedSectionName })),

  // Function to push each index of memeber details invalid entry ele an array
  invalidMemberDetailsArray: [],

  pushInvalidMemberDetailsArray: (newString) =>
    set((state) => ({
      invalidMemberDetailsArray: [
        ...state.invalidMemberDetailsArray,
        newString,
      ],
    })),

  // Function to push each workspaceObjDetails ele into the array
  workspaceObjDetails: [],

  pushWorkspaceObjDetails: (newString) =>
    set((state) => ({
      workspaceObjDetails: [...state.workspaceObjDetails, newString],
    })),

  // Function to push each membercheckbox ele into the memebercheckboxesArray
  memberCheckboxesArray: [],

  pushMemberCheckboxesArray: (newCheckbox) =>
    set((state) => ({
      memberCheckboxesArray: [...state.memberCheckboxesArray, newCheckbox],
    })),
  // Function to push each checkbox ele into the checkboxesArray
  checkboxesArray: [],

  pushCheckboxesArray: (newString) =>
    set((state) => ({
      checkboxesArray: [...state.checkboxesArray, newString],
    })),

  // Function to Failures and reasons for failures
  failureReason: [],

  pushFailureReason: (newString) =>
    set((state) => ({
      failureReason: [...state.failureReason, newString],
    })),

  // Incremeenting Functions
  count: 0,
  increment: () => set((state) => ({ count: state.count + 1 })),

  // Incrementing Success Length and reseting when necessary
  sucessLength: 0,
  incrementSucessLength: () =>
    set((state) => ({ sucessLength: state.sucessLength + 1 })),
  resetSucessLength: () => set({ sucessLength: 0 }), // New action to reset sucessLength to 0

  // Incrementing total Success Length only
  totalSucessLength: 0,
  incrementTotalSucessLength: () =>
    set((state) => ({ totalSucessLength: state.totalSucessLength + 1 })),

  // Incrementing FailureLength and reseting when necessary
  failureLength: 0,
  incrementFailureLength: () =>
    set((state) => ({ failureLength: state.failureLength + 1 })),
  resetFailureLength: () => set({ failureLength: 0 }),

  // Incrementing total failure Length only
  totalFailureLength: 0,
  incrementTotalFailureLength: () =>
    set((state) => ({ totalFailureLength: state.totalFailureLength + 1 })),

  // Incrementing Total attempts length
  totalAttemptLength: 0,
  incrementTotalAttemptLength: () =>
    set((state) => ({ totalAttemptLength: state.totalAttemptLength + 1 })),

  // Incrementing currentRound  when necessary
  currentRound: 0,
  incrementCurrentRound: () =>
    set((state) => ({ currentRound: state.currentRound + 1 })),
}));

export default useStore;
