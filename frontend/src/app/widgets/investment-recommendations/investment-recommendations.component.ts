import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InvestmentRecommendation } from '../../models/recommendations.model';    
import { InvestmentIdea } from '../../models/investmentIdea';



@Component({
  selector: 'app-investment-recommendations',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './investment-recommendations.component.html',
  styleUrl: './investment-recommendations.component.css'
})
export class InvestmentRecommendationsComponent {
  @Input() recommendations: InvestmentRecommendation[] = [];
}
