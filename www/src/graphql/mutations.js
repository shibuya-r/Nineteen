/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createObject = /* GraphQL */ `
  mutation CreateObject(
    $input: CreateObjectInput!
    $condition: ModelObjectConditionInput
  ) {
    createObject(input: $input, condition: $condition) {
      id
      subId
      name
      realName
      birth
      mailAddress
      password
      profilePicture
      introduction
      createdAt
      updatedAt
    }
  }
`;
export const updateObject = /* GraphQL */ `
  mutation UpdateObject(
    $input: UpdateObjectInput!
    $condition: ModelObjectConditionInput
  ) {
    updateObject(input: $input, condition: $condition) {
      id
      subId
      name
      realName
      birth
      mailAddress
      password
      profilePicture
      introduction
      createdAt
      updatedAt
    }
  }
`;
export const deleteObject = /* GraphQL */ `
  mutation DeleteObject(
    $input: DeleteObjectInput!
    $condition: ModelObjectConditionInput
  ) {
    deleteObject(input: $input, condition: $condition) {
      id
      subId
      name
      realName
      birth
      mailAddress
      password
      profilePicture
      introduction
      createdAt
      updatedAt
    }
  }
`;
export const createSequences = /* GraphQL */ `
  mutation CreateSequences(
    $input: CreateSequencesInput!
    $condition: ModelSequencesConditionInput
  ) {
    createSequences(input: $input, condition: $condition) {
      entity
      currentNumber
      createdAt
      updatedAt
    }
  }
`;
export const updateSequences = /* GraphQL */ `
  mutation UpdateSequences(
    $input: UpdateSequencesInput!
    $condition: ModelSequencesConditionInput
  ) {
    updateSequences(input: $input, condition: $condition) {
      entity
      currentNumber
      createdAt
      updatedAt
    }
  }
`;
export const deleteSequences = /* GraphQL */ `
  mutation DeleteSequences(
    $input: DeleteSequencesInput!
    $condition: ModelSequencesConditionInput
  ) {
    deleteSequences(input: $input, condition: $condition) {
      entity
      currentNumber
      createdAt
      updatedAt
    }
  }
`;
