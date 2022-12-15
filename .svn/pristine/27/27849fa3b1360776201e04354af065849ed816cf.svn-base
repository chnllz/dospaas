import vueThis from '@/main'
const config = {
  answered: {
    reportInfo: {
      qname: vueThis.$t('队列'),
      startTime: vueThis.$t('开始时间'),
      endTime: vueThis.$t('结束时间'),
      periods: vueThis.$t('时间段'),
      totalHoldtime: vueThis.$t('总振铃时长'),
      avgHoldtime: vueThis.$t('平均振铃时长'),
      totalCallDuration: vueThis.$t('总通话时长'),
      avgCallDuration: vueThis.$t('平均通话时长'),
      division: vueThis.$t('总呼入数/总接通数'),
      allPercent: vueThis.$t('整体接通率(总接通数÷总呼入数)')
    },
    tab: [{
      name: vueThis.$t('队列接通统计'),
      key: 'queueThroughTheStatisticalVO',
      head: [
        { title: vueThis.$t('队列'), dataIndex: 'qname', key: '1' },
        { title: vueThis.$t('接通次数'), dataIndex: 'connectCount', key: 'connectCount' },
        { title: vueThis.$t('接通次数比率'), dataIndex: 'connectCountPercent', key: 'connectCountPercentage' },
        { title: vueThis.$t('导出详细'), dataIndex: 'exportDetails', key: 'exportDetails', scopedSlots: { customRender: 'exportDetails' } }
      ],
      headChild: [
        { title: vueThis.$t('来电号码'), dataIndex: 'clid', key: 'callNumber' },
        { title: vueThis.$t('来电时间'), dataIndex: 'dateTime', key: 'callTime' },
        { title: vueThis.$t('接听坐席'), dataIndex: 'qagent', key: 'callSeat' },
        { title: vueThis.$t('队列'), dataIndex: 'qname', key: 'queue' },
        { title: vueThis.$t('振铃时长'), dataIndex: 'holdtime', key: 'waitTime' },
        { title: vueThis.$t('通话时长'), dataIndex: 'duration', key: 'connectTime' },
        { title: vueThis.$t('事件'), dataIndex: 'qevent', key: 'event' },
        { title: vueThis.$t('录音'), dataIndex: 'soundRecording', key: 'record', scopedSlots: { customRender: 'record' } }
      ]
    }, {
      name: vueThis.$t('坐席接通统计'),
      key: 'agentThroughTheStatisticalVO',
      head: [
        { title: vueThis.$t('坐席'), dataIndex: 'agent', key: 'seat' },
        { title: vueThis.$t('接通次数'), dataIndex: 'connectCount', key: 'completed' },
        { title: vueThis.$t('接通次数比率'), dataIndex: 'connectCountPercent', key: 'connectCountPercent' },
        { title: vueThis.$t('通话时长'), dataIndex: 'callDuration', key: 'duration' },
        { title: vueThis.$t('通话时长比率'), dataIndex: 'callDurationPercent', key: 'connectTimePercent' },
        { title: vueThis.$t('平均通话时长'), dataIndex: 'avgCallDuration', key: 'callAverage' },
        { title: vueThis.$t('等待时长'), dataIndex: 'waitDuration', key: 'holdtime' },
        { title: vueThis.$t('平均等待时长'), dataIndex: 'avgWaitDuration', key: 'waitAverageTime' },
        { title: vueThis.$t('导出详细'), dataIndex: 'dcxx', key: 'exportDetails', scopedSlots: { customRender: 'exportDetails' } }
      ],
      headChild: [
        { title: vueThis.$t('来电号码'), dataIndex: 'clid', key: 'callNumber' },
        { title: vueThis.$t('来电时间'), dataIndex: 'dateTime', key: 'callTime' },
        { title: vueThis.$t('接听坐席'), dataIndex: 'qagent', key: 'callSeat' },
        { title: vueThis.$t('队列'), dataIndex: 'qname', key: 'queue' },
        { title: vueThis.$t('振铃时长'), dataIndex: 'holdtime', key: 'waitTime' },
        { title: vueThis.$t('通话时长'), dataIndex: 'duration', key: 'connectTime' },
        { title: vueThis.$t('事件'), dataIndex: 'qevent', key: 'event' },
        { title: vueThis.$t('录音'), dataIndex: 'soundRecording', key: 'record', scopedSlots: { customRender: 'record' } }
      ]
    }, {
      name: vueThis.$t('队列等待等级'),
      key: 'queueWaitLevelVO',
      head: [
        { title: vueThis.$t('服务级别'), dataIndex: 'serviceRank', key: 'serviceLevel' },
        { title: vueThis.$t('接通次数'), dataIndex: 'connectCount', key: 'connectCount' },
        { title: vueThis.$t('接通次数比率'), dataIndex: 'connectCountPercent', key: 'connectCountPercent' },
        { title: vueThis.$t('增量'), dataIndex: 'increment', key: 'increment' },
        { title: vueThis.$t('增量比率'), dataIndex: 'incrementPercent', key: 'incrementPercent' },
        { title: vueThis.$t('导出详细'), dataIndex: 'exportDetail', key: 'exportDetails', scopedSlots: { customRender: 'exportDetails' } }
      ],
      headChild: [
        { title: vueThis.$t('来电号码'), dataIndex: 'clid', key: 'callNumber' },
        { title: vueThis.$t('来电时间'), dataIndex: 'dateTime', key: 'callTime' },
        { title: vueThis.$t('接听坐席'), dataIndex: 'qagent', key: 'callSeat' },
        { title: vueThis.$t('队列'), dataIndex: 'qname', key: 'queue' },
        { title: vueThis.$t('振铃时长'), dataIndex: 'holdtime', key: 'waitTime' },
        { title: vueThis.$t('通话时长'), dataIndex: 'duration', key: 'connectTime' },
        { title: vueThis.$t('事件'), dataIndex: 'qevent', key: 'event' },
        { title: vueThis.$t('录音'), dataIndex: 'soundRecording', key: 'record', scopedSlots: { customRender: 'record' } }
      ]
    }, {
      name: vueThis.$t('通话时长等级'),
      key: 'durationLevelVO',
      head: [
        { title: vueThis.$t('通话时长等级'), dataIndex: 'callDurationLevel', key: 'connectTimeLevel' },
        { title: vueThis.$t('接通次数'), dataIndex: 'connectCount', key: 'connectCount' },
        { title: vueThis.$t('接通次数比率'), dataIndex: 'connectCountPercent', key: 'connectCountPercent' },
        { title: vueThis.$t('等待时长'), dataIndex: 'waitDuration', key: 'timeWait' },
        { title: vueThis.$t('平均等待时长'), dataIndex: 'avgWaitDuration', key: 'waitAverageTime' },
        { title: vueThis.$t('导出详细'), dataIndex: 'exportDetail', key: 'exportDetails', scopedSlots: { customRender: 'exportDetails' } }
      ],
      headChild: [
        { title: vueThis.$t('来电号码'), dataIndex: 'clid', key: 'callNumber' },
        { title: vueThis.$t('来电时间'), dataIndex: 'dateTime', key: 'callTime' },
        { title: vueThis.$t('接听坐席'), dataIndex: 'qagent', key: 'callSeat' },
        { title: vueThis.$t('队列'), dataIndex: 'qname', key: 'queue' },
        { title: vueThis.$t('振铃时长'), dataIndex: 'holdtime', key: 'waitTime' },
        { title: vueThis.$t('通话时长'), dataIndex: 'duration', key: 'connectTime' },
        { title: vueThis.$t('事件'), dataIndex: 'qevent', key: 'event' },
        { title: vueThis.$t('录音'), dataIndex: 'soundRecording', key: 'record', scopedSlots: { customRender: 'record' } }
      ]
    }, {
      name: vueThis.$t('队列挂断原因'),
      key: 'queueCauseHangupVO',
      head: [
        { title: vueThis.$t('挂断原因'), dataIndex: 'causeHangup', key: 'failReason' },
        { title: vueThis.$t('接通次数'), dataIndex: 'connectCount', key: 'connectCount' },
        { title: vueThis.$t('接通次数比率'), dataIndex: 'connectCountPercent', key: 'connectCountPercent' },
        { title: vueThis.$t('导出详细'), dataIndex: 'exportDetail', key: 'exportDetails', scopedSlots: { customRender: 'exportDetails' } }
      ],
      headChild: [
        { title: vueThis.$t('来电号码'), dataIndex: 'clid', key: 'callNumber' },
        { title: vueThis.$t('来电时间'), dataIndex: 'dateTime', key: 'callTime' },
        { title: vueThis.$t('接听坐席'), dataIndex: 'qagent', key: 'callSeat' },
        { title: vueThis.$t('队列'), dataIndex: 'qname', key: 'queue' },
        { title: vueThis.$t('振铃时长'), dataIndex: 'holdtime', key: 'waitTime' },
        { title: vueThis.$t('通话时长'), dataIndex: 'duration', key: 'connectTime' },
        { title: vueThis.$t('事件'), dataIndex: 'qevent', key: 'event' },
        { title: vueThis.$t('录音'), dataIndex: 'soundRecording', key: 'record', scopedSlots: { customRender: 'record' } }
      ]
    }, {
      name: vueThis.$t('队列呼叫详细'),
      key: 'queueCallDeatil',
      head: [
        { title: vueThis.$t('来电号码'), dataIndex: 'clid', key: 'callNumber' },
        { title: vueThis.$t('来电时间'), dataIndex: 'dateTime', key: 'callTime' },
        { title: vueThis.$t('接听坐席'), dataIndex: 'qagent', key: 'callSeat' },
        { title: vueThis.$t('队列'), dataIndex: 'qname', key: 'queue' },
        { title: vueThis.$t('振铃时长'), dataIndex: 'duration', key: 'waitTime' },
        { title: vueThis.$t('通话时长'), dataIndex: 'holdtime', key: 'connectTime' },
        { title: vueThis.$t('事件'), dataIndex: 'qevent', key: 'event' },
        { title: vueThis.$t('录音'), dataIndex: 'soundRecording', key: 'record', scopedSlots: { customRender: 'record' } }
      ],
      headChild: [
        { title: vueThis.$t('轨迹'), dataIndex: 'track', key: 'track' },
        { title: vueThis.$t('时间'), dataIndex: 'dateTime', key: 'time' },
        { title: vueThis.$t('队列'), dataIndex: 'qname', key: 'queue' },
        { title: vueThis.$t('事件'), dataIndex: 'qevent', key: 'event' },
        { title: vueThis.$t('接听坐席'), dataIndex: 'qagent', key: 'callSeat' },
        { title: vueThis.$t('信息1'), dataIndex: 'message1', key: 'message1' },
        { title: vueThis.$t('信息2'), dataIndex: 'message2', key: 'message2' },
        { title: vueThis.$t('信息3'), dataIndex: 'message3', key: 'message3' },
        { title: vueThis.$t('时间点'), dataIndex: 'timing', key: 'timePoint' }
      ]
    }]
  },
  unanswered: {
    reportInfo: {
      qname: vueThis.$t('队列'),
      startTime: vueThis.$t('开始时间'),
      endTime: vueThis.$t('结束时间'),
      periods: vueThis.$t('时间段'),
      timeout: vueThis.$t('总超时数'),
      abandon: vueThis.$t('总放弃数'),
      totalHoldtime: vueThis.$t('总振铃时长'),
      avgHoldtime: vueThis.$t('平均振铃时长'),
      division: vueThis.$t('总呼入数/总接通数'),
      allPercent: vueThis.$t('整体接通率(总接通数÷总呼入数)')
    },
    tab: [{
      name: vueThis.$t('队列等待等级'),
      key: 'queueWaitLevelVO',
      head: [
        { title: vueThis.$t('服务级别'), dataIndex: 'grade', key: 'serviceLevel' },
        { title: vueThis.$t('未接次数'), dataIndex: 'unConnectCount', key: 'failCount' },
        { title: vueThis.$t('未接次数比率'), dataIndex: 'unConnectCountPercent', key: 'failCountPercent' },
        { title: vueThis.$t('增量'), dataIndex: 'increment', key: 'increment' },
        { title: vueThis.$t('增量比率'), dataIndex: 'incrementPercent', key: 'incrementPercent' },
        { title: vueThis.$t('导出详细'), dataIndex: 'dcxx', key: 'exportDetails', scopedSlots: { customRender: 'exportDetails' } }
      ],
      headChild: [
        { title: vueThis.$t('来电号码'), dataIndex: 'clid', key: 'callNumber' },
        { title: vueThis.$t('来电时间'), dataIndex: 'dateTime', key: 'callTime' },
        { title: vueThis.$t('队列'), dataIndex: 'qname', key: 'queue' },
        { title: vueThis.$t('等待时长'), dataIndex: 'holdtime', key: 'waitTime' },
        { title: vueThis.$t('进入位置'), dataIndex: 'info1', key: 'inSite' },
        { title: vueThis.$t('退出位置'), dataIndex: 'info2', key: 'outSite' },
        { title: vueThis.$t('放弃原因'), dataIndex: 'qevent', key: 'quitReason' }
      ]
    }, {
      name: vueThis.$t('队列未接统计'),
      key: 'queueThroughTheStatisticalVO',
      head: [
        { title: vueThis.$t('队列'), dataIndex: 'qname', key: 'queue' },
        { title: vueThis.$t('未接次数'), dataIndex: 'unConnectCount', key: 'failCount' },
        { title: vueThis.$t('未接次数比率'), dataIndex: 'unConnectCountPercent', key: 'failCountPercent' },
        { title: vueThis.$t('放弃次数'), dataIndex: 'abandonCount', key: 'quit' },
        { title: vueThis.$t('放弃次数比率'), dataIndex: 'abandonCountPercent', key: 'quitPercent' },
        { title: vueThis.$t('超时次数'), dataIndex: 'timeoutCount', key: 'overtimeCount' },
        { title: vueThis.$t('超时次数比率'), dataIndex: 'timeoutCountPercent', key: 'overtimeCountPercent' },
        { title: vueThis.$t('导出详细'), dataIndex: 'exportDetail', key: 'exportDetails', scopedSlots: { customRender: 'exportDetails' } }
      ],
      headChild: [
        { title: vueThis.$t('来电号码'), dataIndex: 'clid', key: 'callNumber' },
        { title: vueThis.$t('来电时间'), dataIndex: 'dateTime', key: 'callTime' },
        { title: vueThis.$t('队列'), dataIndex: 'qname', key: 'queue' },
        { title: vueThis.$t('等待时长'), dataIndex: 'holdtime', key: 'waitTime' },
        { title: vueThis.$t('进入位置'), dataIndex: 'info1', key: 'inSite' },
        { title: vueThis.$t('退出位置'), dataIndex: 'info2', key: 'outSite' },
        { title: vueThis.$t('放弃原因'), dataIndex: 'qevent', key: 'quitReason' }
      ]
    }, {
      name: vueThis.$t('队列未接详细'),
      key: 'un_agent',
      head: [
        { title: vueThis.$t('来电号码'), dataIndex: 'clid', key: 'name' },
        { title: vueThis.$t('来电时间'), dataIndex: 'dateTime', key: 'age' },
        { title: vueThis.$t('队列'), dataIndex: 'qname', key: 'p1' },
        { title: vueThis.$t('等待时长'), dataIndex: 'holdtime', key: 'x' },
        { title: vueThis.$t('进入位置'), dataIndex: 'info1', key: 'p2' },
        { title: vueThis.$t('退出位置'), dataIndex: 'info2', key: 'p3' },
        { title: vueThis.$t('放弃原因'), dataIndex: 'qevent', key: 'p4' }
      ],
      headChild: [
        { title: vueThis.$t('轨迹'), dataIndex: 'track', key: 'track' },
        { title: vueThis.$t('时间'), dataIndex: 'dateTime', key: 'time' },
        { title: vueThis.$t('队列'), dataIndex: 'qname', key: 'queue' },
        { title: vueThis.$t('事件'), dataIndex: 'qevent', key: 'event' },
        { title: vueThis.$t('接听坐席'), dataIndex: 'qagent', key: 'callSeat' },
        { title: vueThis.$t('信息1'), dataIndex: 'message1', key: 'message1' },
        { title: vueThis.$t('信息2'), dataIndex: 'message2', key: 'message2' },
        { title: vueThis.$t('信息3'), dataIndex: 'message3', key: 'message3' },
        { title: vueThis.$t('时间点'), dataIndex: 'timing', key: 'timePoint' }
      ]
    }]
  },
  distribution: {
    reportInfo: {
      qname: vueThis.$t('队列'),
      startTime: vueThis.$t('开始时间'),
      endTime: vueThis.$t('结束时间'),
      periods: vueThis.$t('时间段'),
      totalInboundTimes: vueThis.$t('总呼叫数'),
      totalHoldtime: vueThis.$t('总等待时长'),
      avgHoldtime: vueThis.$t('平均等待时长'),
      totalConnectTimes: vueThis.$t('总接通数'),
      division: vueThis.$t('总放弃数 / 总超时数')
    },
    tab: [{
      name: vueThis.$t('分布统计'),
      key: 'distributionStatistics',
      head: [
        { title: vueThis.$t('队列'), dataIndex: 'qname', key: 'queue' },
        { title: vueThis.$t('呼入次数'), dataIndex: 'totalInboundTimes', key: 'callCount' },
        { title: vueThis.$t('接通次数'), dataIndex: 'connectCount', key: 'connectCount' },
        { title: vueThis.$t('放弃次数'), dataIndex: 'abandonCount', key: 'quitCount' },
        { title: vueThis.$t('超时次数'), dataIndex: 'timeoutCount', key: 'failCount' },
        { title: vueThis.$t('平均等待时长'), dataIndex: 'avgWaitDuration', key: 'waitAverageTime' },
        { title: vueThis.$t('平均通话时长'), dataIndex: 'avgCallDuration', key: 'connectAverageTime' },
        { title: vueThis.$t('接通比例'), dataIndex: 'connectCountPercent', key: 'connectPercent' },
        { title: vueThis.$t('导出详细'), dataIndex: 'exportDetail', key: 'exportDetails', scopedSlots: { customRender: 'exportDetails' } }
      ],
      headChild: [
        { title: vueThis.$t('来电电话'), dataIndex: 'clid', key: 'callNumber' },
        { title: vueThis.$t('来电时间'), dataIndex: 'dateTime', key: 'callTime' },
        { title: vueThis.$t('队列'), dataIndex: 'qname', key: 'queue' },
        { title: vueThis.$t('等待时长'), dataIndex: 'holdtime', key: 'waitTime' },
        { title: vueThis.$t('通话时长'), dataIndex: 'duration', key: 'connectTime' },
        { title: vueThis.$t('事件'), dataIndex: 'qevent', key: 'event' }
      ]
    }, {
      name: vueThis.$t('每月统计'),
      key: 'monthlyStatistics',
      head: [
        { title: vueThis.$t('月'), dataIndex: 'month', key: 'month' },
        { title: vueThis.$t('呼入次数'), dataIndex: 'totalInboundTimes', key: 'callCount' },
        { title: vueThis.$t('接通次数'), dataIndex: 'connectCount', key: 'connectCount' },
        { title: vueThis.$t('放弃次数'), dataIndex: 'abandonCount', key: 'quitCount' },
        { title: vueThis.$t('超时次数'), dataIndex: 'timeoutCount', key: 'failCount' },
        { title: vueThis.$t('平均等待时长'), dataIndex: 'avgWaitDuration', key: 'waitAverageTime' },
        { title: vueThis.$t('平均通话时长'), dataIndex: 'avgCallDuration', key: 'connectAverageTime' },
        { title: vueThis.$t('接通比例'), dataIndex: 'connectCountPercent', key: 'connectPercent' },
        { title: vueThis.$t('导出详细'), dataIndex: 'exportDetail', key: 'exportDetails', scopedSlots: { customRender: 'exportDetails' } }
      ],
      headChild: [
        { title: vueThis.$t('来电电话'), dataIndex: 'clid', key: 'callNumber' },
        { title: vueThis.$t('来电时间'), dataIndex: 'dateTime', key: 'callTime' },
        { title: vueThis.$t('队列'), dataIndex: 'qname', key: 'queue' },
        { title: vueThis.$t('等待时长'), dataIndex: 'holdtime', key: 'waitTime' },
        { title: vueThis.$t('通话时长'), dataIndex: 'duration', key: 'connectTime' },
        { title: vueThis.$t('事件'), dataIndex: 'qevent', key: 'event' }
      ]
    }, {
      name: vueThis.$t('每周统计'),
      key: 'weekStatistics',
      head: [
        { title: vueThis.$t('周'), dataIndex: 'week', key: 'week' },
        { title: vueThis.$t('呼入次数'), dataIndex: 'totalInboundTimes', key: 'callCount' },
        { title: vueThis.$t('接通次数'), dataIndex: 'connectCount', key: 'connectCount' },
        { title: vueThis.$t('放弃次数'), dataIndex: 'abandonCount', key: 'quitCount' },
        { title: vueThis.$t('超时次数'), dataIndex: 'timeoutCount', key: 'failCount' },
        { title: vueThis.$t('平均等待时长'), dataIndex: 'avgWaitDuration', key: 'waitAverageTime' },
        { title: vueThis.$t('平均通话时长'), dataIndex: 'avgCallDuration', key: 'connectAverageTime' },
        { title: vueThis.$t('接通比例'), dataIndex: 'connectCountPercent', key: 'connectPercent' },
        { title: vueThis.$t('导出详细'), dataIndex: 'exportDetail', key: 'exportDetails', scopedSlots: { customRender: 'exportDetails' } }
      ],
      headChild: [
        { title: vueThis.$t('来电电话'), dataIndex: 'clid', key: 'callNumber' },
        { title: vueThis.$t('来电时间'), dataIndex: 'dateTime', key: 'callTime' },
        { title: vueThis.$t('队列'), dataIndex: 'qname', key: 'queue' },
        { title: vueThis.$t('等待时长'), dataIndex: 'holdtime', key: 'waitTime' },
        { title: vueThis.$t('通话时长'), dataIndex: 'duration', key: 'connectTime' },
        { title: vueThis.$t('事件'), dataIndex: 'qevent', key: 'event' }
      ]
    }, {
      name: vueThis.$t('每天统计'),
      key: 'dayStatistics',
      head: [
        { title: vueThis.$t('天'), dataIndex: 'day', key: 'day' },
        { title: vueThis.$t('呼入次数'), dataIndex: 'totalInboundTimes', key: 'callCount' },
        { title: vueThis.$t('接通次数'), dataIndex: 'connectCount', key: 'connectCount' },
        { title: vueThis.$t('放弃次数'), dataIndex: 'abandonCount', key: 'quitCount' },
        { title: vueThis.$t('超时次数'), dataIndex: 'timeoutCount', key: 'failCount' },
        { title: vueThis.$t('平均等待时长'), dataIndex: 'avgWaitDuration', key: 'waitAverageTime' },
        { title: vueThis.$t('平均通话时长'), dataIndex: 'avgCallDuration', key: 'connectAverageTime' },
        { title: vueThis.$t('接通比例'), dataIndex: 'connectCountPercent', key: 'connectPercent' },
        { title: vueThis.$t('导出详细'), dataIndex: 'exportDetail', key: 'exportDetails', scopedSlots: { customRender: 'exportDetails' } }
      ],
      headChild: [
        { title: vueThis.$t('来电电话'), dataIndex: 'clid', key: 'callNumber' },
        { title: vueThis.$t('来电时间'), dataIndex: 'dateTime', key: 'callTime' },
        { title: vueThis.$t('队列'), dataIndex: 'qname', key: 'queue' },
        { title: vueThis.$t('等待时长'), dataIndex: 'holdtime', key: 'waitTime' },
        { title: vueThis.$t('通话时长'), dataIndex: 'duration', key: 'connectTime' },
        { title: vueThis.$t('事件'), dataIndex: 'qevent', key: 'event' }
      ]
    }, {
      name: vueThis.$t('小时统计'),
      key: 'hourStatistics',
      head: [
        { title: vueThis.$t('小时'), dataIndex: 'hour', key: 'h' },
        { title: vueThis.$t('呼入次数'), dataIndex: 'totalInboundTimes', key: 'callCount' },
        { title: vueThis.$t('接通次数'), dataIndex: 'connectCount', key: 'connectCount' },
        { title: vueThis.$t('放弃次数'), dataIndex: 'abandonCount', key: 'quitCount' },
        { title: vueThis.$t('超时次数'), dataIndex: 'timeoutCount', key: 'failCount' },
        { title: vueThis.$t('平均等待时长'), dataIndex: 'avgWaitDuration', key: 'waitAverageTime' },
        { title: vueThis.$t('平均通话时长'), dataIndex: 'avgCallDuration', key: 'connectAverageTime' },
        { title: vueThis.$t('接通比例'), dataIndex: 'connectCountPercent', key: 'connectPercent' },
        { title: vueThis.$t('导出详细'), dataIndex: 'exportDetail', key: 'exportDetails', scopedSlots: { customRender: 'exportDetails' } }
      ],
      headChild: [
        { title: vueThis.$t('来电电话'), dataIndex: 'clid', key: 'callNumber' },
        { title: vueThis.$t('来电时间'), dataIndex: 'dateTime', key: 'callTime' },
        { title: vueThis.$t('队列'), dataIndex: 'qname', key: 'queue' },
        { title: vueThis.$t('等待时长'), dataIndex: 'holdtime', key: 'waitTime' },
        { title: vueThis.$t('通话时长'), dataIndex: 'duration', key: 'connectTime' },
        { title: vueThis.$t('事件'), dataIndex: 'qevent', key: 'event' }
      ]
    }, {
      name: vueThis.$t('周天统计'),
      key: 'weekDayStatistics',
      head: [
        { title: vueThis.$t('周天'), dataIndex: 'weekDay', key: 'weekday' },
        { title: vueThis.$t('呼入次数'), dataIndex: 'totalInboundTimes', key: 'callCount' },
        { title: vueThis.$t('接通次数'), dataIndex: 'connectCount', key: 'connectCount' },
        { title: vueThis.$t('放弃次数'), dataIndex: 'abandonCount', key: 'quitCount' },
        { title: vueThis.$t('超时次数'), dataIndex: 'timeoutCount', key: 'failCount' },
        { title: vueThis.$t('平均等待时长'), dataIndex: 'avgWaitDuration', key: 'waitAverageTime' },
        { title: vueThis.$t('平均通话时长'), dataIndex: 'avgCallDuration', key: 'connectAverageTime' },
        { title: vueThis.$t('接通比例'), dataIndex: 'connectCountPercent', key: 'connectPercent' },
        { title: vueThis.$t('导出详细'), dataIndex: 'exportDetail', key: 'exportDetails', scopedSlots: { customRender: 'exportDetails' } }
      ],
      headChild: [
        { title: vueThis.$t('来电电话'), dataIndex: 'clid', key: 'callNumber' },
        { title: vueThis.$t('来电时间'), dataIndex: 'dateTime', key: 'callTime' },
        { title: vueThis.$t('队列'), dataIndex: 'qname', key: 'queue' },
        { title: vueThis.$t('等待时长'), dataIndex: 'holdtime', key: 'waitTime' },
        { title: vueThis.$t('通话时长'), dataIndex: 'duration', key: 'connectTime' },
        { title: vueThis.$t('事件'), dataIndex: 'qevent', key: 'event' }
      ]
    }, {
      name: vueThis.$t('详细记录'),
      key: 'detailedRecord',
      head: [
        { title: vueThis.$t('来电电话'), dataIndex: 'clid', key: 'callNumber' },
        { title: vueThis.$t('来电时间'), dataIndex: 'dateTime', key: 'callTime' },
        { title: vueThis.$t('队列'), dataIndex: 'qname', key: 'queue' },
        { title: vueThis.$t('等待时长'), dataIndex: 'holdtime', key: 'waitTime' },
        { title: vueThis.$t('通话时长'), dataIndex: 'duration', key: 'connectTime' },
        { title: vueThis.$t('事件'), dataIndex: 'qevent', key: 'event' }
      ],
      headChild: [
        { title: vueThis.$t('轨迹'), dataIndex: 'track', key: 'track' },
        { title: vueThis.$t('时间'), dataIndex: 'dateTime', key: 'time' },
        { title: vueThis.$t('队列'), dataIndex: 'qname', key: 'queue' },
        { title: vueThis.$t('事件'), dataIndex: 'qevent', key: 'event' },
        { title: vueThis.$t('接听坐席'), dataIndex: 'qagent', key: 'callSeat' },
        { title: vueThis.$t('信息1'), dataIndex: 'message1', key: 'message1' },
        { title: vueThis.$t('信息2'), dataIndex: 'message2', key: 'message2' },
        { title: vueThis.$t('信息3'), dataIndex: 'message3', key: 'message3' },
        { title: vueThis.$t('时间点'), dataIndex: 'timing', key: 'timePoint' }
      ]
    }]
  }
}
const stateInit = {
  tab: {
    queueConnectCount: false,
    fQueueWaitLevel: false,
    distributeCount: false
  },
  tabChild: {
    // 队列接通状态
    queueConnectCount: false,
    seatConnectCount: false,
    queueWaitLevel: false,
    connectTimeLevel: false,
    queueFailReason: false,
    queueCallDeatil: false,
    // 队列未接状态
    fQueueWaitLevel: false,
    queueFailCount: false,
    queueFailDetal: false,
    // 队列分布状态
    distributeCount: false,
    monthCount: false,
    weekCount: false,
    dayCount: false,
    hourCount: false,
    weekdayCount: false,
    detailCount: false
  }
}
const stateDataInit = {
  an_detail: {},
  agent_detail: {},
  an_level: {},
  duration_level: {},
  cause_hangup: {},
  queueCallDeatil: {},
  // 队列未接状态
  un_level: {},
  un_detail: {},
  un_agent: {},
  // 队列分布状态
  queue: {},
  month: {},
  week: {},
  day: {},
  dhous: {},
  weekday: {},
  detailCount: {}
}
export { config, stateInit, stateDataInit }
