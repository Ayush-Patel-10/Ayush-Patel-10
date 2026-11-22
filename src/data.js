// All content lives here. Facts come from the resume or the public repos.
// Home-page text carries no metrics; numbers live on the project pages.
// Nothing from employer code/data is included, only architecture and outcomes from the resume.

export const profile = {
  name: 'Ayush Patel',
  role: 'Machine Learning Engineer',
  statement: 'I build machine learning systems that make it to production, and keep working once they get there.',
  github: 'https://github.com/Ayush-Patel-10',
  linkedin: 'https://www.linkedin.com/in/ayush-patel-ml/',
  kaggle: 'https://www.kaggle.com/ayusha232',
}

// "Process" section on the home page: the ML lifecycle, no numbers. `page` links to a project page.
export const stages = [
  {
    id: 'ingest', label: 'Ingest', tagline: 'Turn messy documents and schematics into structured data.',
    items: [
      { org: 'UWM', page: 'docai', text: 'Custom Google Document AI extractors and a supervised fine-tuned Gemini power an end-to-end underwriting service.' },
      { org: 'DNV', text: 'Fine-tuned YOLOv8 and ResNet50 (PyTorch, served via ONNX) to detect and classify maritime components on P&ID schematics.' },
    ],
    tools: ['Google Document AI', 'Gemini SFT', 'YOLOv8', 'ResNet50', 'ONNX'],
  },
  {
    id: 'model', label: 'Model', tagline: 'Decisioning models tied to business outcomes.',
    items: [
      { org: 'UWM', page: 'pricing', text: 'Led dynamic pricing: loan officers segmented by price sensitivity, with incentives set by a price elasticity model on live rate sheets and validated in an A/B test.' },
      { org: 'UWM', page: 'pricing', text: 'Building a two-tower model that matches loan officers to weekly incentives using lending history, fraud risk and competitor volume share.' },
      { org: 'UWM', text: 'Delivered fraud detection, early payoff prediction and OFAC sanctions screening models, and piloted multimodal appraisal bias detection.' },
    ],
    tools: ['Price elasticity', 'Two-tower', 'XGBoost', 'A/B testing', 'Multimodal'],
  },
  {
    id: 'serve', label: 'Serve', tagline: 'A platform so every team ships models the same way.',
    items: [
      { org: 'UWM', page: 'anemos', text: 'Architected Anemos, an MLOps platform on Kubeflow Pipelines, GKE and Vertex AI, with CI/CD on custom Terraform modules.' },
      { org: 'DNV', page: 'agents', text: 'Built a multi-agent assistant: an orchestrator routes to sub-agents and tools served from a custom MCP server, with persistent memory in Mem0 and Redis.' },
      { org: 'DNV', page: 'agents', text: 'A text-to-SQL agent for SQL and MongoDB so analysts can self-serve.' },
    ],
    tools: ['Kubeflow', 'GKE', 'Vertex AI', 'Terraform', 'MCP', 'Mem0', 'Redis'],
  },
  {
    id: 'evaluate', label: 'Evaluate', tagline: 'If you cannot measure it, you cannot ship it.',
    items: [
      { org: 'UWM', page: 'docai', text: 'An XGBoost confidence scorer gates LLM answers so only high-confidence ones pass.' },
      { org: 'UWM', page: 'anemos', text: 'An LLM-as-a-Judge pipeline that also generates and validates ground truth, replacing slow manual monitoring.' },
      { org: 'DNV', page: 'agents', text: 'Better RAG retrieval with reciprocal rank fusion, and an LLM judge that removed the need for human review.' },
      { org: 'DNV', page: 'agents', text: 'AI governance with AWS Bedrock guardrails and Microsoft Presidio for PII masking.' },
    ],
    tools: ['LLM-as-a-Judge', 'DeepEval', 'RRF', 'Bedrock Guardrails', 'Presidio'],
  },
  {
    id: 'monitor', label: 'Monitor', tagline: 'Models drift. The platform should notice first.',
    items: [
      { org: 'UWM', page: 'anemos', text: 'Automated feature, data and model drift monitoring inside Anemos.' },
      { org: 'UWM', page: 'docai', text: 'A DSPy framework that auto-tunes prompts across Gemini releases, with drift detection in Dynatrace.' },
    ],
    tools: ['Drift detection', 'Dynatrace', 'DSPy'],
  },
]

// Home-page project cards. Each has a short animated explainer (`scene`) with captioned steps.
// Example data inside the scenes is illustrative.
export const showcase = [
  { id: 'anemos', where: 'UWM', kind: 'MLOps platform', title: 'Anemos', scene: 'anemos',
    blurb: 'One path from training to monitoring that every model team can use.',
    stack: ['Kubeflow', 'GKE', 'Vertex AI', 'Terraform'],
    steps: [
      { t: 'Data and features', d: 'Teams bring their data and features into one shared pipeline.' },
      { t: 'Train', d: 'Training runs as Kubeflow Pipelines on GKE, defined in code.' },
      { t: 'Deploy', d: 'CI/CD built on custom Terraform modules ships the model to Vertex AI.' },
      { t: 'Serve', d: 'The model answers live requests from other systems.' },
      { t: 'Monitor', d: 'Feature, data and model drift are watched automatically. Drift sends the model back to training.' },
    ] },
  { id: 'pricing', where: 'UWM', kind: 'Decisioning', title: 'Dynamic pricing', scene: 'pricing',
    blurb: 'Matching incentives to how sensitive each loan officer is to price.',
    stack: ['Price elasticity', 'Two-tower', 'A/B testing'],
    steps: [
      { t: 'Loan officers', d: 'Loan officers at broker shops all react differently when prices move.' },
      { t: 'Segment', d: 'Group them by how sensitive they are to price.' },
      { t: 'Set incentives', d: 'A price elasticity model on live rate sheets sets the incentive for each group.' },
      { t: 'Test it', d: 'An A/B test splits officers into a control group and a treatment group.' },
      { t: 'Compare', d: 'The treatment group earned a higher margin than control.' },
    ] },
  { id: 'docai', where: 'UWM', kind: 'Document AI', title: 'Underwriting document AI', scene: 'docai',
    blurb: 'Reading a mountain of loan documents so underwriters do not have to.',
    stack: ['Document AI', 'Gemini SFT', 'XGBoost'],
    steps: [
      { t: 'Documents arrive', d: 'Loan files come in as large piles of documents, every day.' },
      { t: 'Extract', d: 'Custom-trained Google Document AI extractors pull out the fields that matter.' },
      { t: 'Answer', d: 'A fine-tuned Gemini answers the underwriting questions from those documents.' },
      { t: 'Score confidence', d: 'An XGBoost model rates each answer using document and Q&A embeddings.' },
      { t: 'Gate', d: 'Only answers above the confidence bar pass through. The rest are held back.' },
    ] },
  { id: 'agents', where: 'DNV', kind: 'LLM agents', title: 'Multi-agent assistant', scene: 'agents',
    blurb: 'An orchestrator that routes questions to the right specialist.',
    stack: ['MCP', 'Mem0', 'Redis', 'Bedrock Guardrails'],
    steps: [
      { t: 'Ask', d: 'An engineer or analyst asks a question in plain language.' },
      { t: 'Route', d: 'The orchestrator works out the intent and picks the right sub-agent.' },
      { t: 'Use tools', d: 'Sub-agents call tools served from a custom MCP server on AWS EC2: text-to-SQL, retrieval and report writing.' },
      { t: 'Remember', d: 'Mem0 and Redis keep conversation memory across turns.' },
      { t: 'Guard', d: 'Guardrails and Presidio mask personal data and block prompt injection before anything is returned.' },
    ] },
  { id: 'rag', where: 'Northeastern research', kind: 'Retrieval-augmented generation', title: 'RAG chatbot on Azure Databricks', scene: 'rag',
    blurb: 'A customisable question-answering system over your own documents, from ingestion to evaluation.',
    stack: ['LangChain', 'Vector search', 'MLflow', 'LLM-as-a-judge', 'Delta tables'],
    steps: [
      { t: 'Ingest', d: 'PDFs and text land in Delta tables, governed through Unity Catalog.' },
      { t: 'Chunk and embed', d: 'Documents are split into chunks. Each chunk becomes an embedding in a vector search index.' },
      { t: 'Screen the question', d: 'A question classifier decides whether the question is relevant before any retrieval happens.' },
      { t: 'Retrieve and prompt', d: 'Similarity search finds the best chunks. The question, those chunks and the chat history are assembled into a prompt.' },
      { t: 'Generate', d: 'A LangChain QnA chain sends the prompt to a foundation-model endpoint and returns the answer.' },
      { t: 'Evaluate', d: 'An MLflow LLM-as-a-judge scores answers offline on a prebuilt question set, and monitoring dashboards track quality over time.' },
    ] },
  { id: 'sat', where: 'Northeastern', kind: 'Computer vision', title: 'Show, Attend and Tell', scene: 'sat',
    blurb: 'Teaching a model where to look while it writes a caption.',
    stack: ['TensorFlow', 'VGG19', 'InceptionV3', 'MS COCO'],
    steps: [
      { t: 'Image in', d: 'The model starts with a photograph (an illustration is shown here).' },
      { t: 'Encode', d: 'A CNN (VGG19 or InceptionV3) turns the image into a grid of feature vectors.' },
      { t: 'Attend', d: 'For the next word, soft attention weights say which regions of the image matter.' },
      { t: 'Decode', d: 'A GRU decoder combines that weighted view with the words so far to pick the next word.' },
      { t: 'Repeat', d: 'Attention moves to a new region for each word, until the sentence is complete.' },
    ] },
  { id: 'litart', where: 'Northeastern, I led the team of four', kind: 'Generative AI', title: 'LitArt', scene: 'litart',
    blurb: 'Fine-tuning big models with small adapters, to go from a book to its cover art.',
    stack: ['LoRA adapters', 'QLoRA', 'PEFT', 'Llama-2', 'Stable Diffusion'],
    steps: [
      { t: 'Book data', d: 'A large multi-genre set of books and their summaries.' },
      { t: 'Freeze the base', d: 'Llama-2 is loaded in 4-bit and frozen. Its billions of weights are not touched.' },
      { t: 'Attach adapters', d: 'Small low-rank LoRA adapters are attached to the attention layers. Only these will learn.' },
      { t: 'Train the adapter', d: 'Supervised fine-tuning teaches the adapter to turn a chapter into a summary. The adapter is saved on its own.' },
      { t: 'Second adapter', d: 'Stable Diffusion gets its own LoRA adapter, which turns the summary into cover art.' },
    ] },
]

// Project pages. Numbers are fine here.
export const pages = {
  anemos: {
    kicker: 'MLOps platform · UWM',
    summary: 'The platform I architected so every model team trains, deploys, serves and monitors models the same way.',
    sections: [
      { h: 'The idea', p: ['A single model can be wired up by hand. A portfolio of models needs a shared path: the same way to train, release, serve and watch each one. Anemos is that path.'] },
      { h: 'What I built', list: [
        'Training, deployment, inference and monitoring on Kubeflow Pipelines, GKE and Vertex AI.',
        'CI/CD built on custom Terraform modules, so infrastructure and releases are defined in code.',
        'Automated feature, data and model drift monitoring.',
        'An LLM-as-a-Judge evaluation pipeline that also generates and validates its own ground-truth data.' ] },
      { h: 'Why evaluation is part of the platform', p: ['Monitoring used to be a manual, periodic exercise. Generating and validating ground truth automatically, then judging model output against it, makes monitoring something the platform does continuously.'] },
    ],
    results: [{ v: '20+', l: 'models in production on the platform' }, { v: 'Months → minutes', l: 'for manual model monitoring' }],
    skills: ['Kubeflow Pipelines', 'GKE', 'Vertex AI', 'Terraform', 'CI/CD', 'Drift detection', 'LLM-as-a-Judge'],
  },
  pricing: {
    kicker: 'Decisioning · UWM',
    summary: 'Setting incentives by how sensitive each loan officer is to price, proven in a live A/B test.',
    sections: [
      { h: 'The approach', p: ['Not every loan officer reacts to a price change the same way. The project first segments loan officers by price sensitivity, then uses a price elasticity model on live rate sheets to set the incentive for each segment.'] },
      { h: 'Proving it', p: ['I ran it as an A/B test across 600 loan officers at 3 broker shops, with a control group and a treatment group, and compared margin between them.'] },
      { h: 'What comes next: matching', list: [
        'A two-tower model that matches loan officers to weekly-changing incentives.',
        'It learns from lending history, fraud risk and competitor volume share.',
        'It directs incentive spend to officers most likely to shift volume, and feeds the price elasticity model.' ] },
      { h: 'Related models', p: ['Alongside this I delivered fraud detection, early payoff prediction and OFAC sanctions screening models across active and servicing portfolios.'] },
    ],
    results: [{ v: '+32%', l: 'margin over control in the A/B test' }, { v: '600', l: 'loan officers across 3 broker shops' }],
    skills: ['Price elasticity modelling', 'Segmentation', 'A/B testing', 'Two-tower recommender', 'Fraud detection', 'XGBoost'],
  },
  docai: {
    kicker: 'Document AI · UWM',
    summary: 'An end-to-end service that reads loan documents and answers underwriting questions, with a gate that keeps wrong answers out.',
    sections: [
      { h: 'The pipeline', list: [
        'Custom-trained Google Document AI extractors pull structured fields out of documents.',
        'A supervised fine-tuned Gemini answers the underwriting questions.',
        'An XGBoost confidence scorer, trained on document and Q&A embeddings, rates every answer.' ] },
      { h: 'The gate', p: ['The scorer is the most important part. Only answers above the confidence bar pass through, at 98% precision. Everything else is held back, so the system does not quietly guess.'] },
      { h: 'Staying current', p: ['Prompts break when model versions change. A DSPy framework auto-tunes prompts across Gemini releases, and drift detection runs in Dynatrace.'] },
    ],
    results: [{ v: '+14%', l: 'answer recall after fine-tuning Gemini' }, { v: '+140%', l: 'underwriter throughput' }, { v: '1M+', l: 'documents a day' }, { v: '98%', l: 'precision at the confidence gate' }],
    skills: ['Google Document AI', 'Gemini SFT', 'XGBoost', 'Embeddings', 'DSPy', 'Dynatrace'],
  },
  agents: {
    kicker: 'LLM agents · DNV',
    summary: 'A multi-agent assistant for engineers and analysts, with tools, memory and guardrails.',
    sections: [
      { h: 'How it is put together', list: [
        'A main orchestrator routes user intent to sub-agents and tools.',
        'Tools are served from a custom MCP server hosted on AWS EC2.',
        'Persistent conversation memory lives in Mem0 and Redis.' ] },
      { h: 'What the agents do', list: [
        'A dynamic text-to-SQL agent turns natural language into optimised SQL and MongoDB queries.',
        'Agents synthesise multiple field reports into the final engineering report for senior management.',
        'Agents auto-generate unit tests on GitHub commits.' ] },
      { h: 'Making retrieval and answers trustworthy', list: [
        'Reciprocal rank fusion improved RAG search (Recall@10 and Precision@20).',
        'An LLM-as-a-Judge framework auto-scores responses, replacing human-in-the-loop review.',
        'AWS Bedrock guardrails and Microsoft Presidio mask PII and stop prompt injection.' ] },
      { h: 'Also at DNV', p: ['I fine-tuned a computer vision model (YOLOv8 and ResNet50 in PyTorch, served via ONNX) to detect and classify maritime components on P&ID schematics.'] },
    ],
    results: [{ v: '65%', l: 'less query time with text-to-SQL' }, { v: '+50%', l: 'accuracy, with review automated by an LLM judge' }, { v: 'Days → minutes', l: 'to produce final engineering reports' }, { v: '30%', l: 'less testing time from generated unit tests' }],
    skills: ['Multi-agent systems', 'MCP', 'Text-to-SQL', 'RAG', 'LLM-as-a-Judge', 'Guardrails', 'PII masking'],
  },
  rag: {
    kicker: 'Retrieval-augmented generation · Northeastern research',
    summary: 'A customisable, open-domain RAG chatbot framework on Azure Databricks, built end to end.',
    sections: [
      { h: 'The RAG pipeline', list: [
        'Ingest: PDFs and text land in Delta tables. Ingestion is optimised with PySpark on Azure Data Factory.',
        'Chunk and embed: documents are split into chunks and embedded into a vector search index. Upgrading the vector search improved similarity by 60%.',
        'Screen: a question classifier checks relevance before any retrieval is spent.',
        'Retrieve and prompt: similarity search finds chunks, and the question, context and chat history are assembled into a prompt.',
        'Generate: a LangChain QnA chain calls a foundation-model endpoint.' ] },
      { h: 'Governed data', p: ['Raw PDFs live in one table and a processed documentation table holds the extracted text and its embedding vectors, with lineage tracked in Unity Catalog.'] },
      { h: 'Evaluation and monitoring', list: [
        'Offline: an MLflow LLM-as-a-judge scores answers on a prebuilt question-and-answer set.',
        'Online: Lakehouse monitoring tracks how quality changes over time, with automated dashboards.',
        'Every model version is registered in MLflow with its input and output schema.' ] },
    ],
    extras: ['arch', 'ship'],
    results: [{ v: '+60%', l: 'similarity from upgrading vector search' }],
    skills: ['RAG', 'LangChain', 'Vector search', 'Embeddings', 'LLM-as-a-judge', 'MLflow', 'PySpark', 'Delta Lake', 'Azure Databricks'],
    links: [{ label: 'Repository', href: 'https://github.com/Ayush-Patel-10/RAG-using-Azure-Databricks-CI-CD' }],
  },
  sat: {
    kicker: 'Computer vision · Northeastern',
    summary: 'A TensorFlow implementation of the soft-attention image captioning model, comparing two image encoders.',
    sections: [
      { h: 'The model', p: ['An image encoder turns the picture into a grid of features. A GRU decoder writes the caption one word at a time, using Bahdanau soft attention to decide which part of the grid to look at for each word.'] },
      { h: 'Two encoders, one experiment', p: ['I built two versions of the same model, one with a VGG19 encoder and one with InceptionV3, trained on MS COCO and scored with the COCO caption toolkit: BLEU, METEOR, ROUGE-L and SPICE.'] },
      { h: 'What I found', p: ['InceptionV3 was trained on under a third of the data that VGG19 used and scored about the same. That is a useful reminder that encoder quality can matter as much as data volume.'] },
    ],
    extras: ['sat'],
    skills: ['TensorFlow', 'CNN encoders', 'Attention', 'GRU decoder', 'MS COCO', 'BLEU / METEOR / SPICE'],
    links: [
      { label: 'Repository', href: 'https://github.com/Ayush-Patel-10/Show-Attend-and-Tell-Neural-Image-Caption-Generation-with-Visual-Attention' },
      { label: 'Course write-up (team presentation)', href: 'https://expo.baulab.info/2023-Fall/Ayush-Patel-10/' },
    ],
  },
  litart: {
    kicker: 'Generative AI · Northeastern',
    summary: 'Fine-tuning large models with small adapters, to turn book summaries into cover art. I led the team of four.',
    sections: [
      { h: 'Why adapters', p: [
        'A 7-billion-parameter model is too big to retrain on a modest GPU. A LoRA adapter sidesteps that: the original weights stay frozen, and a pair of small low-rank matrices is trained next to them. The adapter is saved as its own small file and loaded on top of the base model.',
        'Pairing that with 4-bit quantisation of the base model (QLoRA) is what lets a model of this size be fine-tuned at all.' ] },
      { h: 'Two adapters, two jobs', list: [
        'Text: LoRA adapters on Llama-2 7B (and a Falcon-40B adapter) learn to summarise book chapters.',
        'Images: a LoRA fine-tune of Stable Diffusion learns to produce the cover art.' ] },
      { h: 'Around the adapters', p: ['The project also covers the data pipeline (dataset, sampler, preprocessing and genre splits), encoder-decoder summarisation baselines with BART, T5 and Pegasus, and exploratory analysis on a 10,000-book multi-genre dataset and on the generated summaries.'] },
    ],
    extras: ['adapters'],
    skills: ['LoRA', 'QLoRA', 'PEFT', '4-bit quantisation', 'TRL SFTTrainer', 'Llama-2', 'Falcon', 'Stable Diffusion', 'PyTorch'],
    links: [{ label: 'Repository', href: 'https://github.com/Ayush-Patel-10/LitArt' }],
  },
}

// Supporting data for the extras on project pages.
export const extras = {
  cicd: {
    flow: [
      { step: 'dev branch', note: 'Developers push code' },
      { step: 'Pull request', note: 'Opens against main' },
      { step: 'Lint workflows', note: 'lint-cicd-workflow-files.yml' },
      { step: 'Bundle CI + tests', note: 'LLMOps-bundle-ci.yml, LLMOps-run-tests.yml (unit + integration)' },
      { step: 'Staging deploy', note: 'push to main: LLMOps-bundle-cd-staging.yml' },
      { step: 'Production deploy', note: 'push to release: LLMOps-bundle-cd-prod.yml' },
    ],
    costs: [
      { label: 'Serverless real-time inference', value: 94.91 },
      { label: 'Serverless SQL', value: 75.12 },
      { label: 'All-purpose compute (DBUs)', value: 21.95 },
      { label: 'Virtual machines (D3 v2)', value: 16.9 },
    ],
    costNote: 'Single-node, single-user cluster with auto-termination after 120 minutes of inactivity.',
    steps: [
      { t: 'Push to dev', d: 'Developers push work to the dev branch.' },
      { t: 'Pull request checks', d: 'A pull request lints the workflow files, validates the bundle and runs unit and integration tests.' },
      { t: 'Staging', d: 'A push to main deploys the bundle to staging.' },
      { t: 'Production', d: 'A push to the release branch deploys to production.' },
    ],
  },
  sat: {
    models: [
      { name: 'VGG19', train: '80,000', val: '20,000', bleu1: 25.09, bleu4: 3.3, meteor: 10.39, rouge: 23.86, spice: 13.27, loss: 0.34 },
      { name: 'InceptionV3', train: '24,000', val: '6,000', bleu1: 26.0, bleu4: 3.17, meteor: 10.04, rouge: 24.0, spice: 13.05, loss: 0.19 },
    ],
    note: 'Both trained for 25 epochs on MS COCO captions, with a 5,000-word vocabulary. Scores are the COCO caption toolkit output from my evaluation notebooks.',
  },
  adapters: {
    rows: [
      { model: 'Llama-2 7B', job: 'Summarise chapters', cfg: 'LoRA r=16, alpha=32, dropout 0.05 on q_proj and v_proj (or all linear layers). 4-bit NF4 base with double quantisation and bf16 compute.' },
      { model: 'Falcon-40B-instruct', job: 'Summarise chapters', cfg: 'LoRA r=18, alpha=32 on query_key_value. The trained adapter is saved as a standalone safetensors file.' },
      { model: 'Stable Diffusion', job: 'Generate cover art', cfg: 'LoRA rank 8, fp16 mixed precision, gradient accumulation, trained for a few hundred steps.' },
    ],
    training: 'Summariser training uses supervised fine-tuning (TRL SFTTrainer) on chapter and summary pairs in an instruction format, with sequence packing, gradient checkpointing, a cosine learning-rate schedule and gradient clipping.',
  },
}
