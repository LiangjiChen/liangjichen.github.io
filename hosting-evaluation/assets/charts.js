(function () {
  var style = getComputedStyle(document.documentElement);
  var accent = style.getPropertyValue('--accent').trim();
  var accent2 = style.getPropertyValue('--accent2').trim();
  var ink = style.getPropertyValue('--ink').trim();
  var muted = style.getPropertyValue('--muted').trim();
  var rule = style.getPropertyValue('--rule').trim();
  var bg2 = style.getPropertyValue('--bg2').trim();

  var palette = [accent, accent2, muted, accent + 'aa', accent2 + 'aa'];

  // --- Chart: 个人网站月均成本对比 ---
  var costChart = echarts.init(document.getElementById('chart-cost'), null, { renderer: 'svg' });
  costChart.setOption({
    animation: false,
    color: palette,
    tooltip: { appendToBody: true, trigger: 'axis', axisPointer: { type: 'shadow' } },
    legend: {
      top: 0,
      textStyle: { color: ink, fontSize: 12 },
      itemWidth: 12,
      itemHeight: 12
    },
    grid: { left: 70, right: 30, top: 46, bottom: 40 },
    xAxis: {
      type: 'category',
      data: ['单机轻量ECS', '分离式OSS/COS', '阿里云SAE休眠', 'CloudBase个人版', '全栈高配ECS'],
      axisLabel: { color: ink, fontSize: 12, interval: 0, rotate: 0 },
      axisLine: { lineStyle: { color: rule } },
      axisTick: { show: false }
    },
    yAxis: {
      type: 'value',
      name: '人民币 / 月',
      nameTextStyle: { color: muted, fontSize: 12 },
      axisLabel: { color: muted, fontSize: 12, formatter: '¥{value}' },
      splitLine: { lineStyle: { color: rule, type: 'dashed' } },
      axisLine: { show: false },
      axisTick: { show: false }
    },
    series: [
      {
        name: '月均成本',
        type: 'bar',
        barWidth: 28,
        data: [6.5, 9.5, 8, 0, 80],
        itemStyle: {
          borderRadius: [4, 4, 0, 0],
          color: function (p) { return accent; }
        },
        label: {
          show: true,
          position: 'top',
          color: ink,
          fontSize: 12,
          formatter: function (p) {
            return p.value === 0 ? '免费' : '¥' + p.value;
          }
        }
      }
    ]
  });
  window.addEventListener('resize', function () { costChart.resize(); });

  // --- Chart: 评估维度雷达图 ---
  var radarChart = echarts.init(document.getElementById('chart-radar'), null, { renderer: 'svg' });
  radarChart.setOption({
    animation: false,
    tooltip: { appendToBody: true },
    legend: {
      top: 0,
      textStyle: { color: ink, fontSize: 12 },
      itemWidth: 12,
      itemHeight: 12,
      data: ['阿里云', '腾讯云', '华为云', '七牛云']
    },
    radar: {
      center: ['50%', '56%'],
      radius: '64%',
      indicator: [
        { name: '基础能力', max: 5 },
        { name: 'Java/Spring 支持', max: 5 },
        { name: '静态托管 + CDN', max: 5 },
        { name: '免运维方案', max: 5 },
        { name: '成本友好', max: 5 },
        { name: '备案与合规', max: 5 },
        { name: '中文文档与社区', max: 5 }
      ],
      axisName: { color: ink, fontSize: 12 },
      splitArea: { areaStyle: { color: [bg2, '#ffffff'] } },
      splitLine: { lineStyle: { color: rule } },
      axisLine: { lineStyle: { color: rule } }
    },
    series: [
      {
        type: 'radar',
        data: [
          {
            name: '阿里云',
            value: [5, 5, 5, 5, 4, 5, 5],
            itemStyle: { color: accent },
            lineStyle: { width: 2 },
            areaStyle: { color: accent + '22' }
          },
          {
            name: '腾讯云',
            value: [5, 4.5, 5, 5, 4, 5, 4.5],
            itemStyle: { color: accent2 },
            lineStyle: { width: 2 },
            areaStyle: { color: accent2 + '22' }
          },
          {
            name: '华为云',
            value: [4.5, 4, 4.5, 3.5, 4, 5, 3.5],
            itemStyle: { color: muted },
            lineStyle: { width: 2 },
            areaStyle: { color: muted + '22' }
          },
          {
            name: '七牛云',
            value: [3.5, 2, 5, 3, 5, 4, 3.5],
            itemStyle: { color: '#a3712a' },
            lineStyle: { width: 2 },
            areaStyle: { color: '#a3712a22' }
          }
        ]
      }
    ]
  });
  window.addEventListener('resize', function () { radarChart.resize(); });
})();
