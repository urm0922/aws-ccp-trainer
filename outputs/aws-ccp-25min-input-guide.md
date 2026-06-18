# AWS CCP 最短インプットガイド

所要時間：約25分。目的は満点の知識ではなく、問題演習を始めるための「頭の地図」を作ることです。

## 1. クラウドの考え方（5分）

- AWSは必要なIT資源を、必要なときに、使った分だけ利用する仕組み。
- 大きな初期投資を従量課金へ置き換え、設備調達を待たずに試せる。
- 伸縮性は需要に合わせた増減。スケーラビリティは負荷増大へ対応する能力。
- 高可用性は止まりにくさ。耐障害性は一部が壊れても継続できる性質。
- リージョンは地理的領域、AZは独立拠点、エッジロケーションは利用者に近い配信拠点。
- Well-Architectedの6本柱：運用、セキュリティ、信頼性、性能効率、コスト、持続可能性。

覚える対比：RTO＝復旧までの時間、RPO＝許容されるデータ損失。

## 2. セキュリティの土台（6分）

- 責任共有モデル：AWSはクラウド自体、利用者はデータ・IAM・設定・EC2ゲストOSなどを保護。
- IAMは認証と認可。最小権限、ルートユーザーのMFA、アプリにはIAMロール。
- KMSは暗号鍵、Secrets Managerはパスワードなどのシークレット。
- CloudTrail＝API操作、Config＝設定履歴、CloudWatch＝メトリクス・ログ・アラーム。
- WAF＝Web攻撃、Shield＝DDoS、GuardDuty＝脅威検出、Inspector＝脆弱性、Macie＝S3機密データ、Security Hub＝結果集約。

## 3. 主要サービスの地図（9分）

| 要件 | 選ぶサービス |
|---|---|
| 仮想サーバー | EC2 |
| イベント駆動・サーバーレス | Lambda |
| コンテナ / Kubernetes | ECS / EKS |
| オブジェクト / ブロック / 共有ファイル | S3 / EBS / EFS |
| リレーショナル / NoSQL / 分析 | RDS・Aurora / DynamoDB / Redshift |
| 仮想ネットワーク / DNS / CDN | VPC / Route 53 / CloudFront |
| メッセージをためる / 配る | SQS / SNS |
| テンプレートで環境構築 | CloudFormation |

覚える対比：SQS＝ためる、SNS＝配る。ELB＝分散、Auto Scaling＝台数調整。

## 4. 料金・請求・サポート（5分）

- オンデマンド＝短期・予測不能、Savings Plans＝継続利用、スポット＝中断可能、Dedicated Hosts＝専有要件。
- Pricing Calculator＝事前見積もり、Cost Explorer＝実績分析と予測、Budgets＝しきい値通知。
- Organizations＝複数アカウント管理と一括請求。コスト配分タグ＝部門・案件別集計。
- Trusted Advisor＝推奨事項、AWS Health＝サービスイベント、Artifact＝コンプライアンス文書、Marketplace＝第三者製品。

## 時間効率を落とさない使い方

1. このガイドを一度だけ通読する。
2. すぐ20問練習へ進む。完璧に覚えるまで待たない。
3. 誤答した問題の用語メモと該当章だけを読む。
4. 正答率が安定したら65問模試へ進む。

出典：AWS Certified Cloud Practitioner (CLF-C02) 試験ガイド。実際の試験問題やダンプは使用していません。内容確認日：2026-06-18。
