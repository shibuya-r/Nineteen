"use strct"
// import { RoomCommunication } from '../../js/modules/skyway-room-communication.js';
import { isLengthwise } from '../../js/app-utils.js';
import {
  // RoomComposer,
  genRoomDataSet
} from '../../js/modules/room-composer.js';

document.addEventListener('init', function (event) {
  const page = event.target;
  if (page.id !== "party-room") {
    return
  }

  // [DEBUG]: ちゃんと制御する
  if (isLengthwise()  === false) {
    alert("画面を横向きにしてください");
  }

  // Config of selectors
  const chatBody = document.getElementById('js-chat-body');
  const chatButton = document.getElementById('js-chat-button');
  const chatInput = document.getElementById('js-chat-input');
  const chat = document.getElementById('chat');
  const chatTitle = document.getElementById('js-chat-title');
  const chatTrigger = document.getElementById('js-chat-trigger');
  const closeTrigger = document.getElementById('js-close-trigger');
  const containerMenu = document.getElementById('container-menu');
  const groupmateVideo1 = document.getElementById('js-groupmate-video1');
  const groupmateVideo2 = document.getElementById('js-groupmate-video2');
  const leaveTrigger = document.getElementById('js-leave-trigger');
  const myVideo = document.getElementById('js-my-video');
  const partnerVideo1 = document.getElementById('js-partner-video1');
  const partnerVideo2 = document.getElementById('js-partner-video2');
  const partnerVideo3 = document.getElementById('js-partner-video3');
  const remoteVideos = document.getElementsByTagName("video");

  // Set variables
  let localStream = "";
  let myGroup = "";
  let myPeerID = "";
  let peer = "";
  let room = "";
  let roomName = "helloRoom"; //[DEBUG]: DBつなぎ次第DBから取得

  // Set EventListners
  chatButton.addEventListener('click', () => {
    if (chatInput.value !== "") {
      let chatMsg = chatInput.value;
      const val = {
        sender: myGroup.myName,
        msg: chatMsg
      }
      room.send(val);
      createChatElement(chatMsg, myGroup.myName, true);
      chatInput.value = "";
      console.info(`=== You send ${chatMsg}`);
    }
  });

  chatTrigger.addEventListener('click', () => {
    chat.open();
    containerMenu.style.display = "none";
    groupmateVideo2.style.display = "none";
    partnerVideo3.style.display = "none";
  });

  closeTrigger.addEventListener('click', () => {
    chat.close();
    containerMenu.style.display = "inline-block";
    groupmateVideo2.style.display = "block";
    partnerVideo3.style.display = "block";
  });

  leaveTrigger.addEventListener('click', () => room.close(), { once: true });

  // Peerの生成 / カメラの起動
  (async function main() {
    // Set dataset of party-room participant
    myGroup = genRoomDataSet(location.hash); // [DEBUG]: サンプルのデータセットを取得 / DBつなぎ次第動データを取得
    myPeerID = `${myGroup.myGroupName}-${myGroup.myName}`;
    chatTitle.textContent = `チャット: ${myGroup.myGroupName}`;
    console.info(`[INFO]: ${myGroup.myGroupName} / ${myGroup.myName} / ${myPeerID}`);
    
    // Start　camera and play video on local
    localStream = await navigator.mediaDevices.getUserMedia(
      {
        audio: true,
        video: {
          facingMode: "user" 
        }
      }
    ).catch(console.error);
    myVideo.muted = true;
    myVideo.srcObject = localStream;
    myVideo.playsInline = true;
    await myVideo.play().catch(console.error);
    
    // Create Peer
    peer = (window.peer = new window.Peer(
      `${myPeerID}`,
      {
      key: window.__SKYWAY_KEY__,
      debug: 1,
    }))
    peer.on('error', console.error);
  })();

  // Watch Peer creation status
  const watchIsPeerCreated = setInterval(function () {
    if ( peer.open ) {
      clearInterval(watchIsPeerCreated);
      startRoomConnection();
    }
  }, 1000);

  // Start SkyWay room communication
  const startRoomConnection = () => {
    room = peer.joinRoom(roomName, {
      mode: "mesh",
      stream: localStream,
    });

    room.once('open', () => {
      console.log("=== You joined ===");
    });

    room.on('peerJoin', peerId => {
      console.log(`=== ${peerId} joined ===\n`);
    });

    room.on('stream', async stream => {
      let newRemoteVideo = "";
      let remoteVideoGroup = stream.peerId.split("-")[0];
      if (groupmateVideo1.srcObject === null
        && remoteVideoGroup === myGroup.myGroupName)
      {
        newRemoteVideo = groupmateVideo1;

      } else if (groupmateVideo2.srcObject === null
        && remoteVideoGroup === myGroup.myGroupName)
      {
        newRemoteVideo = groupmateVideo2;

      } else if (partnerVideo1.srcObject === null
        && remoteVideoGroup === myGroup.partnerGroupName)
      {
        newRemoteVideo = partnerVideo1;

      } else if (partnerVideo2.srcObject === null
        && remoteVideoGroup === myGroup.partnerGroupName)
      {
        newRemoteVideo = partnerVideo2;

      } else if (partnerVideo3.srcObject === null
        && remoteVideoGroup === myGroup.partnerGroupName)
      {
        newRemoteVideo = partnerVideo3;
      }
      newRemoteVideo.srcObject = stream;
      newRemoteVideo.playsInline = true;
      newRemoteVideo.setAttribute('data-peer-id', stream.peerId);
      await newRemoteVideo.play().catch(console.error);
    });

    room.on('data', data => {
      const dataVal = data.data;
      if (isSameGroup(dataVal.sender)) {
        createChatElement(dataVal.msg, dataVal.sender);
        console.info(`=== ${dataVal.sender} send ${dataVal.msg}`);
      }
    });

    room.on('peerLeave', peerId => {
      let remoteVideo = "";
      for ( let i = 0; i < remoteVideos.length; i++ ) {
        if (remoteVideos[i].getAttribute("data-peer-id") === peerId ) {
          remoteVideo = remoteVideos[i];
        }
      }
      remoteVideo.srcObject.getTracks().forEach(track => track.stop());
      remoteVideo.srcObject = null;
      console.info(`=== ${peerId} left ===`);
    });

    room.once('close', () => {
      console.info('== You left ===');
      Array.from(remoteVideos).forEach(remoteVideo => {
        remoteVideo.srcObject = null;
      });
    });
  };

  // Set static methods
  const createChatElement = (msg, senderName, isMyMsg = false) => {
    const divParentNewElement = document.createElement('div');
    const divChildNewElement = document.createElement('div');
    const pMsgNewElement = document.createElement("p");
    const pSendaerNameNewElement = document.createElement("p");
    divChildNewElement.appendChild(pMsgNewElement);
    divParentNewElement.classList.add("chat-body-content-parent");
    divChildNewElement.classList.add("chat-body-content-child");
    pSendaerNameNewElement.classList.add("chat-sender-name")

    if (isMyMsg) {
      divParentNewElement.classList.add("chat-body-content-right");
    } else {
      pSendaerNameNewElement.textContent = senderName;
      divParentNewElement.appendChild(pSendaerNameNewElement);
    }

    pMsgNewElement.classList.add("chat-body-content-p");
    pMsgNewElement.textContent = msg;
    divParentNewElement.appendChild(divChildNewElement);
    chatBody.appendChild(divParentNewElement);
  };

  const isSameGroup = (sender) => {
    return myGroup.myMembers.includes(sender);
  };
});
