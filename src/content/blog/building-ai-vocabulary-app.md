---
title: "Building an AI-Powered Vocabulary Learning App: Dev Log #1"
description: "Documenting the process of designing and developing an intelligent vocabulary learning system that adapts to individual learners."
pubDate: 2024-10-28
tags: ["development", "AI", "language-learning", "education"]
---

Over the past few months, I've been working on an AI-powered vocabulary learning application. The goal is simple: create a system that helps language learners acquire vocabulary more effectively by adapting to their individual learning patterns and providing contextual, personalized feedback.

This is the first in a series of dev logs documenting the design decisions, technical challenges, and lessons learned.

## The Problem Space

Traditional vocabulary learning often relies on:
- Static flashcard systems
- Uniform review schedules
- Decontextualized word lists
- Limited feedback on usage

While these methods work to some extent, they don't account for:
- Individual learning curves and forgetting patterns
- The importance of context in word retention
- The difference between passive recognition and active production
- The need for meaningful practice beyond rote memorization

## Design Goals

I set out with a few key principles:

### 1. Adaptive Spaced Repetition
Rather than using a fixed algorithm like SM-2, I wanted a system that learns each user's forgetting curve for individual words. Some words stick immediately; others need many exposures. The system should detect this and adjust accordingly.

### 2. Contextual Learning
Words should always be presented in realistic contexts — sentences that demonstrate actual usage patterns. The app should generate multiple example sentences showing different grammatical contexts and semantic nuances.

### 3. Active Production Practice
Learners should practice producing the word in context, not just recognizing it. This means exercises like:
- Fill-in-the-blank with context
- Sentence construction prompts
- Synonym/antonym identification in context

### 4. Intelligent Feedback
When learners make mistakes, they should get explanations that help them understand why their answer was incorrect and what the correct usage would be.

## Tech Stack Decisions

After evaluating several approaches, I settled on:

**Frontend**: Next.js with TypeScript
- Server-side rendering for better initial load
- TypeScript for type safety in complex state management
- React for component reusability

**Backend**: FastAPI (Python)
- Fast and modern Python web framework
- Native async support for AI API calls
- Easy integration with ML/NLP libraries

**Database**: PostgreSQL
- Reliable relational model for user progress tracking
- JSON support for flexible metadata storage
- Good performance for read-heavy operations

**AI/NLP**: OpenAI API (GPT-4)
- High-quality context-aware sentence generation
- Flexible for various NLP tasks
- Good at explaining grammatical nuances

## Key Technical Challenges

### Challenge 1: Context Generation Quality

The first major challenge was generating high-quality, natural example sentences. Initially, I tried simple template-based generation:

```python
# Naive approach - too rigid
def generate_example(word):
    return f"The {word} is very important."
```

This produced grammatically correct but pedagogically useless examples. Switching to LLM-based generation helped:

```python
# LLM-based approach
def generate_contextualized_examples(word, level, previous_examples):
    prompt = f"""
    Generate 3 example sentences using the word "{word}"
    suitable for {level} English learners.

    Requirements:
    - Natural, realistic usage
    - Varied grammatical contexts
    - Appropriate complexity for level
    - Different from: {previous_examples}
    """
    # ... API call ...
```

### Challenge 2: Progress Tracking

Modeling learning progress turned out to be more nuanced than expected. I needed to track:
- How many times a word has been seen
- Success rate on different exercise types
- Time since last review
- Context-dependent performance (the same word might be known in one context but not another)

My current data model looks like:

```python
class WordProgress:
    word_id: int
    user_id: int
    exposure_count: int
    last_seen: datetime
    success_rate: float
    context_performance: dict  # Different contexts tracked separately
    next_review: datetime
    confidence_score: float
```

### Challenge 3: Adaptive Scheduling

Standard spaced repetition algorithms like SM-2 use fixed difficulty ratings and interval multipliers. I wanted something more adaptive. My current approach:

1. Track actual forgetting curve per word per user
2. Use logistic regression to predict recall probability based on:
   - Time since last exposure
   - Historical performance
   - Word difficulty (based on frequency, length, abstractness)
3. Schedule reviews when recall probability drops to ~70%

This is still experimental, but early results are promising.

## Current Status

The MVP is functional with:
- User authentication and progress persistence
- Vocabulary deck management
- AI-generated contextual examples
- Multiple exercise types (recognition, cloze, production)
- Basic adaptive scheduling
- Performance analytics dashboard

## What's Next

In the next development phase, I'm planning to add:

1. **Pronunciation Practice**: Integration with speech recognition for pronunciation feedback
2. **Collocations**: Teaching words with their typical collocates and usage patterns
3. **Semantic Networks**: Visualizing relationships between learned words
4. **Comparison with Native Data**: Showing learners how natives actually use words (corpus-based)

## Lessons Learned So Far

**LLMs are powerful but need constraints**: Without careful prompting and output validation, LLMs can generate examples that are technically correct but pedagogically unhelpful.

**User experience trumps algorithmic sophistication**: The most sophisticated spacing algorithm is useless if the review interface is clunky.

**Progress tracking is hard**: Measuring actual learning (not just completion) requires thoughtful metrics and ongoing validation.

**Start simple, iterate**: I initially designed an overly complex system. Stripping it back to core features made development faster and the product more usable.

## Try It Out (Eventually)

I'm planning a limited beta release in early 2025. If you're interested in trying it out or have feedback on the approach, feel free to reach out!

---

*Next dev log: Implementing pronunciation feedback with speech recognition and prosodic analysis.*
