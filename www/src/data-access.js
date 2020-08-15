'use strict';

import Amplify, { API, graphqlOperation } from 'aws-amplify';
import awsconfig from './aws-exports';
import * as Query from './graphql/queries';
import * as Mutation from './graphql/mutations';
import '@babel/polyfill';

Amplify.configure(awsconfig);

const Dao = {

    /* Query - comparable to SELECT in SQL */

    /**
     * To get Object
     * @param {String!} id 
     * @param {String!} subId 
     */
    getObject: async (id, subId) => {
        const resultObj = await API.graphql(graphqlOperation(Query.getObject, { $id: id, $subId: subId }));
        return resultObj.data.getObject;
    },

    /**
     * 
     * @param {String} id 
     * @param {ModelStringKeyConditionInput} subId 
     * @param {ModelObjectFilterInput} filter 
     * @param {Int} limit 
     * @param {String} nextToken 
     * @param {ModelSortDirection} sortDirection 
     */
    getObjectList: async (id, subId, filter, limit, nextToken, sortDirection) => {
        const resultObj = await API.graphql(graphqlOperation(Query.listObjects, {
            $id: id,
            $subId: subId,
            $filter: filter,
            $limit: limit,
            $nextToken: nextToken,
            $sortDirection: sortDirection
        }));
        return resultObj.data.listObjects;
    },

    /**
     * 
     * @param {String} subId 
     * @param {ModelStringKeyConditionInput} name 
     * @param {ModelObjectFilterInput} filter 
     * @param {Int} limit 
     * @param {String} nextToken 
     * @param {ModelSortDirection} sortDirection 
     */
    getObjectListBySubId: async (subId, name, filter, limit, nextToken, sortDirection) => {
        const resultObj = await API.graphql(graphqlOperation(Query.objectBySubId, {
            $subId: subId,
            $name: name,
            $filter: filter,
            $limit: limit,
            $nextToken: nextToken,
            $sortDirection: sortDirection
        }));
        return resultObj.data.objectBySubId;
    },

    /* Mutation - comparable to INSERT/UPDATE/DELETE in SQL */

    createObject: async (entityName, subId, name, condition) => {
        return createObjectAll(entityName, subId, name, null, null, null, null, null, null, condition);
    },

    /**
     * 
     * @param {String!} entityName 
     * @param {String} subId 
     * @param {String} name 
     * @param {String} realName 
     * @param {String} birth 
     * @param {String} mailAddress 
     * @param {String} password 
     * @param {String} profilePicture 
     * @param {String} introduction 
     * @param {ModelObjectConditionInput} condition 
     */
    createObjectAll: async (entityName, subId, name, realName, birth, mailAddress, password, profilePicture, introduction, condition) => {
        const id = entityName + '-' + getNextNumber(entityName);
        const input = {
            id: id,
            subId: !subId ? id : subId,
            name: name,
            realName: realName,
            birth: birth,
            mailAddress: mailAddress,
            password: password,
            profilePicture: profilePicture,
            introduction: introduction
        };
        // create Object
        const resultObj = await API.graphql(graphqlOperation(Mutation.createObject, { $input: input, $condition: condition }));
        if (resultObj.errors) {
            console.log(resultObj.errors);
            return null;
        }
        return resultObj.data.createObject;
    },

    /**
     * For numbering ID
     * @param {String} entityName 
     */
    getNextNumber: async (entityName) => {
        const seq = await API.graphql(graphqlOperation(Query.getSequences, { $entity: entityName }));
        const currNum = seq.data.getSequences.currentNumber;
        if (currNum === 0) {
            await API.graphql(graphqlOperation(Mutation.createSequences, { $input: { entity: entityName, currentNumber: 1 } }));
            return 1;
        }
        await API.graphql(graphqlOperation(Mutation.updateSequences, { $input: { entity: entityName, currentNumber: ++currNum } }));
        return ++currNum;
    },

    /**
     * 
     * @param {String} id 
     * @param {String} subId 
     * @param {String} name 
     * @param {String} realName 
     * @param {String} birth 
     * @param {String} mailAddress 
     * @param {String} password 
     * @param {String} profilePicture 
     * @param {String} introduction 
     * @param {ModelObjectConditionInput} condition 
     */
    updateObject: async (id, subId, name, realName, birth, mailAddress, password, profilePicture, introduction, condition) => {
        const input = {
            id: id,
            subId: subId,
            name: name,
            realName: realName,
            birth: birth,
            mailAddress: mailAddress,
            password: password,
            profilePicture: profilePicture,
            introduction: introduction
        };
        // update Object
        const resultObj = await API.graphql(graphqlOperation(Mutation.updateObject, { $input: input, $condition: condition }));
        return resultObj.data.updateObject;
    },

    /**
     * 
     * @param {String} id 
     * @param {String} subId 
     * @param {ModelObjectConditionInput} condition 
     */
    deleteObject: async (id, subId, condition) => {
        const input = {
            id: id,
            subId: subId
        };
        // delete Object
        const resultObj = await API.graphql(graphqlOperation(Mutation.deleteObject, { $input: input, $condition: condition }));
        return resultObj.data.deleteObject;
    }

}

export default Dao
