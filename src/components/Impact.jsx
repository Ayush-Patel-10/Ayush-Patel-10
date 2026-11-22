const tools = ['Python', 'PyTorch', 'LoRA / QLoRA', 'Vertex AI', 'Kubeflow', 'GKE', 'Terraform', 'Gemini', 'DSPy', 'LangChain', 'LangGraph', 'MCP', 'XGBoost', 'Databricks', 'MLflow', 'Docker', 'AWS Bedrock', 'BigQuery', 'Kafka', 'Airflow', 'ONNX', 'YOLOv8']

export default function Impact() {
  return (
    <section id="impact" className="impact">
      <div className="marquee" aria-hidden="true">
        <div className="track">
          {[0, 1].map((k) => (
            <div className="group" key={k}>{tools.map((t) => <span key={t + k}>{t}</span>)}</div>
          ))}
        </div>
      </div>
    </section>
  )
}
