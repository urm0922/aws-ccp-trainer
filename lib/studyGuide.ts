export type GuideSection = {
  id: string;
  number: string;
  title: string;
  minutes: number;
  summary: string;
  points: { heading: string; body: string }[];
  memory: string[];
};

export const guideSections: GuideSection[] = [
  {
    id:"cloud",number:"01",title:"クラウドの考え方",minutes:5,summary:"AWSは『必要なIT資源を、必要なときに、使った分だけ利用する』仕組み。まず価値と設計用語を区別します。",
    points:[
      {heading:"クラウドの価値",body:"大きな初期投資を従量課金へ置き換え、設備調達を待たずに試せます。需要に合わせて容量を変え、世界各地へ素早く展開できます。"},
      {heading:"伸縮性とスケーラビリティ",body:"伸縮性は需要に合わせた増減、スケーラビリティは負荷増大へ対応できる能力。水平スケールは台数、垂直スケールは1台の性能を増やします。"},
      {heading:"可用性と耐障害性",body:"高可用性は止まりにくくすること、耐障害性は一部が壊れても継続すること。複数AZへの冗長配置で単一障害点を減らします。"},
      {heading:"グローバル基盤",body:"リージョンは地理的領域、AZはリージョン内の独立拠点、エッジロケーションは利用者に近い配信拠点です。"},
      {heading:"Well-Architected",body:"運用上の優秀性、セキュリティ、信頼性、パフォーマンス効率、コスト最適化、持続可能性の6本柱で設計を評価します。"}
    ],
    memory:["需要に合わせて増減＝伸縮性","複数AZ＝可用性向上","RTO＝復旧までの時間、RPO＝許容データ損失"]
  },
  {
    id:"security",number:"02",title:"セキュリティの土台",minutes:6,summary:"試験では『誰の責任か』『誰に何を許可するか』『どう検知するか』を整理すると解きやすくなります。",
    points:[
      {heading:"責任共有モデル",body:"AWSは施設、物理機器、基盤などクラウド自体を保護。利用者はデータ、IAM、ネットワーク設定、EC2ゲストOSなどクラウド内を保護します。マネージド度が高いほどAWSの運用範囲が増えます。"},
      {heading:"IAM",body:"認証は誰か、認可は何をしてよいか。最小権限を守り、ルートユーザーは日常利用せずMFAを設定。アプリには長期アクセスキーよりIAMロールを使います。"},
      {heading:"暗号化",body:"保存時と転送時を分けて考えます。AWS KMSは暗号鍵、Secrets Managerはパスワードなどのシークレットを管理します。"},
      {heading:"記録・評価・監視",body:"CloudTrailはAPI操作の記録、Configはリソース設定の履歴と評価、CloudWatchはメトリクス・ログ・アラームです。"},
      {heading:"防御と検出",body:"WAFはWeb攻撃、ShieldはDDoS防御。GuardDutyは脅威検出、Inspectorは脆弱性、MacieはS3の機密データ、Security Hubは検出結果の集約です。"}
    ],
    memory:["CloudTrail＝誰が何をした","Config＝設定はどう変わった","CloudWatch＝状態を観測","WAF＝Web、Shield＝DDoS"]
  },
  {
    id:"services",number:"03",title:"主要サービスの地図",minutes:9,summary:"細部を暗記せず、『何を保存するか』『どこで実行するか』『どう接続するか』でサービスを選びます。",
    points:[
      {heading:"コンピューティング",body:"EC2は仮想サーバー、Lambdaはイベント駆動のサーバーレス実行。ECSはAWSのコンテナ管理、EKSはKubernetesです。Auto Scalingは台数調整、ELBはトラフィック分散です。"},
      {heading:"ストレージ",body:"S3はオブジェクト、EBSは主に1台のEC2へ付けるブロック、EFSは複数から共有するファイル。アーカイブはS3 Glacier系ストレージクラスです。"},
      {heading:"データベース",body:"RDS/Auroraはリレーショナル、DynamoDBはサーバーレスNoSQL、Redshiftは分析用データウェアハウス、ElastiCacheはインメモリキャッシュです。"},
      {heading:"ネットワークと配信",body:"VPCは仮想ネットワーク、Route 53はDNS、CloudFrontはCDN、Direct Connectはオンプレミスとの専用接続。セキュリティグループはリソース単位の通信許可です。"},
      {heading:"連携・運用",body:"SQSはキューで疎結合、SNSは複数宛先へ通知。CloudFormationはテンプレートによる構築、Systems Managerは運用管理を支援します。"}
    ],
    memory:["S3＝オブジェクト、EBS＝ブロック、EFS＝共有ファイル","RDS＝関係、DynamoDB＝NoSQL、Redshift＝分析","SQS＝ためる、SNS＝配る"]
  },
  {
    id:"cost",number:"04",title:"料金・請求・サポート",minutes:5,summary:"料金問題は『事前見積もり』『実績分析』『予算通知』『購入方式』のどれを聞いているか見分けます。",
    points:[
      {heading:"料金の基本",body:"基本は使った分だけ支払う従量課金。データ受信は多くの場合無料ですが、外向き転送は課金されることがあります。使用量が増えると単価が下がるサービスもあります。"},
      {heading:"EC2購入方式",body:"オンデマンドは短期・予測不能、Savings Plansは継続利用、スポットは中断可能な処理、Dedicated Hostsは専有物理サーバー要件に使います。"},
      {heading:"コスト管理",body:"Pricing Calculatorは利用前の見積もり、Cost Explorerは過去の分析と予測、Budgetsはしきい値通知。コスト配分タグで部門や案件別に集計します。"},
      {heading:"複数アカウント",body:"AWS Organizationsでアカウントを一元管理し、一括請求を利用できます。SCPは組織内アカウントで許可できる権限の上限を制御します。"},
      {heading:"支援サービス",body:"Trusted Advisorはベストプラクティスの推奨、AWS Healthはサービスイベント、Artifactはコンプライアンス文書、Marketplaceは第三者製品の購入場所です。"}
    ],
    memory:["見積もり＝Calculator、分析＝Cost Explorer、通知＝Budgets","短期＝オンデマンド、継続＝Savings Plans、中断可＝スポット"]
  }
];

export const examStrategy = [
  "一度通読したら、すぐに20問練習へ進む。完璧に暗記してから解き始めない。",
  "誤答したら、解説の用語メモと該当章だけを読み直す。",
  "サービス名ではなく『要件 → 選ぶサービス』の対応で覚える。",
  "本番では消去法を使う。明らかに用途が異なるサービスを先に除外する。"
];
