import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { VoiceAssistantComponent } from './voice-assistant/voice-assistant.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, VoiceAssistantComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'frontend';
}
