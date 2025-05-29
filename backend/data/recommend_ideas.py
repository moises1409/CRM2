from dataclasses import dataclass
from .investmentIdea import InvestmentIdea

@dataclass
class RecommendIdeas:
    idea: InvestmentIdea
    evaluation: str
