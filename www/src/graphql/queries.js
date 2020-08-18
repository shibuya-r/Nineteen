/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getObject = /* GraphQL */ `
  query GetObject($id: String!, $subId: String!) {
    getObject(id: $id, subId: $subId) {
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
export const listObjects = /* GraphQL */ `
  query ListObjects(
    $id: String
    $subId: ModelStringKeyConditionInput
    $filter: ModelObjectFilterInput
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listObjects(
      id: $id
      subId: $subId
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      sortDirection: $sortDirection
    ) {
      items {
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
      nextToken
    }
  }
`;
export const getSequences = /* GraphQL */ `
  query GetSequences($entity: String!) {
    getSequences(entity: $entity) {
      entity
      currentNumber
    }
  }
`;
export const listSequencess = /* GraphQL */ `
  query ListSequencess(
    $entity: String
    $filter: ModelSequencesFilterInput
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listSequencess(
      entity: $entity
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      sortDirection: $sortDirection
    ) {
      items {
        entity
        currentNumber
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const objectBySubId = /* GraphQL */ `
  query ObjectBySubId(
    $subId: String
    $name: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelObjectFilterInput
    $limit: Int
    $nextToken: String
  ) {
    objectBySubId(
      subId: $subId
      name: $name
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
      nextToken
    }
  }
`;
