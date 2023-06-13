import "./App.css";
import React, { useState, useContext, useEffect, useRef } from "react";
import { Currency } from "@dataverse/runtime-connector";
import { useWallet, useStream } from "./hooks";
import ReactJson from "react-json-view";
import { Context } from "./context";
import { Model, StreamRecord } from "./types";
import {
  PushNotificationClient,
  PushChatClient,
  ENV,
} from "@dataverse/push-client-toolkit";

function App() {
  const { appVersion, postModel, output, runtimeConnector } =
    useContext(Context);
  const [currentStreamId, setCurrentStreamId] = useState<string>();
  const [publicPost, setPublicPost] = useState<StreamRecord>();
  const [encryptedPost, setEncryptedPost] = useState<StreamRecord>();
  const [payablePost, setPayablePost] = useState<StreamRecord>();
  const [posts, setPosts] = useState<StreamRecord[]>(); // All posts
  const [updatedPost, setUpdatedPost] = useState<StreamRecord>();
  const [monetizedPost, setMonetizedPost] = useState<StreamRecord>();
  const [unlockedPost, setUnlockedPost] = useState<StreamRecord>();
  const [pushChannelModel, setPushChannelModel] = useState<Model>();
  const { address, connectWallet } = useWallet();
  const pushChatClientRef = useRef<PushChatClient>();

  useEffect(() => {
    (async () => {
      console.log(output);
      const pushChatMessageModel = output.createDapp.streamIDs.find(
        (item) => item.name === "push_test001_pushchatmessage"
      );

      const pushChannelModel = output.createDapp.streamIDs.find(
        (item) => item.name === "push_test003_pushchannel"
      );

      if (pushChatMessageModel) {
        const pushChatClient = new PushChatClient(
          runtimeConnector,
          pushChatMessageModel.stream_id,
          output.createDapp.name,
          ENV.STAGING
        );
        pushChatClientRef.current = pushChatClient;
      }

      if (pushChannelModel) {
        setPushChannelModel(pushChannelModel);
      }
    })();
  }, []);

  const {
    pkh,
    createCapability,
    loadStreams,
    createPublicStream,
    createEncryptedStream,
    createPayableStream,
    monetizeStream,
    unlockStream,
    updateStream,
  } = useStream();

  const connect = async () => {
    const { wallet } = await connectWallet();
    const pkh = await createCapability(wallet);
    console.log("pkh:", pkh);
    return pkh;
  };

  const createPublicPost = async () => {
    const date = new Date().toISOString();
    const { streamId, ...streamRecord } = await createPublicStream({
      pkh,
      model: pushChannelModel as Model,
      stream: {
        channel: "test",
        ipfshash: "bafkreib76wz6wewtkfmp5rhm3ep6tf4xjixvzzyh64nbyge5yhjno24yl4",
        // appVersion,
        // text: "hello",
        // images: [
        //   "https://bafkreib76wz6wewtkfmp5rhm3ep6tf4xjixvzzyh64nbyge5yhjno24yl4.ipfs.w3s.link",
        // ],
        // videos: [],
        // createdAt: date,
        // updatedAt: date,
      },
    });

    setCurrentStreamId(streamId);
    setPublicPost(streamRecord as StreamRecord);
  };

  const createEncryptedPost = async () => {
    const date = new Date().toISOString();
    const { streamId, ...streamRecord } = await createEncryptedStream({
      model: pushChannelModel as Model,
      stream: {
        channel: "test",
        ipfshash: "bafkreib76wz6wewtkfmp5rhm3ep6tf4xjixvzzyh64nbyge5yhjno24yl4",
        // appVersion,
        // text: "hello",
        // images: [
        //   "https://bafkreib76wz6wewtkfmp5rhm3ep6tf4xjixvzzyh64nbyge5yhjno24yl4.ipfs.w3s.link",
        // ],
        // videos: [],
        // createdAt: date,
        // updatedAt: date,
      },
      encrypted: {
        channel: true,
        ipfshash: true,
        // text: true,
        // images: true,
        // videos: false,
      },
    });

    setCurrentStreamId(streamId);
    setEncryptedPost(streamRecord as StreamRecord);
  };

  const createPayablePost = async () => {
    const date = new Date().toISOString();
    const { streamId, ...streamRecord } = await createPayableStream({
      pkh,
      // model: postModel,
      model: pushChannelModel as Model,
      stream: {
        channel: "test",
        ipfshash: "bafkreib76wz6wewtkfmp5rhm3ep6tf4xjixvzzyh64nbyge5yhjno24yl4",
        // appVersion,
        // text: "metaverse",
        // images: [
        //   "https://bafkreidhjbco3nh4uc7wwt5c7auirotd76ch6hlzpps7bwdvgckflp7zmi.ipfs.w3s.link/",
        // ],
        // videos: [],
        // createdAt: date,
        // updatedAt: date,
      },
      lensNickName: "luketheskywalker1", //Only supports lower case characters, numbers, must be minimum of 5 length and maximum of 26 length
      currency: Currency.WMATIC,
      amount: 0.0001,
      collectLimit: 1000,
      encrypted: {
        channel: false,
        ipfshash: false,
        // text: true,
        // images: true,
        // videos: false,
      },
    });

    setCurrentStreamId(streamId);
    setPayablePost(streamRecord as StreamRecord);
  };

  const loadPosts = async () => {
    const postRecord = await loadStreams({
      pkh,
      modelId: (pushChannelModel as Model).stream_id,
    });
    console.log("loadPosts postRecord:", postRecord);
    setPosts(Object.values(postRecord));
  };

  const updatePost = async () => {
    if (!currentStreamId) {
      return;
    }
    const { streamId, ...streamRecord } = await updateStream({
      model: pushChannelModel as Model,
      // model: postModel,
      streamId: currentStreamId,
      stream: {
        channel: "test2",
        ipfshash: "bafkreib76wz6wewtkfmp5rhm3ep6tf4xjixvzzyh64nbyge5yhjno24yl5",
        // text: "update my post -- " + new Date().toISOString(),
        // images: [
        //   "https://bafkreidhjbco3nh4uc7wwt5c7auirotd76ch6hlzpps7bwdvgckflp7zmi.ipfs.w3s.link",
        // ],
      },
      encrypted: {
        channel: false,
        ipfshash: false,
        // text: true, images: true, videos: false
      },
    });

    setUpdatedPost(streamRecord as StreamRecord);
  };

  const monetizePost = async () => {
    if (!currentStreamId) {
      return;
    }
    const { streamId, ...streamRecord } = await monetizeStream({
      pkh,
      modelId: (pushChannelModel as Model).stream_id,
      // modelId: postModel.stream_id,
      streamId: currentStreamId,
      lensNickName: "jackieth", //Only supports lower case characters, numbers, must be minimum of 5 length and maximum of 26 length
      currency: Currency.WMATIC,
      amount: 0.0001,
      collectLimit: 1000,
    });

    setMonetizedPost(streamRecord as StreamRecord);
  };

  const unlockPost = async () => {
    if (!currentStreamId) {
      return;
    }
    const { streamId, ...streamRecord } = await unlockStream(currentStreamId);

    setUnlockedPost(streamRecord as StreamRecord);
  };

  return (
    <div className="App">
      <button onClick={connect}>connect</button>
      <div className="blackText">{pkh}</div>
      <hr />
      <button onClick={createPublicPost}>createPublicPost</button>
      {publicPost && (
        <div className="json-view">
          <ReactJson src={publicPost} collapsed={true} />
        </div>
      )}
      <button onClick={createEncryptedPost}>createEncryptedPost</button>
      {encryptedPost && (
        <div className="json-view">
          <ReactJson src={encryptedPost} collapsed={true} />
        </div>
      )}
      <button onClick={createPayablePost}>createPayablePost</button>
      {payablePost && (
        <div className="json-view">
          <ReactJson src={payablePost} collapsed={true} />
        </div>
      )}
      <div className="red">
        You need a testnet lens profile to monetize data.
      </div>
      <button onClick={loadPosts}>loadPosts</button>
      {posts && (
        <div className="json-view">
          <ReactJson src={posts} collapsed={true} />
        </div>
      )}
      <button onClick={updatePost}>updatePost</button>
      {updatedPost && (
        <div className="json-view">
          <ReactJson src={updatedPost} collapsed={true} />
        </div>
      )}
      <button onClick={monetizePost}>monetizePost</button>
      {monetizedPost && (
        <div className="json-view">
          <ReactJson src={monetizedPost} collapsed={true} />
        </div>
      )}
      <button onClick={unlockPost}>unlockPost</button>
      {unlockedPost && (
        <div className="json-view">
          <ReactJson src={unlockedPost} collapsed={true} />
        </div>
      )}
      <br />
      <button
        onClick={async () => {
          console.log(111);
          const user = await pushChatClientRef.current?.createPushChatUser();
          console.log(user);
        }}
      >
        createPushChatUser
      </button>
      <br />
      <button
        onClick={async () => {
          const msgCont = "chatMsg";
          const msgType = "Text";
          const receiver = "0x312eA852726E3A9f633A0377c0ea882086d66666";

          const response = await pushChatClientRef.current?.sendChatMessage(
            receiver,
            msgCont,
            msgType
          );

          console.log("SendMsg: response: ", response);
        }}
      >
        sendChatMessage
      </button>
    </div>
  );
}

export default App;
