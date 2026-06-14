---
title: Running Local AI Models with Ollama
description: Why you'd want to run models on your own hardware and how to get started.
lastUpdated: 2026-06-14T18:55:00Z
sidebar:
  order: 6
---

Cloud AI APIs are convenient, but they come with tradeoffs: latency, privacy concerns, rate limits, and ongoing costs. Running models locally with [Ollama](https://ollama.ai) is a compelling alternative for certain workloads.

## What is Ollama?

Ollama is a tool for running large language models locally on your own machine. It wraps model weights, inference, and a simple OpenAI-compatible API into a single CLI. You pull a model by name, run it, and interact with it — no cloud account required.

```sh
ollama pull deepseek-r1
ollama run deepseek-r1
```

It supports dozens of open-weight models: Llama, Mistral, Qwen, Phi, DeepSeek, Gemma, CodeGemma, and more. Quantized variants let you run models that would otherwise require enterprise GPUs on consumer hardware.

## Why go local?

**Privacy.** Your code never leaves your machine. For projects under NDA, proprietary codebases, or anything sensitive, this alone can be the deciding factor.

**Regulatory compliance.** Industries like healthcare, finance, defense, and legal often prohibit sending data to third-party APIs. Local models let these teams use AI without running afoul of SOC 2, HIPAA, GDPR, or internal data governance policies. No data leaves the boundary.

**No recurring cost.** Once you've got the hardware, inference is free. No API bills, no token counting, no surprise charges.

**Offline capability.** No internet required. Useful when traveling, working from unreliable connections, or deliberately disconnecting.

**Latency.** Local inference has no network hop. First-token latency is often lower than cloud APIs, especially for small models.

## The hardware reality

This is the main constraint. What you can run depends entirely on your machine:

- **8GB RAM** — 3B–7B parameter models (Phi-3, Qwen 2.5 7B, Llama 3.2 3B). Useful for simple codegen, summarization, and chat.
- **16GB RAM** — 7B–14B models (Llama 3.1 8B, DeepSeek Coder V2 Lite, Mistral). Viable for everyday coding assistance.
- **32GB RAM** — 14B–33B models (Qwen 2.5 32B, Yi 34B, DeepSeek Coder V2 16B). Genuinely useful for complex tasks.
- **64GB+ RAM or GPU** — 70B+ models at reasonable speeds.

Apple Silicon Macs with unified memory punch above their weight here — a 64GB M-series Mac can run 30B+ class models comfortably.

## Integrating with coding tools

Ollama exposes an OpenAI-compatible API at `localhost:11434`, so most AI coding tools can use it as a backend with minimal config:

```json
{
  "providers": {
    "ollama": {
      "baseURL": "http://localhost:11434/v1",
      "models": {
        "codellama": {
          "model": "codellama:7b",
          "contextWindow": 16384
        }
      }
    }
  }
}
```

Point Crush, OpenCode, Continue, or any OpenAI-compatible agent at this endpoint and you're running fully local.

## What it's good for

Local models excel at tasks that don't require frontier-level reasoning but benefit from tight iteration loops:

- **Autocomplete and inline suggestions** — small models respond in milliseconds
- **Boilerplate generation** — predictable, repetitive code
- **Simple refactoring** — renaming, extracting, restructuring
- **Code review** — catching obvious issues without sending code to a cloud API
- **Learning and experimentation** — testing prompts, workflows, and patterns at zero marginal cost

## The tradeoff

Local models are not competitive with GPT-5 or Claude Sonnet on complex reasoning, multi-step planning, or nuanced code generation. The gap has narrowed — Qwen 2.5 32B and DeepSeek V2 Lite hold their own surprisingly well — but frontier models are still in a different league.

The trick is knowing when to use which. Quick iterations and sensitive work stay local. Heavy lifting goes to the cloud. Having both available and switching between them is the sweet spot.

## Getting started

```sh
# Install Ollama
brew install ollama

# Pull a model
ollama pull codellama:7b

# Run it
ollama run codellama:7b
```

One command to pull, one to run. From there, point your coding agent at `http://localhost:11434/v1` and you're operational.
