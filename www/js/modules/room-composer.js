export class RoomComposer {
  constructor(groupName, myName) {
    this.groupName = groupName;
    this.myName = myName;
    this.numMembers = 0;
    this.groupMembers = new Array();
  }

  appendMember(name) {
    this.groupMembers.push(name);
    this.numMembers = this.groupMembers.length;
  }

  getMyName() {
    return this.myName;
  }

  getGroupName() {
    return this.groupName;
  }

  getNumMembers() {
    return this.numMembers;
  }

  getGroupMembers() {
    return this.groupMembers;
  }
}

// Sample dataset
export const dataSetA = {
  myName: "maleA",
  myGroupName: "male",
  myMembers: ["maleB", "maleC"],
  partnerGroupName: "female",
  partnerMembers: ["femaleD", "femaleE", "femaleF"]
}

export const dataSetB = {
  myName: "maleB",
  myGroupName: "male",
  myMembers: ["maleA", "maleC"],
  partnerGroupName: "female",
  partnerMembers: ["femaleD", "femaleE", "femaleF"]
}

export const dataSetC = {
  myName: "maleC",
  myGroupName: "male",
  myMembers: ["maleA", "maleB"],
  partnerGroupName: "female",
  partnerMembers: ["femaleD", "femaleE", "femaleF"]
}

export const dataSetD = {
  myName: "femaleD",
  myGroupName: "female",
  myMembers: ["femaleE", "femaleF"],
  partnerGroupName: "male",
  partnerMembers: ["maleA", "maleB", "maleC"]
}

export const dataSetE = {
  myName: "femaleE",
  myGroupName: "female",
  myMembers: ["femaleD", "femaleF"],
  partnerGroupName: "male",
  partnerMembers: ["maleA", "maleB", "maleC"]
}

export const dataSetF = {
  myName: "femaleF",
  myGroupName: "female",
  myMembers: ["femaleD", "femaleE"],
  partnerGroupName: "male",
  partnerMembers: ["maleA", "maleB", "maleC"]
}

export const genRoomDataSet = (index) => {
  let myGroup = "";
  let dataSetIndex = index;
  if (dataSetIndex === "#A") {
    myGroup = dataSetA;
  } else if (dataSetIndex === "#B") {
    myGroup = dataSetB;
  } else if (dataSetIndex === "#C") {
    myGroup = dataSetC;
  } else if (dataSetIndex === "#D") {
    myGroup = dataSetD;
  } else if (dataSetIndex === "#E") {
    myGroup = dataSetE;
  } else if (dataSetIndex === "#F") {
    myGroup = dataSetF;
  }
  return myGroup;
};
