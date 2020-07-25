"use strct"
document.addEventListener('init', function (event) {
  const page = event.target;
  if (page.id !== "party-room") {
    return
  }
  // Config of variables
  let memberName = "";
  let groupName = "";
  let peerID = "";


  // Config of selectors
  const groupLocalText = document.getElementById('js-group-local-text');
  const groupMessages = document.getElementById('js-group-messages');
  const header = document.getElementById("js-header");
  const joinTrigger = document.getElementById('js-join-trigger');
  const leaveTrigger = document.getElementById('js-leave-trigger');
  const localVideo = document.getElementById('js-local-stream');
  const personalLocalText = document.getElementById('js-personal-local-text');
  const personalMessages = document.getElementById('js-personal-messages');
  const receiverOption = document.getElementById('js-receiver-option');
  const remoteVideos = document.getElementById('js-remote-streams');
  const roomId = document.getElementById('js-room-id');
  const sendGroupTrigger = document.getElementById('js-group-send-trigger');
  const sendPersonalTrigger = document.getElementById('js-personal-send-trigger');


  // ===================
  // const assignGroupName = memberName => {
  //   if ( memberName == "A"
  //     || memberName == "B"
  //     || memberName == "C"
  //   ) {
  //     return "male"
  //   } else {
  //     return "female"
  //   }
  // };


  // const genHeaderMsg = () => {
  //   header.textContent = `[INFO]: ${groupName} / ${memberName} / ${peerID}`;
  // };


  // const genMemberDataSet = () => {
  //   if (isAvailableHash(location.hash)) {
  //     memberName = genMemberName(location.hash);
  //     groupName = assignGroupName(memberName);
  //     peerID = `${groupName}${memberName}`;
  //   } else {
  //     console.error("Set member name with hash on URL.")
  //   }
  // };


  // const genMemberName = urlHash => {
  //   return replaseHash(urlHash).toUpperCase()
  // };


  // const genPersonalMsgOptions = () => {
  //   if (groupName == "male") {
  //     receiverOption.insertAdjacentHTML('afterbegin', `<option value="femaleD">femaleD</option><option value="femaleE">femaleE</option><option value="femaleF">femaleF</option>`);
  //   } else {
  //     receiverOption.insertAdjacentHTML('afterbegin', `<option value="maleA">maleA</option><option value="maleB">maleB</option><option value="maleC">maleC</option>`);
  //   }
  // };


  // const isAvailableHash = trgHash => {
  //   if ( trgHash == "#A" || trgHash == "#a"
  //     || trgHash == "#B" || trgHash == "#b"
  //     || trgHash == "#C" || trgHash == "#c"
  //     || trgHash == "#D" || trgHash == "#d"
  //     || trgHash == "#E" || trgHash == "#e"
  //     || trgHash == "#F" || trgHash == "#f"
  //     && trgHash != "" )
  //   {
  //     return true
  //   } else {
  //     return false
  //   }
  // };

  const isReceiver = trgMember => {
    return trgMember == peerID;
  };

  const isSameGroup = senderGroupName => {
    return senderGroupName == groupName;
  };


  // const replaseHash = str => {
  //   return str.replace("#", "")
  // }


  // ==== Inital calling methods ====
  // genMemberDataSet();
  // genHeaderMsg();
  // genPersonalMsgOptions();
  // =================================

  (async function main() {
    const localStream = await navigator.mediaDevices
      .getUserMedia({
        audio: true,
        video: true,
      })
      .catch(console.error);

    // Render local stream
    localVideo.muted = true;
    localVideo.srcObject = localStream;
    localVideo.playsInline = true;
    await localVideo.play().catch(console.error);

    const peer = (window.peer = new window.Peer(
      `${peerID}`, // can put any peerID
      {
      key: window.__SKYWAY_KEY__,
      debug: 1,
    }))

    joinTrigger.addEventListener('click', () => {
    if (!peer.open) {
      return;
    }

    // const room = peer.joinRoom(roomId.value, {
    const room = peer.joinRoom("hoge", {
      mode: "mesh",
      stream: localStream,
    });
    console.log(room)
    room.once('open', () => {
      console.log("=== You joined ===");
      // groupMessages.textContent += '=== You joined ===\n';
    });
    room.on('peerJoin', peerId => {
      groupMessages.textContent += `=== ${peerId} joined ===\n`;
    });

    room.on('stream', async stream => {
      const newVideo = document.createElement('video');
      newVideo.srcObject = stream;
      newVideo.playsInline = true;
      newVideo.setAttribute('data-peer-id', stream.peerId);
      remoteVideos.append(newVideo);
      await newVideo.play().catch(console.error);
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
      const remoteVideo = remoteVideos.querySelector(
        `[data-peer-id=${peerId}]`
      );
      remoteVideo.srcObject.getTracks().forEach(track => track.stop());
      remoteVideo.srcObject = null;
      remoteVideo.remove();

      groupMessages.textContent += `=== ${peerId} left ===\n`;
    });

    room.once('close', () => {
      sendGroupTrigger.removeEventListener('click', onClickGroupSend);
      groupMessages.textContent += '== You left ===\n';
      Array.from(remoteVideos.children).forEach(remoteVideo => {
        remoteVideo.srcObject.getTracks().forEach(track => track.stop());
        remoteVideo.srcObject = null;
        remoteVideo.remove();
      });
    });

    sendGroupTrigger.addEventListener('click', onClickGroupSend);
    sendPersonalTrigger.addEventListener('click', onClickPersonalSend);
    leaveTrigger.addEventListener('click', () => room.close(), { once: true });

    function onClickGroupSend() {
      const sendData = {
        trg: `${groupName}`,
        content: groupLocalText.value
      };
      room.send(sendData);
      groupMessages.textContent += `You: ${groupLocalText.value}\n`;
      groupLocalText.value = '';
    };
    
    function onClickPersonalSend() {
      const sendData  = {
        trg: receiverOption.value,
        content: personalLocalText.value
      };
      room.send(sendData);
      personalMessages.textContent += `You: ${personalLocalText.value}\n`;
      personalLocalText.value = '';
    };
    });

    peer.on('error', console.error);
  })();
});
