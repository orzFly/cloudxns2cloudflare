cloudxns2cloudflare
===================

事件： http://mp.weixin.qq.com/s/yGHn2PFN1XdvYz8xVsWmww

需要 Node 8。

1. `nvm use 8 && yarn`
1. 导出 CloudXNS 记录成 XML 格式。
1. 去 CloudFlare 添加域名，确保 DNS 记录为空，如果不为空就删光。
1. `export CLOUDFLARE_EMAIL=example@example.com`
1. `export CLOUDFLARE_KEY=MyGoalIsTheSeaOfStars`
1. `node index.js <域名> <XML文件名>`，如 `node index.js orz.com xxx.xml`。

可惜，当然不支持私货啦，比如 LINK, AX, CNAMEX, 301跳转, 302跳转, 隐式跳转。

<a target='_blank' rel='nofollow' href='https://app.codesponsor.io/link/C3uaS5cM1DPVgDuEekjGueTv/orzFly/cloudxns2cloudflare'>
  <img alt='Sponsor' width='888' height='68' src='https://app.codesponsor.io/embed/C3uaS5cM1DPVgDuEekjGueTv/orzFly/cloudxns2cloudflare.svg' />
</a>
