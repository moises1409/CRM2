import { Component, OnInit, OnDestroy } from '@angular/core';

import { TextChatComponent } from './text-chat/text-chat.component';
import { CommonModule } from '@angular/common';

import { FormsModule } from '@angular/forms';

import { InvestmentRecommendation } from '../models/recommendations.model';
import { InvestmentIdea } from '../models/investmentIdea';
import { HeaderComponent } from './header/header.component';  

import { InvestmentRecommendationsComponent } from '../widgets/investment-recommendations/investment-recommendations.component';
import { PortfolioAnalysisComponent } from '../widgets/portfolio-analysis/portfolio-analysis.component';
import { Portfolio } from '../models/portfolio.model';
import { SellRecommendationsComponent } from '../widgets/sell-recommendations/sell-recommendations.component';
import { Positions } from '../models/positions.model';
import { PortfolioSimulationComponent } from '../widgets/portfolio-simulation/portfolio-simulation.component';

@Component({
  selector: 'app-voice-assistant',
  standalone: true,
  imports: [CommonModule, FormsModule, 
    HeaderComponent, 
    InvestmentRecommendationsComponent, PortfolioAnalysisComponent, SellRecommendationsComponent,
    PortfolioSimulationComponent, TextChatComponent],
  templateUrl: './voice-assistant.component.html',
  styleUrl: './voice-assistant.component.css'
})

export class VoiceAssistantComponent {
  
  isSidebarOpen: boolean = false;
  
  showInvestmentsRecommendationsWidget: boolean = false;
  showPortfolioAnalysisWidget: boolean = false;
  showSellRecommendationsWidget: boolean = false;
  showPortfolioSimulationWidget: boolean = false;

  investmentRecommendations: InvestmentRecommendation[] = [
    {
      idea: {
        id: '1',
        title: 'Investment Idea 1',
        description: 'Description of Investment Idea 1',
        asset_class: 'Equity',
        currency: 'USD',
        duration: 12,
        sector: 'Technology',
        added: false
      },
      llm_evaluation: 'This is a good investment idea.'
    },
    {
      idea: {
        id: '2',
        title: 'Investment Idea 2',
        description: 'Description of Investment Idea 2',
        asset_class: 'Bond',
        currency: 'EUR',
        duration: 6,
        sector: 'Finance',
        added: false
      },
      llm_evaluation: 'This is a bad investment idea.'
    },
    { 
      idea: {
        id: '3',
        title: 'Investment Idea 3',
        description: 'Description of Investment Idea 3',
        asset_class: 'Real Estate',
        currency: 'CHF',
        duration: 24,
        sector: 'Real Estate',
        added: true
      },
      llm_evaluation: 'This is an average investment idea.'
    }
    
  ];

  
  portfolio: Portfolio = {
    portfolioNumber: '123456', 
    valuation: 1000000,
    currency: 'USD',
    performance: 5,
    historicalPerformance: [5, 1, -3, -1, 0.5],
    weight_assets_breakdown: [
      { asset_class: 'Equities', percentage: 50 },
      { asset_class: 'Bonds', percentage: 30 },
      { asset_class: 'Private Assets', percentage: 10 },
      { asset_class: 'Commodities', percentage: 5 },
      { asset_class: 'Cash', percentage: 5 }
    ]
  };

  benchmark: Portfolio = {
    portfolioNumber: 'A_EUR_C', 
    valuation: 1000001,
    currency: 'USD',
    performance: 4,
    historicalPerformance: [3, -1, -1, 1, 3],
    weight_assets_breakdown: [
      { asset_class: 'Equities', percentage: 40 },
      { asset_class: 'Bonds', percentage: 40 },
      { asset_class: 'Private Assets', percentage: 10 },
      { asset_class: 'Commodities', percentage: 5 },
      { asset_class: 'Cash', percentage: 5 }
    ]
  };

  simulation: Portfolio = {
    portfolioNumber: 'simulation', 
    valuation: 1000001,
    currency: 'USD',
    performance: 4,
    weight_assets_breakdown: [
      { asset_class: 'Equities', percentage: 40 },
      { asset_class: 'Bonds', percentage: 40 },
      { asset_class: 'Private Assets', percentage: 10 },
      { asset_class: 'Commodities', percentage: 5 },
      { asset_class: 'Cash', percentage: 5 }
    ]
  };

  positions_to_sell: Positions[] = [
    {
      name: 'Apple Inc.',
      ticker: 'AAPL',
      asset_class:'Equities',
      industry: 'HealthCare',
      currency: 'CHF',
      marketValue: 200000,
      percentOfPortfolio: 20,
      performance: 10,
      trend: 'up',
      currentPrice: 150,
      targetPrice: 140,
      proximity: 95,
      recommendation: 'Sell',
      selection: false
    }
    
  ];

  userName: string = 'Carlos Sanchez';
  avatarUrl: string = 'assets/avatar.jpg';  




  async connectTextChat() {
    this.isSidebarOpen = true;
  }


  // New helper to get a display name for the speaker
  
}
