import { Component, EventEmitter, Output, OnInit, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { InvestmentRecommendation } from '../../models/recommendations.model';
import { Portfolio } from '../../models/portfolio.model';
import { Positions } from '../../models/positions.model';

export interface Message {
  id: number;
  content: string;
  sender: 'user' | 'assistant';
  next_action?: string[];
  timestamp: Date;
}

@Component({
  selector: 'app-text-chat',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './text-chat.component.html',
  styleUrl: './text-chat.component.css'
})

export class TextChatComponent implements OnInit {
  @Output() disconnect = new EventEmitter<void>();

  @Output() showPortfolioSimulationWidgetChange = new EventEmitter<boolean>();
  @Output() simulationChange = new EventEmitter<Portfolio>();

  @Output() showPortfolioAnalysisWidgetChange = new EventEmitter<boolean>();
  @Output() portfolioChange = new EventEmitter<Portfolio>();
  @Output() benchmarkChange = new EventEmitter<Portfolio>();

  @Output() showInvestmentRecommendationsWidgetChange = new EventEmitter<boolean>();
  @Output() investmentRecommendationsChange = new EventEmitter<InvestmentRecommendation[]>();

  @Output() showSellRecommendationsWidgetChange = new EventEmitter<boolean>();
  @Output() positions_to_sellChange = new EventEmitter<Positions[]>();


  sessionId: String = '';

  messages: Message[] = [];
  newMessage: string = '';

  @ViewChild('scrollContainer') scrollContainer!: ElementRef<HTMLDivElement>;
  
  constructor(private http: HttpClient) {}

  onDisconnect() {
    this.disconnect.emit();
  }

  ngOnInit() {
    this.sessionId = this.generateSessionId();
    this.messages = [
      {
        id: 1,
        content:
          "Hello! I'm your portfolio AI assistant. How can I help you analyze this portfolio today?",
        sender: 'assistant',
        timestamp: new Date()
      }
    ];
  }

  generateSessionId(): string {
  // Simple UUID v4 generator
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    const r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

  handleSendMessage() {
    const text = this.newMessage.trim();
    if (!text) return;

    const userMessage: Message = {
      id: this.messages.length + 1,
      content: text,
      sender: 'user',
      timestamp: new Date()
    };

    // Add user message
    this.messages = [...this.messages, userMessage];
    this.newMessage = '';
    setTimeout(() => this.scrollToBottom(), 50);

    // Add assistant "working" message (empty content for now)
    const workingMessage: Message = {
      id: this.messages.length + 1,
      content: '',
      sender: 'assistant',
      timestamp: new Date()
    };
    this.messages = [...this.messages, workingMessage];
    setTimeout(() => this.scrollToBottom(), 50);

    // Call your API
    this.http.post<any>('http://localhost:5000/agent', { 
      message: text, 
      session_id:this.sessionId
     }).subscribe({
      next: (res) => {
        // Replace the working message with the real answer
        const idx = this.messages.findIndex(msg => msg === workingMessage);
        if (idx !== -1) {
          this.messages[idx] = {
            ...workingMessage,
            content: res.answer,
            next_action: res.next_action,
            timestamp: new Date()
          };
          this.messages = [...this.messages];
        }
        setTimeout(() => this.scrollToBottom(), 50);

        if (res.action === 'showPortfolioAnalysis') {
          this.showPortfolioAnalysisWidgetChange.emit(true);
          this.showInvestmentRecommendationsWidgetChange.emit(false);
          this.showSellRecommendationsWidgetChange.emit(false);
          this.showPortfolioSimulationWidgetChange.emit(false);
          this.portfolioChange.emit(res.portfolio);
          this.benchmarkChange.emit(res.benchmark);
        }
        if (res.action === 'showInvestmentRecommendations') {
          this.showInvestmentRecommendationsWidgetChange.emit(true);
          this.showPortfolioAnalysisWidgetChange.emit(false);
          this.showSellRecommendationsWidgetChange.emit(false);
          this.showPortfolioSimulationWidgetChange.emit(false);
          this.investmentRecommendationsChange.emit(res.recommendations);
        }
        if (res.action === 'showPositionsToSell') {
          this.showSellRecommendationsWidgetChange.emit(true);
          this.showPortfolioAnalysisWidgetChange.emit(false);
          this.showInvestmentRecommendationsWidgetChange.emit(false);
          this.showPortfolioSimulationWidgetChange.emit(false);
          this.positions_to_sellChange.emit(res.positions_to_sell);
        }
        if (res.action === 'showPortfolioSimulation') {
          this.showPortfolioSimulationWidgetChange.emit(true);
          this.showSellRecommendationsWidgetChange.emit(false);
          this.showPortfolioAnalysisWidgetChange.emit(false);
          this.showInvestmentRecommendationsWidgetChange.emit(false);
          this.positions_to_sellChange.emit(res.positions_to_sell);
          this.portfolioChange.emit(res.portfolio);
          this.benchmarkChange.emit(res.benchmark);
          this.simulationChange.emit(res.simulation);
          this.positions_to_sellChange.emit(res.sell_orders);
          this.investmentRecommendationsChange.emit(res.buy_oders);
        }
        
      },
      error: () => {
        const idx = this.messages.findIndex(msg => msg === workingMessage);
        if (idx !== -1) {
          this.messages[idx] = {
            ...workingMessage,
            content: "Sorry, I couldn't get a response from the server.",
            timestamp: new Date()
          };
          this.messages = [...this.messages];
        }
        setTimeout(() => this.scrollToBottom(), 50);
      }
    });
  }

  handleKeyDown(event: KeyboardEvent) {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      this.handleSendMessage();
    }
  }

  scrollToBottom() {
    try {
      this.scrollContainer.nativeElement.scrollTop = this.scrollContainer.nativeElement.scrollHeight;
    } catch (err) {}
  }

  handleAssistantAction(action: string) {
    this.newMessage = action;
    this.handleSendMessage();
  }

}
