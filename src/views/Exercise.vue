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

      <div class="time">
        倒计时：<span class="left-time">{{ leftTime }}</span>
      </div>
    </header>

    <div class="content">
      <div
        v-for="number in currentPageData"
        :key="number.id"
        class="number-text">
        {{ number.value }}
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
      leftTime: '',
      numbers: [],
      pageIndex: 1,
      pageSize: 5
    }
  },
  computed: {
    currentPageData () {
      return this.numbers.slice(this.pageSize * (this.pageIndex - 1), this.pageSize * this.pageIndex)
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
          10000, // 6
          10000, // 6
          100000, // 7
          100000, // 7
          100000, // 7
          1000000, // 8
          1000000, // 8
          1000000, // 8
          10000000, // 9
          10000000, // 9
          100000000 // 10
        ]
        const bigNum = Math.floor(Math.random() * (arr.length))
        this.numbers.push({
          id: i,
          value: precisionRound(Math.random() * arr[bigNum], 2).toFixed(2)
        })
      }
    },
    start () {
      const now = new Date()
      this.timerId =
        countdown(
          new Date(now.getTime() + 5 * 60 * 1000),
          (ts) => {
            this.leftTime = ts.toString()
            if (ts.seconds === 0) {
              clearInterval(this.timerId)
              this.leftTime = '结束'
            }
          },
          countdown.SECONDS)
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
    .number-text {
      font-size: 16px;
      color: #000;
      font-weight: bold;
      &+.number-text {
        margin-top: 20px;
      }
    }
  }
}
</style>
