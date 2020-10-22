<template>
  <div class="exercise">
    <header>
      <el-button
        type="primary"
        size="small"
        class="back-home"
        @click="$router.push('/')">
        回到首页
      </el-button>

      <el-button
        type="primary"
        size="small"
        @click="start">
        开始
      </el-button>

      <span class="page">
        {{ pageIndex }} / {{ numbers.length / pageSize }}
      </span>

      <div class="time">
        倒计时：<span class="left-time">{{ leftTime }}</span>
      </div>
    </header>

    <div class="content" v-if="mark === undefined">
      <div class="number-text-list">
        <div
          v-for="(number, index) in currentPageData"
          :key="index"
          class="number-text">
          {{ number.value }}
        </div>
      </div>

      <i class="dividing"></i>

      <div class="number-input-list">
        <input
          v-for="(number, index) in currentPageData"
          :key="index"
          ref="numberInput"
          class="number-input"
          :value="number.inputValue"
          @input="event => number.inputValue = event.target.value"
          @keyup.enter="event => onEnterUp(event, number, index)"/>
      </div>
    </div>
    <div v-else class="mark">
      时间到！
      <div>输入 {{ this.numbers.filter(number => number.inputValue !== undefined).length }} 条</div>
      <div>正确 {{ mark * 2 }} 条</div>
      <div></div>
      <div>
        得分：{{ mark }}
      </div>
      <div>
        {{ }}
      </div>
    </div>
  </div>
</template>

<script>
import countdown from 'countdown'
import { precisionRound } from '@/common/utils'

const maxLength = 1000

export default {
  name: 'exercise',
  data () {
    return {
      timerId: null,
      leftTime: '未开始',
      numbers: [],
      pageIndex: 1,
      pageSize: 5,
      mark: undefined
    }
  },
  computed: {
    currentPageData () {
      return this.numbers.slice(
        this.pageSize * (this.pageIndex - 1),
        this.pageSize * this.pageIndex
      )
    }
  },
  created () {
    this.createRandomNumbers()
  },
  methods: {
    createRandomNumbers () {
      for (let i = 0; i < maxLength; i++) {
        const arr = [
          10000, // 6
          100000, // 7
          10000, // 6
          1000000, // 8
          10000, // 6
          100000, // 7
          10000, // 6
          100000, // 7
          10000, // 6
          100000, // 7
          10000, // 6
          100000, // 7
          100000000, // 10
          100000, // 7
          1000000, // 8
          1000, // 5
          1000000, // 8
          10000000, // 9
          100000000, // 10
          1000000 // 8
        ]
        const bigNum = Math.floor(Math.random() * (arr.length))
        this.numbers.push({
          id: i,
          value: precisionRound(Math.random() * arr[bigNum], 2).toFixed(2),
          inputValue: undefined
        })
      }
    },
    start () {
      if (this.timerId) return

      const now = new Date()
      this.timerId =
        countdown(
          new Date(now.getTime() + 5 * 60 * 1000),
          (ts) => {
            this.leftTime = `${Math.floor(ts.seconds / 60)}分${ts.seconds % 60}秒`
            if (ts.seconds === 0) {
              clearInterval(this.timerId)
              this.timerId = null
              this.leftTime = '结束'
              this.mark = this.numbers.filter(number => number.value === number.inputValue).length / 2
            }
          },
          countdown.SECONDS)

      this.$refs.numberInput[0].focus()
    },
    onEnterUp (event, number, index) {
      if (event.target.value && event.target.value !== '') {
        const num = Number(event.target.value)
        if (!isNaN(num)) {
          number.inputValue = precisionRound(num / 100, 2).toFixed(2)
        }
      }

      if (index !== 4) {
        this.$refs.numberInput[index + 1].focus()
      } else {
        this.pageIndex++
        this.$nextTick(() => {
          this.$refs.numberInput[0].focus()
        })
      }
    },
    reStart () {
      this.mark = undefined
      this.numbers = []
      this.pageIndex = 0
      this.createRandomNumbers()
    }
  }
}
</script>

<style lang="less" scoped>
.exercise {
  header {
    display: flex;
    align-items: center;
    padding: 16px;
    justify-content: left;
    .page {
      margin-left: 20px;
      font-size: 16px;
      color: #333;
    }
    .time {
      color: #333;
      font-size: 14px;
      font-weight: bold;
      margin-left: 20px;
    }
    .left-time {
      color: rgb(221, 60, 60);
    }
  }

  .content {
    margin-top: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    .number-text-list {
      display: flex;
      flex-direction: column;
      align-items: center;
    }
    .number-text {
      font-size: 16px;
      height: 22px;
      color: #000;
      font-weight: bold;
      border: solid 1px #333;
      width: 180px;
      padding: 2px 8px;
      text-align: right;
      &+.number-text {
        margin-top: 20px;
      }
    }
    .dividing {
      width: 100%;
      height: 1px;
      margin: 40px 0;
      border-top: solid 1px #333;;
    }
    .number-input-list {
      display: flex;
      flex-direction: column;
      align-items: center;
    }
    .number-input {
      height: 22px;
      font-size: 16px;
      color: #000;
      font-weight: bold;
      border: solid 1px #333;
      width: 180px;
      padding: 2px 8px;
      text-align: right;
      &+.number-input {
        margin-top: 20px;
      }
    }
  }

  .mark {
    color: #333;
    font-size: 14px;
    font-weight: bold;
    margin-left: 20px;
    font-size: 18px;
    margin-top: 25vh;
    div {
      margin-top: 10px;
    }
  }
}
</style>
