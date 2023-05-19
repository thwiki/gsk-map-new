<template>
  <div>
    <!-- 导航栏 -->
    <div class="card-holder">
      <p>详细地点仅做标记，无跳转</p>
      <div class="card-wrapper" v-for="map in mapList">
        <div
          class="card"
          :style="{ background: map.mapColor }"
          @click="moveMap(map)"
        >
          <span class="card-content" v-text="map.mapName"></span>
        </div>
        <div class="seccard">
          <div
            class="seccard-item"
            v-for="submap in map.subMap"
            :style="{ background: map.mapColor }"
          >
            <span class="seccard-content" v-text="submap.mapName"></span>
          </div>
        </div>
      </div>
    </div>
    <!-- 导航栏END -->

    <!-- 音乐 -->
    <audio controls="controls" preload hidden ref="BgmPlayer" loop="loop">
      <source :src="bgm.src" />
    </audio>
    <div class="music" @click="playMusic" ref="musicBtn">
      <svg
        t="1634609363630"
        class="icon"
        viewBox="0 0 1024 1024"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        p-id="2563"
        width="30"
        height="30"
      >
        <path
          d="M875.52 433.152q-7.168-1.024-12.8-10.24t-8.704-33.792q-5.12-39.936-26.112-58.88t-65.024-27.136q-46.08-9.216-81.408-37.376t-58.88-52.736q-22.528-21.504-34.816-15.36t-12.288 22.528l0 44.032 0 96.256q0 57.344-0.512 123.904t-0.512 125.952l0 104.448 0 58.368q1.024 24.576-7.68 54.784t-32.768 56.832-64 45.568-99.328 22.016q-60.416 3.072-109.056-21.504t-75.264-61.952-26.112-81.92 38.4-83.456 81.92-54.272 84.992-16.896 73.216 5.632 47.616 13.312l0-289.792q0-120.832 1.024-272.384 0-29.696 15.36-48.64t40.96-22.016q21.504-3.072 35.328 8.704t28.16 32.768 35.328 47.616 56.832 52.224q30.72 23.552 53.76 33.792t43.008 18.944 39.424 20.992 43.008 39.936q23.552 26.624 28.672 55.296t0.512 52.224-14.848 38.4-17.408 13.824z"
          p-id="2564"
        ></path>
      </svg>
    </div>
    <!-- 音乐END -->

    <!-- 地图本体 -->
    <div class="root">
      <template v-for="map in mapList">
        <div
          v-for="submap in map.subMap"
          :key="submap.mapID"
          :class="['place', submap.mapID]"
          :style="{
            position: 'absolute',
            top: submap.top,
            left: submap.left,
            width: submap.width,
            aspectRatio: submap.aspect_ratio,
            borderRadius: submap.border_radius,
          }"
          @click="showMsg(submap)"
          :ref="submap.mapID"
        ></div>
      </template>
      <div class="topic">
        <div class="thblogo">
          <a href="https://thwiki.cc" target="_blank" title="点击进入THBWiki">
            <img :src="logo.src" />
          </a>
        </div>
        <div class="mzsm">
          <p>
            本图内容及说明文本内容均为爱好者根据原作内容收集整理而来，并非官方设定。
          </p>
          <p>illustrator:黄瓜(PIXIV 6681779)</p>
        </div>
      </div>
      <img :src="background.src" class="image" ref="background" />
    </div>
  </div>
</template>
<script>
export default {
  name: "gsk-map",
  data() {
    return {
      loaded: false,
    };
  },
  props: {
    mapList: [],
    bgm: {
      type: HTMLAudioElement,
      default: new Audio(),
    },
    logo: {
      type: HTMLImageElement,
      default: new Image(),
    },
    background: {
      type: HTMLImageElement,
      default: new Image(),
    },
  },
  created() {},
  mounted() {
    this.loaded = true;
  },
  updated() {},
  watch: {
    loaded(newVal) {
      if (newVal) {
        setTimeout(() => {
          this.playMusic();
          this.moveMapByName("temple");
        }, 500);
      }
    },
  },
  methods: {
    showMsg(map) {
      this.$alert(this.parseText(map.mapDesc), map.mapName, {
        closeOnClickModal: true,
        dangerouslyUseHTMLString: true,
        roundButton: true,
      });
    },
    moveMap(map) {
      let firstSubMap = map.subMap[0];
      this.moveMapByName(firstSubMap.mapID);
    },
    moveMapByName(mapName) {
      if (this.$refs[mapName]) {
        window.scrollTo({
          top:this.$refs[mapName][0].offsetTop,
          behavior: "smooth"
        });
      }
    },
    parseText(text) {
      let texts = text.split("\n");
      let nameReg = /\[([^\]]*)\]\]/g;
      let nameReplaceReg = /\[\[([^\]]*)\]\]/g;
      let pReg = /<p>(.*)<\/p>/g;
      texts = texts.map((v) => {
        if (nameReg.test(v)) {
          let names = v.match(nameReg);
          names.map((v1) => {
            v = v.replace(
              nameReplaceReg,
              "<a href='https://thwiki.cc/$1' target='_blank'><strong>$1</strong></a>"
            );
          });
        }
        if (!pReg.test(v)) {
          v = `<p>${v}</p>`;
        }
        return v;
      });
      return texts.join("");
    },
    playMusic() {
      const musicPlayer = this.$refs.BgmPlayer;
      let musicBtn = this.$refs.musicBtn;
      if (musicPlayer.paused) {
        this.$nextTick(() => {
          musicPlayer.play();
        });
        musicBtn.classList.add("play");
      } else {
        this.$nextTick(() => {
          musicPlayer.pause();
        });
        musicBtn.classList.remove("play");
      }
    },
  },
};
</script>
<style lang="less">
a {
  &:link,
  &:visited,
  &:active {
    color: rgb(27, 141, 255);
    text-decoration: none;
  }

  &:hover {
    color: rgb(64, 158, 255);
  }
}
.el-message {
  z-index: 9999 !important;
  min-width: unset;
}

.el-message-box {
  -webkit-backdrop-filter: blur(2px);
  backdrop-filter: blur(2px);
  background-color: rgba(255, 255, 255, 0.7);
  width: 40% !important;
  .el-message-box__header {
    .el-message-box__title {
      text-align: center;
      font-weight: bold;
    }
  }
  .el-message-box__content {
    max-height: 70vh;
    overflow: auto;
    font-size: large;
    text-indent: 2em;
    text-align: justify;
    pre {
      white-space: break-spaces;
      font-family: auto;
      margin: 0;
    }
  }
}

@media screen and (max-width: 750px) {
  .el-message-box {
    width: 80% !important;
  }
}
</style>
<style lang="less" scoped>
.card-holder {
  cursor: pointer;
  position: fixed;
  width: 0px;
  right: 0px;
  overflow: visible;
  z-index: 2000;
  p {
    margin: 2px 2px 0px 0px;
    float: right;
    cursor: auto;
    text-shadow: -1px 0 0.4rem #2196f3, 0 1px 0.4rem #2196f3,
      1px 0 0.4rem #2196f3, 0 -1px 0.4rem #2196f3;
    color: #fff;
    width: max-content;
    max-width: 15vw;
    pointer-events: none;
    font-size: 0.8rem;
  }
  @media screen and (max-width: 750px) {
    p {
      max-width: 25vw;
    }
  }
  .card-wrapper {
    display: block;
    float: left;
    clear: both;

    /* 主标题 */
    .card {
      position: relative;
      right: 32px;
      padding: 16px 64px 16px 32px;
      margin: 2px 8px;
      box-shadow: 8px 0 8px -8px rgba(0, 0, 0, 0.5);
      background: #fff;
      transition: all 0.3s ease-in-out 0.1s;

      /* 主标题文字样式 */
      .card-content {
        display: inline-block;
        color: #fff;
        font-family: "Droid Sans", sans-serif;
        font-size: 16px;
        font-weight: bold;
        white-space: nowrap;
      }

      /* 主标题动效 */
      &:hover {
        position: relative;
        right: 100%;
        margin-right: -32px;
        box-shadow: 0 -8px 8px -8px rgba(0, 0, 0, 0.5),
          0 8px 8px -8px rgba(0, 0, 0, 0.5);
      }

      /* 主标题连携副标题动效 */
      &:hover ~ .seccard {
        position: absolute;
        /* right: 90%; */
        margin-right: 12px;
        /* box-shadow: 0 -8px 8px -8px rgba(0, 0, 0, 0.5), 0 8px 8px -8px rgba(0, 0, 0, 0.5); */
        max-height: var(--max-height);
        background: gray;
      }
    }

    /* 副标题 */
    .seccard {
      position: relative;
      right: 16px;
      box-shadow: 8px 0 8px -8px rgba(0, 0, 0, 0.5);
      transition-delay: 1s;
      transition: max-height, all ease-in-out 1s;
      transition-duration: 0.3s;
      overflow: hidden;
      max-height: 0;

      .seccard-item {
        padding: 2px 8px 2px 8px;

        /* 副标题文字样式 */
        .seccard-content {
          display: inline-block;
          color: #e1dfdf;
          font-family: "Droid Sans", sans-serif;
          font-size: 12px;
          white-space: nowrap;
        }
      }
    }
  }
}
.music {
  z-index: 2000;
  position: fixed;

  svg {
    fill: #929292;
  }

  &.play {
    svg {
      fill: #1296db;
    }
  }
}
.root {
  position: relative;
  width: 100%;
  .image {
    width: 100%;
  }
  .place {
    cursor: pointer;
    &:hover {
      box-shadow: inset 0 0 5px 5px rgba(255, 0, 0, 0.76);
      transition: all 0.4s ease-in-out;
      border-radius: 10%;
    }
  }

  .topic {
    position: absolute;
    left: 0.5%;
    bottom: 0.5%;

    .thblogo {
      width: 15vw;
      height: 17vw;
      img {
        width: 15vw;
        height: 17vw;
      }
    }
    .mzsm {
      font-size: 1.25vw;
      font-weight: bold;
      width: max-content;
      max-width: 23vw;
      pointer-events: none;
      p {
        margin: 0.5rem 0px 2px 0px;
        text-align: justify;
      }
    }
    @media screen and (max-width: 750px) {
      .mzsm {
        font-size: 0.8rem;
        text-shadow: -1px 0 0.4rem #cf8300, 0 1px 0.4rem #cf8300,
          1px 0 0.4rem #cf8300, 0 -1px 0.4rem #cf8300;
        color: #fff;
      }
    }
  }
}
</style>
