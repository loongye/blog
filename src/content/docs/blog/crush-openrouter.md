---
title: AI-Assisted Development with Crush and OpenRouter
description: How I use Charmbracelet Crush with OpenRouter for a model-agnostic, terminal-native coding workflow.
lastUpdated: 2026-06-14T18:44:00Z
sidebar:
  order: 4
---

I've been using [Crush](https://github.com/charmbracelet/crush) — the terminal-native AI coding assistant from Charmbracelet — paired with [OpenRouter](https://openrouter.ai/) as my LLM backend. It's a combination that gives me flexibility no single-provider setup can match.

## Why Crush

Crush is an agentic coding tool that lives entirely in the terminal. It understands your codebase through LSP servers, can edit files, run commands, search code, and work through multi-step tasks autonomously. It's comparable to Claude Code or Copilot's agent mode, but with one key difference: **it's model-agnostic**.

You can configure Crush to use any LLM provider — OpenAI, Anthropic, Groq, Google, local models via Ollama, or any OpenAI-compatible API. And you can switch mid-session without losing context.

## Why OpenRouter

[OpenRouter](https://openrouter.ai/) is a unified API gateway that gives you access to 400+ models from 60+ providers through a single endpoint. One API key, one consistent interface. The key features that matter for this workflow:

- **Automatic failover** — if one provider goes down, requests route to the next-best option
- **Cost optimization** — route to the cheapest provider by default, or pin specific models
- **Privacy controls** — enforce zero data retention or block providers that train on your data
- **Latest model access** — aliases like `~openai/gpt-latest` always resolve to the newest model

## Setting it up

The setup is straightforward. Get an API key from OpenRouter, then [configure](https://github.com/charmbracelet/crush#custom-providers) Crush to use it as a provider.

Now `crush` in any project directory gives you a full agentic coding session, backed by whichever model you choose.

## The workflow

I typically keep multiple sessions open for different tasks. The ability to switch models is surprisingly useful:

- **Claude** for complex refactoring and architectural work — it's better at reasoning through multi-file changes
- **GPT** for quick iterations, boilerplate, and exploration — faster, cheaper
- **Open models** via OpenRouter for experimentation or when I want to test something against a specific model

Since OpenRouter normalizes the API, switching between them in Crush is just a config change or session restart. No code changes needed.

## Why this combo works

The terminal-native approach of Crush means I never leave my editor environment. The model-agnostic design means I'm not locked into any single provider. OpenRouter handles the reliability and cost optimization layer. Together, they form a development workflow that's fast, flexible, and resistant to provider outages.

It's the most flexible AI-assisted development setup I've used so far.
