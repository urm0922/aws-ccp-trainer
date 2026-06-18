import type { Question } from "./types";
import { generatedQuestions, multipleChoiceQuestions, supplementalQuestions } from "./generatedQuestions";

const originalQuestions: Question[] = [
  {
    id: "q001", domain: "セキュリティとコンプライアンス",
    prompt: "AWS責任共有モデルにおいて、AWS側の責任はどれですか。",
    choices: [
      { id: "A", text: "IAMユーザーのパスワード管理", explanation: "誤り。IAMユーザーの管理は利用者側の責任です。" },
      { id: "B", text: "EC2上のゲストOSのパッチ適用", explanation: "誤り。EC2のゲストOSは利用者が管理します。" },
      { id: "C", text: "データセンターの物理セキュリティ", explanation: "正しい。施設や物理インフラはAWSが保護します。" },
      { id: "D", text: "S3バケットポリシーの設定", explanation: "誤り。アクセス設定は利用者側の責任です。" }
    ], correctChoiceId: "C", explanation: "AWSはクラウドそのもののセキュリティを担当し、利用者はクラウド内の設定やデータを保護します。"
  },
  {
    id: "q002", domain: "クラウドの概念",
    prompt: "需要に応じてリソースを自動的に増減できるクラウドの利点はどれですか。",
    choices: [
      { id: "A", text: "高可用性", explanation: "高可用性は停止しにくい設計を指します。" },
      { id: "B", text: "伸縮性", explanation: "正しい。伸縮性は需要に合わせて容量を増減する性質です。" },
      { id: "C", text: "ガバナンス", explanation: "ガバナンスは組織的な統制を指します。" },
      { id: "D", text: "暗号化", explanation: "暗号化はデータ保護の仕組みです。" }
    ], correctChoiceId: "B", explanation: "伸縮性により、負荷に応じて必要なリソースだけを利用できます。"
  },
  {
    id: "q003", domain: "クラウドテクノロジーとサービス",
    prompt: "オブジェクトを高い耐久性で保存するためのAWSサービスはどれですか。",
    choices: [
      { id: "A", text: "Amazon S3", explanation: "正しい。S3はマネージド型のオブジェクトストレージです。" },
      { id: "B", text: "Amazon EC2", explanation: "EC2は仮想サーバーを提供します。" },
      { id: "C", text: "Amazon VPC", explanation: "VPCは論理的に分離されたネットワークです。" },
      { id: "D", text: "AWS Lambda", explanation: "Lambdaはサーバーレスでコードを実行します。" }
    ], correctChoiceId: "A", explanation: "Amazon S3は画像、バックアップ、ログなどのオブジェクト保存に適しています。"
  },
  {
    id: "q004", domain: "請求、料金、サポート",
    prompt: "長期間安定して稼働するEC2ワークロードの料金削減に適した選択肢はどれですか。",
    choices: [
      { id: "A", text: "オンデマンドのみを使う", explanation: "柔軟ですが、長期の安定利用では割引契約が有利になり得ます。" },
      { id: "B", text: "Savings Plansを検討する", explanation: "正しい。一定量の利用を契約することで料金を抑えられます。" },
      { id: "C", text: "毎日リージョンを変更する", explanation: "料金最適化の一般的な方法ではありません。" },
      { id: "D", text: "サポートプランを解約する", explanation: "コンピューティング料金の直接的な最適化ではありません。" }
    ], correctChoiceId: "B", explanation: "継続的なコンピューティング利用にはSavings Plansなどの割引モデルを検討します。"
  },
  {
    id: "q005", domain: "セキュリティとコンプライアンス",
    prompt: "AWSアカウントのルートユーザーを保護するために最も重要な対策はどれですか。",
    choices: [
      { id: "A", text: "日常業務で常に使用する", explanation: "ルートユーザーの日常利用は避けます。" },
      { id: "B", text: "MFAを有効にする", explanation: "正しい。MFAは認証情報漏えい時の保護を強化します。" },
      { id: "C", text: "アクセスキーを公開する", explanation: "アクセスキーの公開は重大な危険を招きます。" },
      { id: "D", text: "全員で資格情報を共有する", explanation: "個別のIDを使用し、資格情報を共有しません。" }
    ], correctChoiceId: "B", explanation: "ルートユーザーにはMFAを設定し、必要な作業以外では使用しないことが基本です。"
  },
  {
    id: "q006", domain: "クラウドテクノロジーとサービス",
    prompt: "複数のアベイラビリティーゾーンへトラフィックを分散するサービスはどれですか。",
    choices: [
      { id: "A", text: "Elastic Load Balancing", explanation: "正しい。複数のターゲットにトラフィックを分散します。" },
      { id: "B", text: "AWS Artifact", explanation: "コンプライアンスレポートを提供するサービスです。" },
      { id: "C", text: "AWS Budgets", explanation: "コストや使用量の予算を管理します。" },
      { id: "D", text: "Amazon Inspector", explanation: "ワークロードの脆弱性管理サービスです。" }
    ], correctChoiceId: "A", explanation: "Elastic Load Balancingは正常なターゲットへ受信トラフィックを分散します。"
  },
  {
    id: "q007", domain: "請求、料金、サポート",
    prompt: "設定したコストしきい値への到達を通知するために使えるサービスはどれですか。",
    choices: [
      { id: "A", text: "AWS Budgets", explanation: "正しい。予算とアラートを設定できます。" },
      { id: "B", text: "AWS Shield", explanation: "DDoS保護サービスです。" },
      { id: "C", text: "Amazon Route 53", explanation: "DNSなどを提供するサービスです。" },
      { id: "D", text: "AWS CloudFormation", explanation: "インフラをコードで定義します。" }
    ], correctChoiceId: "A", explanation: "AWS Budgetsではコストや使用量の予算を設定し、しきい値に応じた通知を構成できます。"
  },
  {
    id: "q008", domain: "クラウドの概念",
    prompt: "障害時にもサービスを継続しやすくする設計はどれですか。",
    choices: [
      { id: "A", text: "単一のAZだけに配置する", explanation: "単一障害点が残るため適切ではありません。" },
      { id: "B", text: "複数AZに冗長配置する", explanation: "正しい。独立した複数AZを使うことで耐障害性が高まります。" },
      { id: "C", text: "すべてを1台のEC2へ集約する", explanation: "1台の障害が全体へ影響します。" },
      { id: "D", text: "バックアップを削除する", explanation: "復旧可能性を下げます。" }
    ], correctChoiceId: "B", explanation: "複数のアベイラビリティーゾーンを利用することで、単一拠点の障害に備えられます。"
  }
];

export const questions: Question[] = [...originalQuestions, ...generatedQuestions, ...multipleChoiceQuestions, ...supplementalQuestions];
