import type { Domain, Question } from "./types";

type Fact = [prompt: string, answer: string, wrong1: string, wrong2: string, wrong3: string, note: string];

const facts: Record<Domain, Fact[]> = {
  "クラウドの概念": [
    ["設備を事前購入せず、使用量に応じて支払う考え方はどれですか。","従量課金","固定資産の増加","長期調達","単一テナント化","クラウドでは大きな先行投資を変動費へ置き換えられます。"],
    ["世界各地へ短期間でサービスを展開できるクラウドの利点はどれですか。","グローバル展開の迅速化","手作業の増加","固定容量","物理調達","複数リージョンを利用して世界へ展開できます。"],
    ["障害が発生しても機能を継続する能力を表す用語はどれですか。","耐障害性","垂直統合","ベンダーロック","遅延","冗長化によって一部障害の影響を抑えます。"],
    ["必要なときに必要な量のITリソースを利用できる性質はどれですか。","オンデマンド","固定調達","手動配線","一括購入","クラウドリソースは必要に応じてプロビジョニングできます。"],
    ["AWS Well-Architected Frameworkの柱に含まれるものはどれですか。","運用上の優秀性","広告最適化","人事管理","製品販売","運用上の優秀性はWell-Architectedの柱です。"],
    ["需要予測の誤差による過剰設備を減らす考え方はどれですか。","キャパシティー予測を不要にする","最大容量の常時購入","単一サーバー化","設備の自社所有","需要に合わせてリソースを調整できます。"],
    ["複数の独立した場所へシステムを配置する主な目的はどれですか。","可用性の向上","請求書の削除","暗号鍵の公開","ユーザー数の固定","冗長配置は単一障害点を減らします。"],
    ["クラウドの規模の経済が利用者にもたらす利点はどれですか。","変動費の低減","物理設備の増加","長い調達期間","手動作業の増加","大規模な共同利用により単位コストを下げられます。"],
    ["俊敏性を最もよく表す説明はどれですか。","新しいリソースを短時間で試せる","設備購入に数か月かかる","変更を禁止する","容量を固定する","クラウドでは実験と変更を素早く行えます。"],
    ["災害復旧でRTOが表すものはどれですか。","復旧までに許容される時間","失ってよいデータ量","月額料金","暗号鍵の長さ","RTOはサービス復旧までの目標時間です。"],
    ["災害復旧でRPOが表すものはどれですか。","許容されるデータ損失期間","復旧作業人数","CPU使用率","契約期間","RPOはどの時点までデータを戻せればよいかを示します。"],
    ["マネージドサービスを利用する一般的な利点はどれですか。","運用負担を軽減できる","全責任が利用者へ移る","物理施設を管理する","更新を禁止できる","AWSが基盤運用の一部を担当します。"],
    ["疎結合なアーキテクチャの利点はどれですか。","一部変更の影響を限定できる","全機能が同時停止する","単一サーバーが必須になる","拡張できなくなる","コンポーネント間の依存を減らせます。"],
    ["水平スケーリングの説明として正しいものはどれですか。","インスタンス数を増減する","1台のCPUだけを交換する","リージョンを削除する","利用者を制限する","水平スケーリングは台数を調整します。"],
    ["クラウド導入フレームワークとして組織変革を支援するものはどれですか。","AWS Cloud Adoption Framework","AWS Artifact","Amazon Route 53","AWS Shield","AWS CAFはクラウド導入の組織的観点を整理します。"]
  ],
  "セキュリティとコンプライアンス": [
    ["AWSサービス操作の監査ログを記録するサービスはどれですか。","AWS CloudTrail","Amazon CloudFront","AWS Budgets","Amazon Lightsail","CloudTrailはAPI操作などのイベントを記録します。"],
    ["AWSリソースの設定変更と準拠状況を評価するサービスはどれですか。","AWS Config","Amazon Polly","AWS Batch","Amazon Connect","AWS Configは設定履歴とルール評価を提供します。"],
    ["暗号鍵を作成・管理するサービスはどれですか。","AWS Key Management Service","Amazon Route 53","AWS Cost Explorer","AWS Snowball","AWS KMSは暗号鍵の管理に使用します。"],
    ["DDoS攻撃からAWSリソースを保護するサービスはどれですか。","AWS Shield","AWS Artifact","Amazon Athena","AWS Glue","AWS ShieldはマネージドDDoS保護です。"],
    ["Webアプリへの一般的な攻撃をフィルタリングするサービスはどれですか。","AWS WAF","Amazon SQS","AWS Budgets","Amazon WorkSpaces","AWS WAFはWeb ACLでリクエストを検査します。"],
    ["機密情報やシークレットを安全に保存・ローテーションするサービスはどれですか。","AWS Secrets Manager","Amazon CloudFront","AWS Auto Scaling","AWS Organizations","Secrets Managerはシークレット管理を支援します。"],
    ["AWSのコンプライアンスレポートを入手できるサービスはどれですか。","AWS Artifact","Amazon Inspector","Amazon GuardDuty","AWS Lambda","Artifactから監査レポートなどを取得できます。"],
    ["脅威検出のためログを継続分析するサービスはどれですか。","Amazon GuardDuty","Amazon S3 Glacier","AWS Direct Connect","Amazon AppStream 2.0","GuardDutyはログから不審な動作を検出します。"],
    ["EC2やコンテナイメージなどの脆弱性管理に使うサービスはどれですか。","Amazon Inspector","AWS Budgets","Amazon Route 53","AWS Snow Family","Inspectorはワークロードの脆弱性を検出します。"],
    ["IAMで推奨される権限付与の原則はどれですか。","最小権限","全員へAdministratorAccess","資格情報の共有","ルートユーザーの常用","業務に必要な最小限の権限だけを付与します。"],
    ["複数AWSアカウントを一元管理するサービスはどれですか。","AWS Organizations","Amazon Rekognition","AWS X-Ray","Amazon MQ","Organizationsはアカウント管理とSCPを提供します。"],
    ["従業員が複数AWSアカウントへ一元的にアクセスする仕組みはどれですか。","AWS IAM Identity Center","Amazon SES","AWS DMS","Amazon EFS","IAM Identity Centerはワークフォースアクセスを一元化します。"],
    ["S3に保存された機密データを検出するサービスはどれですか。","Amazon Macie","AWS Shield","Amazon Kinesis","AWS Batch","Macieは機械学習などでS3の機密データを検出します。"],
    ["AWS全体のセキュリティ検出結果を集約するサービスはどれですか。","AWS Security Hub","Amazon Lightsail","AWS Pricing Calculator","AWS Elastic Beanstalk","Security Hubはセキュリティ結果を集約します。"],
    ["EC2ゲストOSのセキュリティパッチを管理する主体は誰ですか。","利用者","AWSの施設担当者のみ","インターネット事業者","認定試験運営者","責任共有モデルではゲストOSは利用者側の責任です。"]
  ],
  "クラウドテクノロジーとサービス": [
    ["コードをサーバー管理なしでイベント駆動実行するサービスはどれですか。","AWS Lambda","Amazon EBS","AWS Artifact","AWS Budgets","Lambdaはサーバーレスコンピューティングサービスです。"],
    ["フルマネージドなリレーショナルデータベースはどれですか。","Amazon RDS","Amazon S3","Amazon SQS","Amazon CloudFront","RDSはリレーショナルDBの運用を簡素化します。"],
    ["フルマネージドなNoSQLキーバリューデータベースはどれですか。","Amazon DynamoDB","Amazon Redshift","Amazon EFS","AWS Direct Connect","DynamoDBはサーバーレスNoSQLデータベースです。"],
    ["グローバルなコンテンツ配信ネットワークはどれですか。","Amazon CloudFront","AWS CloudFormation","Amazon CloudWatch","AWS CloudTrail","CloudFrontはエッジロケーションから配信します。"],
    ["DNSとドメイン登録、ヘルスチェックを提供するサービスはどれですか。","Amazon Route 53","Amazon Inspector","AWS Glue","Amazon Textract","Route 53は高可用なDNSサービスです。"],
    ["メッセージをキューへ保存してシステムを疎結合にするサービスはどれですか。","Amazon SQS","Amazon SNS","Amazon EBS","Amazon Aurora","SQSはマネージドメッセージキューです。"],
    ["複数の購読先へメッセージをプッシュ配信するサービスはどれですか。","Amazon SNS","Amazon EFS","Amazon RDS","AWS Config","SNSはパブリッシュ／サブスクライブ型サービスです。"],
    ["メトリクス、ログ、アラームを提供する監視サービスはどれですか。","Amazon CloudWatch","AWS Artifact","Amazon Cognito","AWS Snowball","CloudWatchはAWS環境の可観測性を提供します。"],
    ["テンプレートでAWSリソースを構築するサービスはどれですか。","AWS CloudFormation","Amazon CloudFront","AWS Shield","AWS Support","CloudFormationはInfrastructure as Codeを提供します。"],
    ["オンプレミスとAWSを専用線で接続するサービスはどれですか。","AWS Direct Connect","Amazon Connect","AWS Lambda","Amazon SES","Direct Connectは専用ネットワーク接続です。"],
    ["EC2で使う永続的なブロックストレージはどれですか。","Amazon EBS","Amazon S3","Amazon SQS","Amazon Route 53","EBSはEC2向けのブロックストレージです。"],
    ["複数EC2から共有できるファイルストレージはどれですか。","Amazon EFS","Amazon EBS","Amazon DynamoDB","AWS KMS","EFSは伸縮性のある共有ファイルシステムです。"],
    ["ペタバイト規模の分析用データウェアハウスはどれですか。","Amazon Redshift","Amazon RDS for MySQL","Amazon ElastiCache","AWS IAM","Redshiftはクラウドデータウェアハウスです。"],
    ["コンテナオーケストレーションにKubernetesを使うサービスはどれですか。","Amazon EKS","Amazon ECS Anywhereのみ","AWS Batchのみ","Amazon Lightsail","EKSはマネージドKubernetesサービスです。"],
    ["VPC内のサブネット間や外部との通信経路を決めるものはどれですか。","ルートテーブル","IAMグループ","AWS Budgets","KMSキー","ルートテーブルがネットワークトラフィックの経路を制御します。"]
  ],
  "請求、料金、サポート": [
    ["将来のAWS構成の概算料金を見積もるツールはどれですか。","AWS Pricing Calculator","AWS Shield","Amazon Inspector","AWS Artifact","Pricing Calculatorは構成ごとの料金見積もりに使います。"],
    ["過去のコストと使用状況を可視化・分析するサービスはどれですか。","AWS Cost Explorer","Amazon CloudWatch Logs","AWS CloudTrail","Amazon Macie","Cost Explorerはコスト分析と予測を提供します。"],
    ["複数アカウントの請求をまとめる機能はどれですか。","AWS Organizationsの一括請求","Amazon SQS","AWS WAF","Amazon Route 53","一括請求で組織の請求を統合できます。"],
    ["AWS料金の基本原則として正しいものはどれですか。","使用した分を支払う","全サービスが定額","必ず長期契約する","データ転送は常に無料","多くのサービスは従量課金です。"],
    ["中断可能な柔軟なEC2処理を最も安価に実行しやすい購入オプションはどれですか。","スポットインスタンス","Dedicated Host","オンデマンドのみ","ハードウェア購入","スポットは未使用容量を大幅な割引で利用します。"],
    ["予測不能で短期のEC2利用に適した購入オプションはどれですか。","オンデマンドインスタンス","3年契約のみ","Dedicated Hostのみ","物理サーバー購入","オンデマンドは長期契約なしで利用できます。"],
    ["AWSの技術サポートプランを比較するとき確認するものはどれですか。","応答時間と問い合わせ方法","S3オブジェクト数だけ","IAMユーザー名","リージョン数だけ","プランにより応答時間や連絡手段が異なります。"],
    ["AWS環境のベストプラクティス推奨事項を確認できるサービスはどれですか。","AWS Trusted Advisor","Amazon Polly","AWS Step Functions","Amazon MQ","Trusted Advisorはコストやセキュリティ等のチェックを提供します。"],
    ["サービス障害が自分のリソースへ与える影響を確認する場所はどれですか。","AWS Health Dashboard","AWS Artifact","Amazon Athena","AWS WAF","AWS Healthはアカウント固有のイベント情報を提供します。"],
    ["AWS全般のサービス稼働状況を確認する場所はどれですか。","AWS Health Dashboardのサービス履歴","IAMポリシー","S3バケットポリシー","Cost Explorer予測","公開サービスイベントはAWS Healthで確認できます。"],
    ["予算超過の見込みを通知するサービスはどれですか。","AWS Budgets","AWS Config","Amazon GuardDuty","Amazon ECR","Budgetsは実績・予測値に基づくアラートを設定できます。"],
    ["利用量が増えるほど単価が下がる場合がある料金特性はどれですか。","ボリュームディスカウント","固定資産化","手動調達","単一AZ制限","一部サービスは使用量に応じた段階料金を採用します。"],
    ["AWS Marketplaceの用途はどれですか。","第三者ソフトウェアの検索・購入・導入","IAM認証の代替","物理施設の監視","DNS名前解決のみ","MarketplaceはAWS上で利用するソフトウェアのカタログです。"],
    ["コストを分類・集計するためリソースへ付ける情報はどれですか。","コスト配分タグ","ルートテーブル","セキュリティグループ","キーペア","コスト配分タグで部門や案件別に分析できます。"],
    ["長期的で一定量のコンピューティング利用を割引する選択肢はどれですか。","Savings Plans","AWS Artifact","Amazon Macie","AWS WAF","Savings Plansは一定の利用契約に対して割引を提供します。"]
  ]
};

const letters = ["A", "B", "C", "D"];

export const generatedQuestions: Question[] = Object.entries(facts).flatMap(([domain, rows], domainIndex) =>
  rows.map((row, index) => {
    const [prompt, answer, ...rest] = row;
    const note = rest.pop() as string;
    const wrong = rest as string[];
    const correctIndex = (index + domainIndex) % 4;
    const values = [...wrong];
    values.splice(correctIndex, 0, answer);
    return {
      id: `g${domainIndex + 1}-${String(index + 1).padStart(2, "0")}`,
      domain: domain as Domain,
      prompt,
      choices: values.map((text, choiceIndex) => ({
        id: letters[choiceIndex], text,
        explanation: choiceIndex === correctIndex ? `正しい。${note}` : "誤り。設問の目的に合う別の選択肢があります。"
      })),
      correctChoiceId: letters[correctIndex],
      explanation: note,
      difficulty: index < 5 ? "基礎" : index < 11 ? "標準" : "応用",
      source: "AWS Certified Cloud Practitioner (CLF-C02) 試験ガイド準拠",
      reviewedAt: "2026-06-18"
    };
  })
);

export const multipleChoiceQuestions: Question[] = [
  {
    id:"m001", domain:"セキュリティとコンプライアンス", prompt:"AWSアカウントの保護として推奨される対策を2つ選んでください。",
    choices:[
      {id:"A",text:"ルートユーザーにMFAを設定する",explanation:"正しい。ルートユーザーの保護を強化します。"},
      {id:"B",text:"日常作業でルートユーザーを使用する",explanation:"誤り。日常利用は避けます。"},
      {id:"C",text:"利用者ごとに個別のIDを使用する",explanation:"正しい。資格情報を共有しないことが基本です。"},
      {id:"D",text:"アクセスキーをソースコードへ保存する",explanation:"誤り。シークレットをコードへ埋め込みません。"}
    ], correctChoiceIds:["A","C"], explanation:"MFAと個別IDを利用し、ルートユーザーや長期資格情報の使用を最小化します。", difficulty:"標準", source:"CLF-C02 Domain 2", reviewedAt:"2026-06-18"
  },
  {
    id:"m002", domain:"クラウドテクノロジーとサービス", prompt:"可用性を高める設計を2つ選んでください。",
    choices:[
      {id:"A",text:"複数のアベイラビリティーゾーンへ配置する",explanation:"正しい。単一AZ障害へ備えられます。"},
      {id:"B",text:"すべてを1台のインスタンスへ集約する",explanation:"誤り。単一障害点になります。"},
      {id:"C",text:"Elastic Load Balancingで分散する",explanation:"正しい。正常な複数ターゲットへ分散できます。"},
      {id:"D",text:"バックアップを無効にする",explanation:"誤り。復旧可能性が下がります。"}
    ], correctChoiceIds:["A","C"], explanation:"複数AZへの冗長配置とロードバランシングは可用性向上の基本です。", difficulty:"標準", source:"CLF-C02 Domain 3", reviewedAt:"2026-06-18"
  },
  {
    id:"m003", domain:"請求、料金、サポート", prompt:"AWSコストを管理するサービスまたは機能を2つ選んでください。",
    choices:[
      {id:"A",text:"AWS Cost Explorer",explanation:"正しい。コストを可視化・分析します。"},
      {id:"B",text:"AWS Budgets",explanation:"正しい。予算と通知を設定します。"},
      {id:"C",text:"AWS Shield",explanation:"誤り。DDoS保護サービスです。"},
      {id:"D",text:"Amazon Route 53",explanation:"誤り。DNSサービスです。"}
    ], correctChoiceIds:["A","B"], explanation:"Cost Explorerで分析し、Budgetsでしきい値を監視できます。", difficulty:"基礎", source:"CLF-C02 Domain 4", reviewedAt:"2026-06-18"
  }
];

export const supplementalQuestions: Question[] = [
  {
    id:"s001", domain:"セキュリティとコンプライアンス", prompt:"ネットワークアクセスをEC2インスタンス単位で制御する仮想ファイアウォールはどれですか。",
    choices:[{id:"A",text:"セキュリティグループ",explanation:"正しい。インスタンスなどに適用するステートフルな制御です。"},{id:"B",text:"AWS Budgets",explanation:"誤り。コスト管理サービスです。"},{id:"C",text:"Amazon S3",explanation:"誤り。オブジェクトストレージです。"},{id:"D",text:"AWS Artifact",explanation:"誤り。コンプライアンス資料を提供します。"}],
    correctChoiceId:"A",explanation:"セキュリティグループは許可ルールでインバウンド／アウトバウンド通信を制御します。",difficulty:"標準",source:"CLF-C02 Domain 2",reviewedAt:"2026-06-18"
  },
  ...[
    ["コンテナイメージを保存・管理するサービスはどれですか。","Amazon ECR","Amazon EKS","Amazon EFS","Amazon EMR","ECRはマネージドコンテナレジストリです。"],
    ["ビッグデータ処理にApache Sparkなどを利用できるサービスはどれですか。","Amazon EMR","Amazon SES","AWS IAM","AWS WAF","EMRはビッグデータフレームワークの実行を簡素化します。"],
    ["機械学習モデルの構築・学習・デプロイを支援するサービスはどれですか。","Amazon SageMaker AI","Amazon Route 53","AWS Budgets","AWS Artifact","SageMaker AIはマネージド機械学習サービスです。"],
    ["オンプレミスから大量データを物理デバイスでAWSへ転送するサービス群はどれですか。","AWS Snow Family","AWS Shield","Amazon SNS","AWS Config","Snow Familyはエッジ処理とオフラインデータ転送を支援します。"]
  ].map((r,i)=>({
    id:`s00${i+2}`,domain:"クラウドテクノロジーとサービス" as Domain,prompt:r[0],
    choices:[{id:"A",text:r[1],explanation:`正しい。${r[5]}`},{id:"B",text:r[2],explanation:"誤り。別の目的のサービスです。"},{id:"C",text:r[3],explanation:"誤り。別の目的のサービスです。"},{id:"D",text:r[4],explanation:"誤り。別の目的のサービスです。"}],
    correctChoiceId:"A",explanation:r[5],difficulty:"標準" as const,source:"CLF-C02 Domain 3",reviewedAt:"2026-06-18"
  }))
];
