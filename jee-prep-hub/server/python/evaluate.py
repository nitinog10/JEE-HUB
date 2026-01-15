"""
JEE Test Evaluation Script
Handles MCQ and numerical answer evaluation with percentile calculation
"""
import json
import sys

def evaluate_mcq(user_answers, correct_answers):
    """Evaluate MCQ answers with +4/-1 marking scheme"""
    score = 0
    correct = 0
    wrong = 0
    
    for q_id, user_ans in user_answers.items():
        if q_id in correct_answers:
            if user_ans == correct_answers[q_id]:
                score += 4
                correct += 1
            elif user_ans is not None:
                score -= 1
                wrong += 1
    
    return {"score": score, "correct": correct, "wrong": wrong, "unattempted": len(correct_answers) - correct - wrong}

def calculate_percentile(user_score, all_scores):
    """Calculate percentile rank"""
    below = sum(1 for s in all_scores if s < user_score)
    return round((below / len(all_scores)) * 100, 2) if all_scores else 0

if __name__ == "__main__":
    # Example usage
    user_ans = {"1": "A", "2": "B", "3": "C"}
    correct_ans = {"1": "A", "2": "C", "3": "C"}
    result = evaluate_mcq(user_ans, correct_ans)
    print(json.dumps(result))
