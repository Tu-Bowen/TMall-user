<template>
  <div>
    <div class="chatBtn" @click="openChatBox()">
      <div class="chat-message-num">10</div>
      <i class="el-icon-chat-round"></i>
    </div>
    <div class="chatBox" ref="chatBox" v-show="showChatBox">
      <div class="chatBox-head">
        <div class="chatBox-head-one" v-if="!joinChatroom">
          消息列表
          <div
            class="chat-close"
            style="margin: 10px 10px 0 0; font-size: 14px"
            @click="closeChatBox()"
          >
            关闭
          </div>
        </div>
        <div class="chatBox-head-two" v-else>
          <div class="chat-return" @click="closeChatroom()">
            <i class="el-icon-arrow-left"></i>返回
          </div>
          <div class="chat-people">
            <div class="ChatInfoHead">
              <img
                src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
                alt="头像"
              />
            </div>
            <div class="ChatInfoName">{{ chatUserinfo.name }}</div>
          </div>
          <div class="chat-close" @click="closeChatBox()">关闭</div>
        </div>
      </div>
      <div class="chatBox-info">
        <div class="chatBox-list" ref="chatBoxlist" v-if="!joinChatroom">
          <div
            class="chat-list-people"
            @click="openChatroom(item)"
            v-for="(item, index) in sessions"
            :key="index + item"
          >
            <div>
              <img
                src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
                alt="头像"
              />
            </div>
            <div class="chat-name">
              <p>
                {{
                  item.with_username
                    ? "人工客服  " + item.with_username
                    : "人工客服"
                }}
              </p>
            </div>
            <div class="message-num">10</div>
          </div>
        </div>
        <div class="chatBox-kuang" ref="chatBoxkuang" v-else>
          <div class="chatBox-content">
            <div class="chatBox-content-demo" id="chatBox-content-demo">
              <div
                class="clearfloat"
                v-for="(msg, idx) in message"
                :key="msg + idx"
              >
                <div class="author-name">
                  <small class="chat-date">{{ msg.TIME }}</small>
                </div>
                <div
                  v-if="
                    msg.senderid &&
                    msg.senderid == userid &&
                    msg.sender_type === 'custom'
                  "
                  class="right"
                >
                  <div class="chat-message">{{ msg.TEXT }}</div>
                  <div class="chat-avatars">
                    <img
                      src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
                      alt="头像"
                    />
                  </div>
                </div>
                <div v-else class="left">
                  <div class="chat-avatars">
                    <img
                      src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
                      alt="头像"
                    />
                  </div>
                  <div class="chat-message">{{ msg.TEXT }}</div>
                </div>
                <div></div>
              </div>

              <!-- <div class="clearfloat">
                <div class="author-name">
                  <small class="chat-date">2017-12-02 14:26:58</small>
                </div>
                <div class="left">
                  <div class="chat-avatars">
                    <img
                      src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
                      alt="头像"
                    />
                  </div>
                  <div class="chat-message">
                    <img src="img/1.png" alt="" />
                  </div>
                </div>
              </div>-->

              <!-- <div class="clearfloat">
                <div class="author-name">
                  <small class="chat-date">2017-12-02 14:26:58</small>
                </div>
                <div class="right">
                  <div class="chat-message">嗯，适合做壁纸</div>
                  <div class="chat-avatars">
                    <img src="https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?ima" alt="头像" />
                  </div>
                </div>
              </div> -->
            </div>
          </div>
          <div class="chatBox-send">
            <div
              class="div-textarea"
              contenteditable="true"
              ref="textarea"
            ></div>
            <div>
              <!-- <button id="chat-biaoqing" class="btn-default-styles">
                            <i class="iconfont icon-biaoqing"></i>
                        </button>
                        <label id="chat-tuxiang" title="发送图片" for="inputImage" class="btn-default-styles">
                            <input type="file" onchange="selectImg(this)" accept="image/jpg,image/jpeg,image/png"
                                   name="file" id="inputImage" class="hidden">
                            <i class="iconfont icon-tuxiang"></i>
                        </label>-->
              <button
                id="chat-fasong"
                class="btn-default-styles"
                @click="sendMessage"
              >
                <i class="el-icon-position">发送</i>
              </button>
            </div>
            <!-- <div class="biaoqing-photo">
                        <ul>
                            <li><span class="emoji-picker-image" style="background-position: -9px -18px;"></span></li>
                            <li><span class="emoji-picker-image" style="background-position: -40px -18px;"></span></li>
                            <li><span class="emoji-picker-image" style="background-position: -71px -18px;"></span></li>
                            <li><span class="emoji-picker-image" style="background-position: -102px -18px;"></span></li>
                            <li><span class="emoji-picker-image" style="background-position: -133px -18px;"></span></li>
                            <li><span class="emoji-picker-image" style="background-position: -164px -18px;"></span></li>
                            <li><span class="emoji-picker-image" style="background-position: -9px -52px;"></span></li>
                            <li><span class="emoji-picker-image" style="background-position: -40px -52px;"></span></li>
                            <li><span class="emoji-picker-image" style="background-position: -71px -52px;"></span></li>
                            <li><span class="emoji-picker-image" style="background-position: -102px -52px;"></span></li>
                            <li><span class="emoji-picker-image" style="background-position: -133px -52px;"></span></li>
                            <li><span class="emoji-picker-image" style="background-position: -164px -52px;"></span></li>
                            <li><span class="emoji-picker-image" style="background-position: -9px -86px;"></span></li>
                            <li><span class="emoji-picker-image" style="background-position: -40px -86px;"></span></li>
                            <li><span class="emoji-picker-image" style="background-position: -71px -86px;"></span></li>
                            <li><span class="emoji-picker-image" style="background-position: -102px -86px;"></span></li>
                            <li><span class="emoji-picker-image" style="background-position: -133px -86px;"></span></li>
                            <li><span class="emoji-picker-image" style="background-position: -164px -86px;"></span></li>
                            <li><span class="emoji-picker-image" style="background-position: -9px -120px;"></span></li>
                            <li><span class="emoji-picker-image" style="background-position: -40px -120px;"></span></li>
                            <li><span class="emoji-picker-image" style="background-position: -71px -120px;"></span></li>
                            <li><span class="emoji-picker-image" style="background-position: -102px -120px;"></span>
                            </li>
                            <li><span class="emoji-picker-  " style="background-position: -133px -120px;"></span>
                            </li>
                            <li><span class="emoji-picker-image" style="background-position: -164px -120px;"></span>
                            </li> 
                            <li><span class="emoji-picker-image" style="background-position: -9px -154px;"></span></li>
                            <li><span class="emoji-picker-image" style="background-position: -40px -154px;"></span></li>
                            <li><span class="emoji-picker-image" style="background-position: -71px -154px;"></span></li>
                            <li><span class="emoji-picker-image" style="background-position: -102px -154px;"></span>
                            </li>
                            <li><span class="emoji-picker-image" style="background-position: -133px -154px;"></span>
                            </li>
                            <li><span class="emoji-picker-image" style="background-position: -164px -154px;"></span>
                            </li>
                        </ul>
                    </div> -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapState } from "vuex";
import { getMessagelists } from "../api/message";
import { getSession } from "../api/session";
import { getStore } from "@/utils/storage";
import store from '../store/index'
export default {
  data() {
    return {
      userid: -1,
      sessions: [],
      showChatBox: false /**是否显示对话框 */,
      joinChatroom: false /**是否进入聊天室 */,
      chatUserinfo: {
        name: "人工客服",
        avater: "",
        //message: [],
        to: {
          sessionname: "",
          targetname: "",
          targettype: "",
          targetid: "",
        },
      },
    };
  },
  computed:{
    ...mapState(['message'])
  },
  methods: {
    ...mapMutations(["SOCKETEMIT", "SOCKETON","MESSAGE"]),
    openChatBox() {
      this.showChatBox = true;
      this.userid = getStore("id");
      this.getSessionlists();
    },
    closeChatBox() {
      this.showChatBox = false;
      this.closeChatroom();
    },
    openChatroom(info) {
      this.joinChatroom = true;
      this.chatUserinfo.name = "人工客服  " + info.with_username;
      this.chatUserinfo.to.sessionname = info.messages;
      this.chatUserinfo.to.targetname = info.with_username;
      this.chatUserinfo.to.targettype = info.sessiontype;
      this.chatUserinfo.to.targetid = info.with_userid;
      this.getMessage(info.with_username, info.sessiontype);
    },
    closeChatroom() {
      this.joinChatroom = false;
    },
    getMessage(sender_name, sessiontype) {
      getMessagelists({
        params: { userid: getStore("id"), sender_name, sessiontype },
      })
        .then((e) => {
          if (!e.data.cannot) {
            //this.chatUserinfo.message = e.data.messagelists;
            this.MESSAGE({message:e.data.messagelists})
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getSessionlists() {
      getSession({ params: { userid: getStore("id") } })
        .then((e) => {
          if (!e.data.cannot) this.sessions = e.data.session;
          //console.log(this.sessions);
          this.SOCKETEMIT({event:"session",params:{
            sessions:this.sessions
          }})
        })
        .catch((err) => {
          console.log(err);
        });
    },
    sendMessage() {
      //console.log(this.$refs["textarea"].innerHTML);
      this.SOCKETEMIT({
        event: "private_message",
        params: {
          sessionname: this.chatUserinfo.to.sessionname,
          sendername: getStore("user"),
          senderid: getStore("id"),
          sender_type: "custom",
          targetname: this.chatUserinfo.to.targetname,
          targettype: this.chatUserinfo.to.targettype,
          targetid: this.chatUserinfo.to.targetid,
          text: this.$refs["textarea"].innerHTML,
        },
      });
      this.$refs["textarea"].innerHTML=""
    },
    insertMessage(message){
      this.chatUserinfo.message=[...this.chatUserinfo.message,{...message}]
    }
  },
  mounted() {
    console.log(this.message)
    // store.state.SocketIO.on("return_private_message",data=>{
    //   console.log(data);
    //     const message ={
    //       STATUS:'y',
    //       TEXT:data.text,
    //       TIME:null,
    //       TYPE:"text",
    //       sender_type:data.sender_type,
    //       senderid:data.senderid,
    //       sendername:data.sendername
    //     }
    //     store.commit("MESSAGE",{message:[message]})
    // })
    /**有些问题 */
    // this.SOCKETON({
    //   event: "return_private_message",
    //   callback: function (data) {
    //     console.log(data);
    //     const message ={
    //       STATUS:'y',
    //       TEXT:data.text,
    //       TIME:null,
    //       TYPE:"text",
    //       sender_type:data.sender_type,
    //       senderid:data.senderid,
    //       sendername:data.sendername
    //     }
    //     //store.commit("MESSAGE",{message:[message]})
    //   },
    //});
  },
};
</script>

<style scoped>
.chatContainer,
.chatContainer div,
.chatContainer ul,
.chatContainer li,
.chatContainer p {
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
}
::-webkit-scrollbar {
  width: 5px;
}
::-webkit-scrollbar-track {
  border-radius: 10px;
}
::-webkit-scrollbar-thumb:window-inactive {
  background: rgba(175, 190, 255, 0.4);
}
.btn-default-styles {
  outline: none;
  resize: none;
  border: none;
  display: inline-block;
  margin-bottom: 0;
  font-size: 14px;
  font-weight: 400;
  line-height: 1.42857143;
  text-align: center;
  white-space: nowrap;
  vertical-align: middle;
  -ms-touch-action: manipulation;
  touch-action: manipulation;
  cursor: pointer;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  background-image: none;
  background: #bbb;
  color: #fff;
  border-radius: 4px;
}
.btn-default-styles:focus {
  outline: none;
}
.btn-default-styles:hover {
  background: #c5c5c5;
  animation: anniu 1s infinite;
}
.btn-default-styles:active {
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.2) inset;
}

.chatContainer {
  position: fixed;
  bottom: 20px;
  right: 20px;
}
.chatBtn {
  width: 50px;
  height: 50px;
  background: black;
  color: #fff;
  line-height: 50px;
  text-align: center;
  border-radius: 50%;
  box-shadow: 2px 2px 2px #d4d4d4;
  cursor: pointer;
  position: fixed;
  bottom: 50px;
  right: 50px;
  z-index: 1000;
}
.chatBtn:hover {
  background: rgb(190, 188, 188);
  box-shadow: none;
}
.chatBtn > i {
  font-size: 25px;
  margin-top: 12.5px;
}
.chatBox {
  width: 370px;
  min-width: 320px;
  height: 570px;
  border-radius: 10px;
  background: #f5ecff;
  position: absolute;
  bottom: 0;
  right: 70px;
  overflow: hidden;
  box-shadow: 1px 1px 2px #c0c0c0;
  z-index: 1005;
  position: fixed;
  right: 50px;
  bottom: 50px;
}
.chatBox-head {
  width: 100%;
  height: 75px;
  background: black;
  position: absolute;
  top: 0;
  left: 0;
}
.chatBox-head-one {
  width: 100%;
  height: 75px;
  line-height: 75px;
  color: #fff;
  font-size: 20px;
  text-align: center;
  position: absolute;
  top: 0;
  left: 0;
}
.chatBox-head-two {
  width: 100%;
  height: 75px;
  color: #fff;
  padding: 10px 10px;
  position: absolute;
  top: 0;
  left: 0;
}
.chat-return {
  float: left;
  width: 50px;
  height: 30px;
  line-height: 30px;
  border-radius: 10px;
  cursor: pointer;
  text-align: center;
  margin-top: 15px;
}

.chat-return:hover {
  background: rgb(211, 208, 208);
}
.chat-close {
  float: right;
  width: 40px;
  height: 30px;
  line-height: 30px;
  border-radius: 10px;
  cursor: pointer;
  text-align: center;
}
.chat-close:hover {
  background: rgb(212, 212, 212);
}
.chat-people {
  float: left;
}
.chat-people > div {
  height: 55px;
  display: inline-block;
  vertical-align: middle;
  line-height: 55px;
  margin-left: 5px;
}
.chat-people > div:nth-of-type(1) {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: #eee;
  overflow: hidden;
}
.chat-people > div:nth-of-type(1) > img {
  width: 50px;
  height: 50px;
}
.chat-people > div:nth-of-type(2) {
  width: 165px;
  text-align: left;
  height: 55px;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}

.chatBox-info {
  width: 100%;
  height: 495px;
  background: #fff;
  text-align: left;
  position: absolute;
  top: 75px;
  left: 0;
}

.chatBox-list {
  width: 100%;
  height: 495px;
  overflow-y: scroll;
}
.chat-list-people:hover {
  cursor: pointer;
  background: #f8f8f8;
}
.chat-list-people > div {
  height: 55px;
  display: inline-block;
  vertical-align: middle;
  margin-left: 10px;
}
.chat-list-people > div:nth-of-type(1) {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: #eee;
  overflow: hidden;
}
.chat-list-people > div:nth-of-type(1) > img {
  width: 40px;
  height: 40px;
}

.chat-name {
  width: 230px;
}
.chat-name > p {
  margin: 0;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.chat-name > p:nth-of-type(1) {
  line-height: 55px;
}
.chat-list-people > div.message-num {
  display: inline-block;
  height: auto;
  min-width: 10px;
  padding: 3px 5px;
  font-size: 12px;
  font-weight: 700;
  line-height: 1;
  text-align: center;
  white-space: nowrap;
  vertical-align: middle;
  border-radius: 10px;
  margin-right: 15px;
  margin-top: 14px;
  color: #fff;
  background: #f46266;
}
.chat-message-num {
  display: inline-block;
  height: auto;
  min-width: 10px;
  padding: 3px 5px;
  font-size: 12px;
  font-weight: 700;
  line-height: 1;
  text-align: center;
  white-space: nowrap;
  vertical-align: middle;
  border-radius: 10px;
  margin-right: 15px;
  margin-top: 14px;
  color: #fff;
  background: #f46266;
  position: absolute;
  bottom: 35px;
  right: -15px;
}
.chatBox-kuang {
  width: 100%;
  height: 495px;
  overflow-y: scroll;
}
.chatBox-content {
  width: 100%;
}
.chatBox-content-demo {
  width: 100%;
  overflow-y: scroll;
}
.chatBox-content-demo:last-child {
  margin-bottom: 50px;
}

.clearfloat:after {
  display: block;
  clear: both;
  content: "";
  visibility: hidden;
  height: 0;
}
.clearfloat {
  zoom: 1;
  margin: 10px 10px;
}
.clearfloat .right {
  float: right;
}
.author-name {
  text-align: center;
  margin: 15px 0 5px 0;
  color: #888;
}

.clearfloat .chat-message {
  max-width: 252px;
  text-align: left;
  padding: 8px 12px;
  border-radius: 6px;
  word-wrap: break-word;
  display: inline-block;
  position: relative;
}

.clearfloat .left .chat-message {
  background: #d9d9d9;
  min-height: 36px;
}
.clearfloat .left .chat-message:before {
  position: absolute;
  content: "";
  top: 8px;
  left: -6px;
  border-top: 10px solid transparent;
  border-bottom: 10px solid transparent;
  border-right: 10px solid #d9d9d9;
}

.clearfloat .right {
  text-align: right;
}
.clearfloat .right .chat-message {
  background: #8c85e6;
  color: #fff;
  text-align: left;
  min-height: 36px;
}
.clearfloat .right .chat-message:before {
  position: absolute;
  content: "";
  top: 8px;
  right: -6px;
  border-top: 10px solid transparent;
  border-bottom: 10px solid transparent;
  border-left: 10px solid #8c85e6;
}

.clearfloat .chat-avatars {
  display: inline-block;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background: #eee;
  vertical-align: top;
  overflow: hidden;
}
.clearfloat .chat-avatars > img {
  width: 30px;
  height: 30px;
}
.clearfloat .left .chat-avatars {
  margin-right: 10px;
}
.clearfloat .right .chat-avatars {
  margin-left: 10px;
}

.chatBox-send {
  width: 100%;
  padding: 10px 5px;
  background: #eee;
  border-top: 1px #d0d0d0 solid;
  position: absolute;
  bottom: 0;
  left: 0;
}
.div-textarea {
  width: 300px;
  min-height: 20px;
  max-height: 100px;
  _height: 120px;
  padding: 3px;
  outline: 0;
  background: #fff;
  font-size: 14px;
  line-height: 20px;
  word-wrap: break-word;
  overflow-x: hidden;
  overflow-y: auto;
  -webkit-user-modify: read-write-plaintext-only;
  -moz-user-modify: read-write-plaintext-only;
}
.div-textarea:focus {
  box-shadow: 0 0 15px rgba(82, 168, 236, 0.6);
}
.chatBox-send > div {
  float: left;
}
.chatBox-send > div:nth-of-type(2) {
  font-size: 0;
}
.chatBox-send > div button {
  padding: 1px 5px;
  margin-left: 3px;
}
.chatBox-send > div label {
  padding: 1px 5px;
  margin-left: 3px;
}
#chat-biaoqing {
  position: relative;
}
.hidden {
  display: none;
}
.biaoqing-photo {
  width: 200px;
  height: 160px;
  background: #ffffff;
  position: absolute;
  top: -160px;
  right: 40px;
  text-align: left;
  border-radius: 5px;
  border: solid 1px #c5c5c5;
  display: none;
}
.biaoqing-photo::before {
  content: "";
  position: absolute;
  border-top: solid 7px #c5c5c5;
  border-left: solid 9px transparent;
  border-right: solid 9px transparent;
  bottom: -7px;
  right: 36px;
}
.biaoqing-photo::after {
  content: "";
  position: absolute;
  border-top: solid 7px #fff;
  border-left: solid 10px transparent;
  border-right: solid 10px transparent;
  bottom: -5px;
  right: 35px;
}
.biaoqing-photo > ul {
  margin: 0;
  width: 200px;
  height: 160px;
  padding: 3px 2px;
  list-style: none;
}
.biaoqing-photo > ul > li {
  float: left;
  height: 30px;
  margin-left: 2px;
}
.emoji-picker-image {
  display: inline-block;
  width: 30px;
  height: 30px;
  /*background: url(../img/bqxtb01.png) no-repeat;*/
  background-size: 200px auto;
  cursor: pointer;
}
.biaoqing-photo > ul > li span.emoji-picker-image:hover {
  border: solid 1px #f5f5f5;
}
.chat-message img {
  width: 220px;
  height: auto;
}

@media all and (max-width: 768px) {
  .chatBox {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
}
@media all and (max-width: 370px) {
  .chat-name {
    width: 185px;
  }
  .chat-people > div:nth-of-type(2) {
    width: 120px;
  }
  .clearfloat .chat-message {
    max-width: 240px;
  }
}
</style>