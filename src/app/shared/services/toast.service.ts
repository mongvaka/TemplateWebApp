import { ToastModule } from 'primeng/toast';
import { Injectable, Renderer2, RendererFactory2 } from '@angular/core';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root',
})
export class ToastService {

  constructor(private messageService: MessageService) {}
  delete(data: any): void {
    data
    ? this.messageService.add({severity: 'success', summary: 'Delete success', detail: data})
    : this.messageService.add({severity: 'error', summary: '403', detail: data});
  }
  create(data: any): void {
    data
    ? this.messageService.add({severity: 'success', summary: 'Create success', detail: data})
    : this.messageService.add({severity: 'error', summary: '403', detail: data});
  }
}
