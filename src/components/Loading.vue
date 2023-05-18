<template>
  <div class="loading">
    <div class="head">
      <div class="yinyang">
        <div class="red">
          <div class="point" style="background-color: #eee"></div>
        </div>
        <div class="white">
          <div class="point"></div>
          <div class="point" style="background-color: red"></div>
        </div>
      </div>
      <div class="shadow">
        <span></span>
      </div>
      <div class="load">
        <p v-text="statusText"></p>
        <span></span>
        <span></span>
        <span></span>
      </div>
    </div>
  </div>
</template>

<script>
import { Resources } from "../define";
export default {
  name: "gsk-loadding",
  data() {
    return {
      statusText: "少女祈祷中",
      background: new Image(),
      thbLogo: new Image(),
      bgm: new Audio(),
      mapInfo: {},
      status: {
        background: false,
        thbLogo: false,
        bgm: false,
        mapInfo: false,
      },
    };
  },
  async created() {
    await this.loadImg();
    await this.loadBGM();
    await this.loadMap();
  },
  watch: {
    ready(newVal) {
      if (newVal) {
        this.statusText = "进入幻想乡";
        this.$parent.loadResources(
          this.background,
          this.thbLogo,
          this.bgm,
          this.mapInfo
        );
      }
    },
  },
  computed: {
    ready() {
      const keys = Object.keys(this.status);
      let s = true;
      keys.forEach((key) => {
        const status = this.status[key];
        if (s && !status) s = false;
      });
      return s;
    },
  },
  methods: {
    async loadImg() {
      const _this = this;
      _this.statusText = "加载静态资源";
      return Promise.all([
        new Promise((resolve, reject) => {
          _this.background.src = Resources.Background;
          _this.background.onload = function () {
            _this.status.background = true;
            return resolve();
          };
        }),
        new Promise((resolve, reject) => {
          _this.thbLogo.src = Resources.THBWiki;
          _this.thbLogo.onload = function () {
            _this.status.thbLogo = true;
            return resolve();
          };
        }),
      ]);
    },
    async loadBGM() {
      const _this = this;
      return new Promise((resolve, reject) => {
        _this.statusText = "加载BGM";
        _this.bgm.src = Resources.BGM;
        _this.status.bgm = true;
        return resolve();
      });
    },
    async loadMap() {
      const _this = this;
      return new Promise((resolve, reject) => {
        _this
          .$axios({
            method: "get",
            url: Resources.Map,
          })
          .then((res) => {
            _this.statusText = "加载地图信息";
            _this.mapInfo = res.data;
            _this.status.mapInfo = true;
            return resolve();
          });
      });
    },
  },
};
</script>

<style lang="less" scoped>
.loading {
  width: 40%;
  margin: auto;
}

.loading,
.card-holder,
.music,
.root {
  -webkit-animation: fade-in 1s;
  animation: fade-in 1s;
}

.head {
  width: 150px;
  height: 150px;
  margin: 200px auto;
}

.shadow {
  width: 150px;
  height: 11px;
  margin: auto;
  position: relative;
  top: 30px;

  span {
    display: block;
    width: 50%;
    height: 62%;
    margin: auto;
    background: #9b9b9b3d;
    border-radius: 50%;
    -webkit-animation: shadow 2s infinite linear;
    animation: shadow 2s infinite linear;
  }
}

.yinyang {
  position: relative;
  width: 150px;
  height: 150px;
  background: linear-gradient(to bottom, #eee 0%, #eee 50%, red 50%, red 100%);
  border: 1px solid red;
  border-radius: 50%;
  -webkit-animation: turn 5s linear infinite;
  animation: turn 5s linear infinite;

  & > .red {
    position: absolute;
    width: 75px;
    height: 75px;
    border-radius: 50%;
    background: red;
    top: 40px;
    left: 0;
  }

  & > .white {
    position: absolute;
    width: 75px;
    height: 75px;
    border-radius: 50%;
    background: #eee;
    top: 40px;
    right: 0;
  }

  .point {
    width: 30px;
    height: 30px;
    border-radius: 50%;
    position: absolute;
    top: 25px;
    left: 22px;
  }
}

.load {
  display: block;
  width: 200px;
  line-height: 20px;
  /* 行高 */
  letter-spacing: 5px;
  /* 字间距 */
  border-radius: 18px;
  /* 圆角设置 */
  position: relative;
  top: 70px;
  margin: auto;
  font-family: Cambria, Cochin, Georgia, Times, "Times New Roman", serif;
  font-weight: bold;
  font-size: 17.5px;

  p {
    -webkit-animation: typing 1s steps(22), blink 2s infinite linear;
    animation: typing 1s steps(22), blink 2s infinite linear;
    display: inline-block;
    background-image: linear-gradient(
      to top right,
      rgb(27, 209, 255),
      rgb(236, 29, 255)
    );
    /* 渐变颜色，对角 */
    background-clip: text;
    color: transparent;
  }

  span {
    display: inline-block;
    background-image: linear-gradient(
      to top right,
      rgb(27, 209, 255),
      rgb(236, 29, 255)
    );
    width: 3px;
    height: 3px;
    margin-left: 3px;
    border-radius: 50%;
    -webkit-animation: dian 2.2s infinite linear;
    animation: dian 2.2s infinite linear;

    span:nth-child(2) {
      /* class名 span的第二个孩子 */
      -webkit-animation-delay: 0.8s;
      animation-delay: 0.8s;
      /* 延时动画属性 */
    }

    span:nth-child(3) {
      -webkit-animation-delay: 1.6s;
      animation-delay: 1.6s;
    }
  }
}

@-webkit-keyframes fade-in {
  0% {
    opacity: 0;
  }

  /*初始状态 透明度为0*/
  40% {
    opacity: 0.4;
  }

  /*过渡状态 透明度为0.4*/
  100% {
    opacity: 1;
  }

  /*结束状态 透明度为1*/
}

@keyframes fade-in {
  0% {
    opacity: 0;
  }

  /*初始状态 透明度为0*/
  40% {
    opacity: 0.4;
  }

  /*过渡状态 透明度为0.4*/
  100% {
    opacity: 1;
  }

  /*结束状态 透明度为1*/
}

@-webkit-keyframes fade-out {
  0% {
    opacity: 1;
  }

  /*初始状态 透明度为1*/
  40% {
    opacity: 0.6;
  }

  /*过渡状态 透明度为0.6*/
  100% {
    opacity: 0;
  }

  /*结束状态 透明度为0*/
}

@keyframes fade-out {
  0% {
    opacity: 1;
  }

  /*初始状态 透明度为1*/
  40% {
    opacity: 0.6;
  }

  /*过渡状态 透明度为0.6*/
  100% {
    opacity: 0;
  }

  /*结束状态 透明度为0*/
}

@-webkit-keyframes shadow {
  0% {
    width: 52%;
  }

  25% {
    width: 32%;
  }

  50% {
    width: 12%;
  }

  75% {
    width: 32%;
  }

  100% {
    width: 52%;
  }
}

@keyframes shadow {
  0% {
    width: 52%;
  }

  25% {
    width: 32%;
  }

  50% {
    width: 12%;
  }

  75% {
    width: 32%;
  }

  100% {
    width: 52%;
  }
}

@-webkit-keyframes turn {
  0% {
    -webkit-transform: rotate(0deg);
  }

  25% {
    -webkit-transform: rotate(90deg);
  }

  50% {
    -webkit-transform: rotate(180deg);
  }

  75% {
    -webkit-transform: rotate(270deg);
  }

  100% {
    -webkit-transform: rotate(360deg);
  }
}

@keyframes turn {
  0% {
    -webkit-transform: rotate(0deg);
  }

  25% {
    -webkit-transform: rotate(90deg);
  }

  50% {
    -webkit-transform: rotate(180deg);
  }

  75% {
    -webkit-transform: rotate(270deg);
  }

  100% {
    -webkit-transform: rotate(360deg);
  }
}

/* loading渐变字体，依次输出动画 */

@-webkit-keyframes typing {
  from {
    width: 0;
  }
}

@keyframes typing {
  from {
    width: 0;
  }
}

/* 设置点的属性 */

@-webkit-keyframes dian {
  0% {
    transform: scale(1);
    opacity: 0;
  }

  25% {
    transform: scale(1.6);
    opacity: 0.6;
  }

  50% {
    transform: scale(2);
    opacity: 1;
  }

  75% {
    transform: scale(1.6);
    opacity: 0.6;
  }

  100% {
    transform: scale(1);
    opacity: 0;
  }
}

@keyframes dian {
  0% {
    transform: scale(1);
    opacity: 0;
  }

  25% {
    transform: scale(1.6);
    opacity: 0.6;
  }

  50% {
    transform: scale(2);
    opacity: 1;
  }

  75% {
    transform: scale(1.6);
    opacity: 0.6;
  }

  100% {
    transform: scale(1);
    opacity: 0;
  }
}
</style>
