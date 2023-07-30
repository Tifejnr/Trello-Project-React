"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _zustand = require("zustand");

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

var useStore = (0, _zustand.create)(function (set) {
  return {
    creditsFromServer: "",
    setCreditsFromServer: function setCreditsFromServer(fetchedCredits) {
      return set(function (state) {
        return {
          creditsFromServer: fetchedCredits
        };
      });
    },
    //change members and boards names while being added
    userDetails: "",
    setuserDetails: function setuserDetails(updatedDetails) {
      return set(function (state) {
        return {
          userDetails: updatedDetails
        };
      });
    },
    //change boards names while being added
    sectionName: "",
    setSectionName: function setSectionName(updatedSectionName) {
      return set(function (state) {
        return {
          sectionName: updatedSectionName
        };
      });
    },
    // Function to push each checkbox ele into the checkboxesArray
    checkboxesArray: [],
    pushCheckboxesArray: function pushCheckboxesArray(newString) {
      return set(function (state) {
        return {
          checkboxesArray: [].concat(_toConsumableArray(state.checkboxesArray), [newString])
        };
      });
    },
    // Incremeenting Functions
    count: 0,
    increment: function increment() {
      return set(function (state) {
        return {
          count: state.count + 1
        };
      });
    },
    // Incremeenting Functions
    // Incrementing Success Length and reseting when necessary
    sucessLength: 0,
    incrementSucessLength: function incrementSucessLength() {
      return set(function (state) {
        return {
          sucessLength: state.sucessLength + 1
        };
      });
    },
    resetSucessLength: function resetSucessLength() {
      return set({
        sucessLength: 0
      });
    },
    // New action to reset sucessLength to 0
    // Incrementing FailureLength and reseting when necessary
    failureLength: 0,
    incrementFailureLength: function incrementFailureLength() {
      return set(function (state) {
        return {
          failureLength: state.failureLength + 1
        };
      });
    },
    resetFailureLength: function resetFailureLength() {
      return set({
        failureLength: 0
      });
    },
    // Incrementing Total attempts length
    totalAttemptLength: 0,
    incrementTotalAttemptLength: function incrementTotalAttemptLength() {
      return set(function (state) {
        return {
          totalAttemptLength: state.totalAttemptLength + 1
        };
      });
    }
  };
});
var _default = useStore;
exports["default"] = _default;