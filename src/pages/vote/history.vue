<template>
  <div class="history">
    <table class="table" v-show="btnNumber === 0">
      <thead>
        <tr>
          <th width="194">
            <div class="border">
              {{$t('m.vote.date')}}
            </div>
          </th>
          <th width="204">
            <div class="border">
              {{$t('m.vote.candidateProjects')}}
            </div>
          </th>
          <th>
            <div class="border">
              {{$t('m.vote.votesNumber')}}
            </div>
          </th>
          <th>
            <div class="border">
              {{$t('m.vote.depositAmount')}}
            </div>
          </th>
        </tr>
      </thead>
      <tbody >
        <tr class='empty' v-if='voteHistoryInfo.length == 0'>
          <td colspan="4">{{$t('m.vote.noData')}}</td>
        </tr>
        <tr v-for="(item, index) in voteHistoryInfo" :key="index">
          <td>{{item.created_at | formatDate}}</td>
          <td>{{item.code && item.code.toUpperCase()}} ({{item.full_name && item.full_name.toUpperCase()}})</td>
          <td>
            <span>{{item.done ? 1 : 0}}</span>
            <tip width="365" class="tip" v-if="!item.done" :text="$t('m.vote.voteCondition', {
              amount: item.quota,
              currency: item.code && item.code.toUpperCase()
            })"></tip>
          </td>
          <td>{{item.amount_total}} {{item.code && item.code.toUpperCase()}}</td>
        </tr>
      </tbody>
    </table>
    <table class="table" v-show="btnNumber === 1">
      <thead>
        <tr>
          <th width="194"><div class="border">{{$t('m.vote.date')}}</div></th>
          <th><div class="border">{{$t('m.vote.candidateProjects')}}</div></th>
          <th><div class="border">{{$t('m.vote.candiesNumber')}}</div></th>
        </tr>
      </thead>
      <tbody>
        <tr class='empty' v-if='voteRewardHistory.length == 0'>
          <td colspan="4">{{$t('m.vote.noData')}}</td>
        </tr>
        <tr v-for="(item, index) in voteRewardHistory" :key="index">
          <td>{{item.created_at | formatDate}}</td>
          <td>{{item.currency && item.currency.toUpperCase()}} ({{item.full_name && item.full_name.toUpperCase()}})</td>
          <td>{{item.amount}} {{item.currency && item.currency.toUpperCase()}}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<style scoped lang="scss">
.table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 14px;
  tr {
    th {
      height: 48px;
      line-height: 48px;
      text-align: left;
      color: #97a5b3;
      font-size: 12px;
      font-weight: normal;
      &:last-child {
        text-align: right;
        .border {
          padding-right: 20px;
        }
      }

      &:first-child {
        .border {
          padding-left: 20px;
        }
      }
    }
    td {
      flex: 1;
      height: 48px;
      color: #666666;
      font-size: 12px;
      &:last-child {
        text-align: right;
        padding-right: 20px;
      }
      &:first-child {
        padding-left: 20px;
      }
      span {
        vertical-align: middle;
      }
    }
  }
  .border {
    border-top: 1px solid #eaedf5;
    border-bottom: 1px solid #eaedf5;
  }
  .tip {
    margin-left: 20px;
    vertical-align: middle;
  }
  .empty {
    td {
      padding-top: 20px;
      color: rgba(0, 0, 0, 0.4);
      font-size: 12px;
      text-align: center !important;
    }
  }
  tbody {
    tr {
      &:nth-child(even) {
        background: #f8f8fb;
      }
    }
  }
}
</style>

<script>
import { mapGetters, mapActions, mapState } from 'vuex'
import formatDate from '@/utils/formatDate'
import tip from '@/components/tip'
export default {
  props: ['btnNumber'],
  computed: {
    ...mapGetters({
      voteHistoryInfo: 'voteHistoryInfo',
      voteRewardHistory: 'voteRewardHistory'
    }),
    ...mapState('currentUser', ['currentUser'])
  },
  components: {
    tip
  },
  mounted() {
    if (this.currentUser) {
      this.getVoteHistory()
    } else {
      this.$router.push(
        this.$i18nRoute({
          name: 'signin',
        }),
      )
    }
  },
  methods: {
    ...mapActions(['getVoteHistory'])
  },
  filters: {
    formatDate
  },
  data() {
    return {
      status: {
        1: this.$t('m.vote.distributed'),
        2: this.$t('m.vote.toDistributed'),
        3: this.$t('m.vote.distributing')
      }
    }
  }
}
</script>

