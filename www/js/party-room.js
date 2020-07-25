"use strct"
import { RoomCommunication } from '../../js/modules/skyway-room-communication.js';
import {
  RoomComposer,
  genRoomDataSet
} from '../../js/modules/room-composer.js';

document.addEventListener('init', function (event) {
  const page = event.target;
  if (page.id !== "party-room") {
    return
  }

  // 精査中
  const groupMessages = document.getElementById('js-group-messages');
  const personalMessages = document.getElementById('js-personal-messages');
  const sendGroupTrigger = document.getElementById('js-group-send-trigger');
  
  
  // Config of selectors
  const chatTrigger = document.getElementById('js-chat-trigger');
  const closeTrigger = document.getElementById('js-close-trigger');
  const containerMenu = document.getElementById('container-menu');
  const menu = document.getElementById('menu');
  const groupmateVideo1 = document.getElementById('js-groupmate-video1');
  const groupmateVideo2 = document.getElementById('js-groupmate-video2');
  const leaveTrigger = document.getElementById('js-leave-trigger');
  const myVideo = document.getElementById('js-my-video');
  const partnerVideo1 = document.getElementById('js-partner-video1');
  const partnerVideo2 = document.getElementById('js-partner-video2');
  const partnerVideo3 = document.getElementById('js-partner-video3');
  const remoteVideos = document.getElementsByTagName("video");
  let localStream = "";
  let myGroup = "";
  let myPeerID = "";
  let peer = "";
  let room = "";

  // Set EventListners
  chatTrigger.addEventListener('click', () => {
    menu.open();
    containerMenu.style.display = "none";
  });

  closeTrigger.addEventListener('click', () => {
    menu.close();
    containerMenu.style.display = "inline-block";
  });

  leaveTrigger.addEventListener('click', () => room.close(), { once: true });

  // Set static methods
  const isReceiver = trgMember => {
    return trgMember == peerID;
  };

  const isSameGroup = senderGroupName => {
    return senderGroupName == groupName;
  };

  // Peerの生成 / カメラの起動
  (async function main() {
    myGroup = genRoomDataSet(location.hash);
    myPeerID = `${myGroup.myGroupName}-${myGroup.myName}`;
    console.info(`[INFO]: ${myGroup.myGroupName} / ${myGroup.myName} / ${myPeerID}`);

    localStream = await navigator.mediaDevices.getUserMedia(
      {
        audio: true,
        video: true,
      }
    ).catch(console.error);
    myVideo.muted = true;
    myVideo.srcObject = localStream;
    myVideo.playsInline = true;
    await myVideo.play().catch(console.error);

    peer = (window.peer = new window.Peer(
      `${myPeerID}`,
      {
      key: window.__SKYWAY_KEY__,
      debug: 1,
    }))
    peer.on('error', console.error);
  })();

  // Peer生成の監視
  const watchIsPeerCreated = setInterval(function () {
    if ( peer.open ) {
      clearInterval(watchIsPeerCreated);
      startRoomConnection();
    }
  }, 1000);

  // RoomConnectionの開始
  const startRoomConnection = () => {
    room = peer.joinRoom("hoge", {
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

    room.on('data', ({ data, src }) => {
      if ( isSameGroup(data.trg) ) {
        groupMessages.textContent += `${src}: ${data.content}\n`;
      } else {
        if ( isReceiver(data.trg) ) {
          personalMessages.textContent += `${src}: ${data.content}\n`;
        }
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
      // sendGroupTrigger.removeEventListener('click', onClickGroupSend);
      console.info('== You left ===');
      Array.from(remoteVideos).forEach(remoteVideo => {
        remoteVideo.srcObject = null;
      });
    });
    
    // sendGroupTrigger.addEventListener('click', onClickGroupSend);
    // function onClickGroupSend() {
    //   const sendData = {
    //     trg: `${groupName}`,
    //     content: groupLocalText.value
    //   };
    //   room.send(sendData);
    //   groupMessages.textContent += `You: ${groupLocalText.value}\n`;
    //   groupLocalText.value = '';
    // };
  };
});
