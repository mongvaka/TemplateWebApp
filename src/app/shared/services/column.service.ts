import { ToastModule } from 'primeng/toast';
import { Injectable, Renderer2, RendererFactory2 } from '@angular/core';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root',
})
export class ToastService {

  constructor(private messageService: MessageService) {}
  
}
